import {AuthorizationCodeModel, User, Client, Token, AuthorizationCode} from '@node-oauth/oauth2-server';
import { Plugin } from '../plugin-types';

export default class Model implements AuthorizationCodeModel {
  plugin: Plugin;

  // храним без удаления старых - при небольшом количестве это не проблема
  authorizationCodes: {[code: string]: AuthorizationCode} = {};
  tokens: {[tiken: string]: Token} = {};

  constructor(plugin) {
    this.plugin = plugin;
  }

  async load() {
    const persistents = await this.plugin.persistent.get('all');
    //console.debug({persistents});
    for (let [key, val] of Object.entries(persistents)) {
      if (val && val != 'null' && key.startsWith('access_token')) {
        const token = JSON.parse(val);
        token.accessTokenExpiresAt = new Date(token.accessTokenExpiresAt);
        token.refreshTokenExpiresAt = new Date(token.refreshTokenExpiresAt);
        this.tokens[token.accessToken] = token;
      }
    }
    console.debug('Loaded tokens:', this.tokens);
  }

  async getClient(clientId: string, clientSecret: string): Promise<Client | undefined> {
    console.debug('Oauth model getClient:', {clientId, clientSecret});
    return {
      id: clientId,      
      grants: ['authorization_code', 'refresh_token'],
      redirectUris: ['https://social.yandex.net/broker/redirect'],
      clientSecret
    };
  }

  async saveAuthorizationCode(
    code: Pick<AuthorizationCode, 'authorizationCode' | 'expiresAt' | 'redirectUri' | 'scope' | 'codeChallenge' | 'codeChallengeMethod'>,
    client: Client,
    user: User
  ): Promise<AuthorizationCode | false> {
    const authorizationCode = {...code, client, user};
    console.debug('Oauth model saveAuthorizationCode:', authorizationCode);
    this.authorizationCodes[code.authorizationCode] = authorizationCode;
    return authorizationCode;
  }

  async getAuthorizationCode(authorizationCode: string): Promise<AuthorizationCode | undefined> {
    console.debug('Oauth model getAuthorizationCode:', {authorizationCode});
    return this.authorizationCodes[authorizationCode];
  }

  async revokeAuthorizationCode(code: AuthorizationCode): Promise<boolean> {
    console.debug('Oauth model revokeAuthorizationCode:', {code});
    delete this.authorizationCodes[code.authorizationCode];
    return true;
  }

  async saveToken(token: Token, client: Client, user: User): Promise<Token | false> {
    const fullToken = {...token, client, user};
    console.debug('Oauth model saveToken:', fullToken);
    this.tokens[token.accessToken] = fullToken;
    this.plugin.persistent.set({
      file: 'access_token' + fullToken.accessToken,
      data: JSON.stringify(fullToken)
    });
    return fullToken;
  }

  async getAccessToken(accessToken: string): Promise<Token | undefined> {
    console.debug('Oauth model getAccessToken:', {accessToken});
    return this.tokens[accessToken];
  }

  async removeAccessToken(accessToken: string): Promise<void> {
    console.debug('Oauth model removeAccessToken:', {accessToken});
    delete this.tokens[accessToken];
    this.plugin.persistent.set({
      file: 'access_token' + accessToken,
      data: 'null'
    });
  }

  async verifyScope(_token: Token, _scope: string | string[]): Promise<boolean> {
    return true;
  }
}