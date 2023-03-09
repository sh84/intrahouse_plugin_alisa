import Koa from 'koa';
import koaBody from 'koa-body';
import Router from '@koa/router';
import OAuth2Server from '@node-oauth/oauth2-server';

import { Plugin } from '../plugin-types';
import { Settings } from '../index';
import Model from './model';
//import loginFgorm from './login-form';
import { getYandexUserDevices, getDeviceById } from '../devices';

export default async function serverStart(settings: Settings, plugin: Plugin) {
  const app = new Koa();
  app.use(koaBody());
  
  app.use(async (ctx, next) => {
    console.log(ctx.method, ctx.url);
    console.debug('req headers:', ctx.request.headers);
    console.debug('req body:', ctx.request.body);
    await next();
    console.debug('resp status:', ctx.response.status);
    console.debug('resp body:', ctx.response.body);
    console.debug('resp headers:', ctx.response.headers);
  });
  
  const model = new Model(plugin);
  await model.load();
  const oauth = new OAuth2Server({
    model,
    // время жизни refreshToken меньше чем самого accessToken - что бы не реализовывать RefreshTokenModel
    accessTokenLifetime: 10 * 365* 86400,  // 10 лет
    refreshTokenLifetime: 10 * 365* 86400 - 1,
    authenticateHandler: {
      handle: function(_request: OAuth2Server.Request, _response: OAuth2Server.Response) {
        /*console.log('authenticateHandler', request.body);
        if (request.body.name != "111" || request.body.password != "123") {
          throw new Error('Invalid name or password');
        }*/
        return {name: 'me', id: 123};
      }
    }
  });

  const oauthMiidelware: Koa.Middleware = async(ctx, next) => {
    const request = new OAuth2Server.Request(ctx.request);
    const response = new OAuth2Server.Response(ctx.response);
    try {
      ctx.state.oauth = {request, response};
      await next();
      if (response.status && response.status != 200 || 
          response.body && (typeof(response.body) != 'object' || Object.keys(response.body).length > 0)
      ) {
        ctx.body = response.body;
        if (response.status) ctx.status = response.status;
      }
    } catch (err: any) {
      if (!(err instanceof OAuth2Server.OAuthError)) {
        throw(err);
      }
      ctx.status = err.code;
      if (!(err instanceof OAuth2Server.UnauthorizedRequestError)) {
        ctx.body = { error: err.name, error_description: err.message };
      }
      console.error('OAUTH err:', err);
    }
    if (response.headers) {
      ctx.set(response.headers);
    }
  };

  const router = new Router();
  
  router.all('/v1.0', async (ctx) => {
    ctx.body = 'OK';
  });

  // /oauth/authorize?state=https%3A%2F%2Fsocial.yandex.ru%2Fbroker2%2Fauthz_in_web%2F0c14b5a328074af7a08c497f49566d42%2Fcallback&redirect_uri=https%3A%2F%2Fsocial.yandex.net%2Fbroker%2Fredirect&response_type=code&client_id=alisa_intrahouse
  /*router.get('/oauth/authorize', async (ctx) => {
    ctx.body = loginFgorm.replace(/{[^}]*}/g, tmpl => {
      if (tmpl == '{reqParams}') {
        return ctx.querystring;
      } else {
        return tmpl;
      }
    });
  });

  router.post('/oauth/authorize', oauthMiidelware, async (ctx) => {
    ctx.state.oauth.request.query = querystring.parse(ctx.request.body.reqParams) as any;
    try {
      const code = await oauth.authorize(ctx.state.oauth.request, ctx.state.oauth.response);
      console.log('code:', code);
    } catch (err: any) {
      if (err.message == 'Invalid name or password') {
        ctx.body = 'Invalid name or password';
        return;
      }
      throw err;
    }
  });*/

  router.get('/oauth/authorize', oauthMiidelware, async (ctx) => {
    await oauth.authorize(ctx.state.oauth.request, ctx.state.oauth.response);
  });

  router.post('/oauth/token', oauthMiidelware, async (ctx) => {
    if (ctx.request.body.client_secret != settings.ya_oauth_client_secret) {
      throw new OAuth2Server.InvalidClientError('Invalid client_secret');
    }
    await oauth.token(ctx.state.oauth.request, ctx.state.oauth.response);
  });

  router.post('/v1.0/user/unlink', oauthMiidelware, async (ctx) => {
    const token = await oauth.authenticate(ctx.state.oauth.request, ctx.state.oauth.response);
    const reqId = ctx.request.headers['x-request-id'];
    model.removeAccessToken(token.accessToken);
    ctx.body = {request_id: reqId};
  });
  
  router.get('/v1.0/user/devices', oauthMiidelware, async (ctx) => {
    const token = await oauth.authenticate(ctx.state.oauth.request, ctx.state.oauth.response);
    const reqId = ctx.request.headers['x-request-id'];
    ctx.body = {
      request_id: reqId,
      payload: {
        user_id: `${token.user?.id}`,
        devices: getYandexUserDevices()
      }
    };
  });

  router.post('/v1.0/user/devices/action', oauthMiidelware, async (ctx) => {
    const token = await oauth.authenticate(ctx.state.oauth.request, ctx.state.oauth.response);
    const reqId = ctx.request.headers['x-request-id'];
    const devicesResp: object[] = [];
    for (let {id, capabilities} of ctx.request.body?.payload?.devices) {
      const device = getDeviceById(id);
      if (!device) {
        console.error(`Устройство с id = "${id}" не найдено`);
        ctx.status = 404;
        return;
      }
      devicesResp.push({
        id: device.id,
        capabilities: capabilities.map(cap => ({
          type: cap.type,
          state: {
            instance: cap.state?.instance,
            action_result: device.applyAction(cap.type, cap.state)
          }
        }))
      });
    }
    ctx.body = {request_id: reqId, payload: {devices: devicesResp}};
  });
  
  router.post('/v1.0/user/devices/query', oauthMiidelware, async (ctx) => {
    const token = await oauth.authenticate(ctx.state.oauth.request, ctx.state.oauth.response);
    const reqId = ctx.request.headers['x-request-id'];
    const devicesResp: object[] = [];
    for (let {id} of ctx.request.body?.devices) {
      const device = getDeviceById(id);
      if (!device) {
        console.error(`Устройство с id = "${id}" не найдено`);
        ctx.status = 404;
        return;
      }
      devicesResp.push(device.toYandexStateObj());
    }
    ctx.body = {request_id: reqId, payload: {devices: devicesResp}};
  });

  app.use(router.routes());

  app.listen(settings.port);
  
  console.log(`Сервер запущен на ${settings.port} порту`);
}
