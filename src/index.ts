import util from 'util';
import { Plugin } from './plugin-types';
import serverStart from './server/main';
import { devicesStart, sendDevicesUpdateParamsReqToYandex } from './devices';

export type Settings = {
  port: number;
  ya_oauth_client_secret: string;
  ya_oauth_user_token: string;
  ya_skill_id: string;
  loglevel: number;
}

let plugin: Plugin;

function dump(obj) {
  console.log('self props:');
  for (let [k, v] of Object.entries(obj)) {
    console.log('\t'+k+':', typeof v == 'function' ? v.toString() : v);
  }
  console.log('proto props:');
  for (let [k, v] of Object.entries(Object.getPrototypeOf(obj))) {
    console.log('\t'+k+':', typeof v == 'function' ? v.toString() : v);
  }
}

(async () => {
  const argv = JSON.parse(process.argv[2] ?? '');
  const pluginapi = argv?.pluginapi ?? 'ih-plugin-api';
  plugin = require(pluginapi+'/index.js')();
  try {
    const params = await plugin.params.get();
    const settings: Settings = {
      ya_oauth_client_secret: params.ya_oauth_client_secret || '',
      ya_oauth_user_token: params.ya_oauth_user_token || '',
      ya_skill_id: params.ya_skill_id || '',
      port: Number(params.number) || 8098,
      loglevel: Number(params.loglevel) || 0
    };

    const format = (...data) => data.map(el => {
      return el === Object(el) ? util.inspect(el, false, 10) : el;
    }).join(' ');
    console.log = (...data) => plugin.log(format(...data));
    console.error = (...data) => plugin.log(format('ERROR', ...data));
    console.info = (...data) => settings.loglevel >= 1 ? plugin.log(format(...data)) : undefined;
    console.debug = (...data) => settings.loglevel >= 2 ? plugin.log(format(...data)) : undefined;

    console.log('Плагин стартовал.');
    console.debug('DEBUG LOG LEVEL');
    console.log('settings:', settings);

    plugin.params.onChange(data => {
      console.log('params change:', data);
      process.exit(0);
    });

    /*plugin.onAct(message => {
      console.log('ACT data=' + util.inspect(message));
    });
    plugin.onCommand(command => {
      console.log('Command=' + util.inspect(command));
    });
    */
    /*process.on("message", (message: any) => {
      if (message['type'] != 'get') {
        console.log('message:', message);
      }
    });
    */

    /*
    console.log('plugin.agent:');
    dump(plugin.agent);
    console.log('plugin.agent.connector:');
    dump(plugin.agent.connector);
    */

    await devicesStart(settings, plugin);
    await serverStart(settings, plugin);
    await sendDevicesUpdateParamsReqToYandex();
  } catch (err) {
    plugin.log(`error: ${util.inspect(err)}`);
    plugin.exit(8, `Error: ${err}`);
  }
})();
