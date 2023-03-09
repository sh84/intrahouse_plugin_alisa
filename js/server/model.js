"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Model {
    plugin;
    // храним без удаления старых - при небольшом количестве это не проблема
    authorizationCodes = {};
    tokens = {};
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
    async getClient(clientId, clientSecret) {
        console.debug('Oauth model getClient:', { clientId, clientSecret });
        return {
            id: clientId,
            grants: ['authorization_code', 'refresh_token'],
            redirectUris: ['https://social.yandex.net/broker/redirect'],
            clientSecret
        };
    }
    async saveAuthorizationCode(code, client, user) {
        const authorizationCode = { ...code, client, user };
        console.debug('Oauth model saveAuthorizationCode:', authorizationCode);
        this.authorizationCodes[code.authorizationCode] = authorizationCode;
        return authorizationCode;
    }
    async getAuthorizationCode(authorizationCode) {
        console.debug('Oauth model getAuthorizationCode:', { authorizationCode });
        return this.authorizationCodes[authorizationCode];
    }
    async revokeAuthorizationCode(code) {
        console.debug('Oauth model revokeAuthorizationCode:', { code });
        delete this.authorizationCodes[code.authorizationCode];
        return true;
    }
    async saveToken(token, client, user) {
        const fullToken = { ...token, client, user };
        console.debug('Oauth model saveToken:', fullToken);
        this.tokens[token.accessToken] = fullToken;
        this.plugin.persistent.set({
            file: 'access_token' + fullToken.accessToken,
            data: JSON.stringify(fullToken)
        });
        return fullToken;
    }
    async getAccessToken(accessToken) {
        console.debug('Oauth model getAccessToken:', { accessToken });
        return this.tokens[accessToken];
    }
    async removeAccessToken(accessToken) {
        console.debug('Oauth model removeAccessToken:', { accessToken });
        delete this.tokens[accessToken];
        this.plugin.persistent.set({
            file: 'access_token' + accessToken,
            data: 'null'
        });
    }
    async verifyScope(_token, _scope) {
        return true;
    }
}
exports.default = Model;
