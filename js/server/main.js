"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_body_1 = __importDefault(require("koa-body"));
const router_1 = __importDefault(require("@koa/router"));
const oauth2_server_1 = __importDefault(require("@node-oauth/oauth2-server"));
const model_1 = __importDefault(require("./model"));
//import loginFgorm from './login-form';
const devices_1 = require("../devices");
async function serverStart(settings, plugin) {
    const app = new koa_1.default();
    app.use((0, koa_body_1.default)());
    app.use(async (ctx, next) => {
        console.log(ctx.method, ctx.url);
        console.debug('req headers:', ctx.request.headers);
        console.debug('req body:', ctx.request.body);
        await next();
        console.debug('resp status:', ctx.response.status);
        console.debug('resp body:', ctx.response.body);
        console.debug('resp headers:', ctx.response.headers);
    });
    const model = new model_1.default(plugin);
    await model.load();
    const oauth = new oauth2_server_1.default({
        model,
        // время жизни refreshToken меньше чем самого accessToken - что бы не реализовывать RefreshTokenModel
        accessTokenLifetime: 10 * 365 * 86400,
        refreshTokenLifetime: 10 * 365 * 86400 - 1,
        authenticateHandler: {
            handle: function (_request, _response) {
                /*console.log('authenticateHandler', request.body);
                if (request.body.name != "111" || request.body.password != "123") {
                  throw new Error('Invalid name or password');
                }*/
                return { name: 'me', id: 123 };
            }
        }
    });
    const oauthMiidelware = async (ctx, next) => {
        const request = new oauth2_server_1.default.Request(ctx.request);
        const response = new oauth2_server_1.default.Response(ctx.response);
        try {
            ctx.state.oauth = { request, response };
            await next();
            if (response.status && response.status != 200 ||
                response.body && (typeof (response.body) != 'object' || Object.keys(response.body).length > 0)) {
                ctx.body = response.body;
                if (response.status)
                    ctx.status = response.status;
            }
        }
        catch (err) {
            if (!(err instanceof oauth2_server_1.default.OAuthError)) {
                throw (err);
            }
            ctx.status = err.code;
            if (!(err instanceof oauth2_server_1.default.UnauthorizedRequestError)) {
                ctx.body = { error: err.name, error_description: err.message };
            }
            console.error('OAUTH err:', err);
        }
        if (response.headers) {
            ctx.set(response.headers);
        }
    };
    const router = new router_1.default();
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
            throw new oauth2_server_1.default.InvalidClientError('Invalid client_secret');
        }
        await oauth.token(ctx.state.oauth.request, ctx.state.oauth.response);
    });
    router.post('/v1.0/user/unlink', oauthMiidelware, async (ctx) => {
        const token = await oauth.authenticate(ctx.state.oauth.request, ctx.state.oauth.response);
        const reqId = ctx.request.headers['x-request-id'];
        model.removeAccessToken(token.accessToken);
        ctx.body = { request_id: reqId };
    });
    router.get('/v1.0/user/devices', oauthMiidelware, async (ctx) => {
        const token = await oauth.authenticate(ctx.state.oauth.request, ctx.state.oauth.response);
        const reqId = ctx.request.headers['x-request-id'];
        ctx.body = {
            request_id: reqId,
            payload: {
                user_id: `${token.user?.id}`,
                devices: (0, devices_1.getYandexUserDevices)()
            }
        };
    });
    router.post('/v1.0/user/devices/action', oauthMiidelware, async (ctx) => {
        const token = await oauth.authenticate(ctx.state.oauth.request, ctx.state.oauth.response);
        const reqId = ctx.request.headers['x-request-id'];
        const devicesResp = [];
        for (let { id, capabilities } of ctx.request.body?.payload?.devices) {
            const device = (0, devices_1.getDeviceById)(id);
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
        ctx.body = { request_id: reqId, payload: { devices: devicesResp } };
    });
    router.post('/v1.0/user/devices/query', oauthMiidelware, async (ctx) => {
        const token = await oauth.authenticate(ctx.state.oauth.request, ctx.state.oauth.response);
        const reqId = ctx.request.headers['x-request-id'];
        const devicesResp = [];
        for (let { id } of ctx.request.body?.devices) {
            const device = (0, devices_1.getDeviceById)(id);
            if (!device) {
                console.error(`Устройство с id = "${id}" не найдено`);
                ctx.status = 404;
                return;
            }
            devicesResp.push(device.toYandexStateObj());
        }
        ctx.body = { request_id: reqId, payload: { devices: devicesResp } };
    });
    app.use(router.routes());
    app.listen(settings.port);
    console.log(`Сервер запущен на ${settings.port} порту`);
}
exports.default = serverStart;
