import { debounce } from 'ts-debounce';
import { Settings } from './index';
import { Plugin } from './plugin-types';
import { Device } from './device';

let plugin: Plugin;
let settings: Settings;
let devices: Device[] = [];
let devicesById: Record<string, Device> = {};
let pluginDevices: object[];
let pluginTypes: object[];

export async function devicesStart(s: Settings, p: Plugin) {
  plugin = p;
  settings = s;
  pluginDevices = await plugin.devices.get();
  pluginTypes = await plugin.types.get();
  console.log('pluginDevices:', pluginDevices);
  console.log('pluginTypes:', pluginTypes);
  prepareDevices();
  
  const debounceCheckFn = debounce(checkPluginDevicesChanges, 500);
  plugin.devices.onAdd(debounceCheckFn);
  plugin.devices.onUpdate(debounceCheckFn);
  plugin.devices.onChange(debounceCheckFn);
  plugin.devices.onDelete(debounceCheckFn);
  plugin.types.onAdd(debounceCheckFn);
  plugin.types.onUpdate(debounceCheckFn);
  plugin.types.onChange(debounceCheckFn);
  plugin.types.onDelete(debounceCheckFn);
}

async function prepareDevices() {
  devices = Device.makeFromPluginProps(plugin, pluginDevices, pluginTypes);
  const newDevices: Device[] = [];
  for (let device of devices) {
    if (!devicesById[device.id]) newDevices.push(device);
  }
  devicesById = {};
  devices.forEach(device => devicesById[device.id] = device);
  console.log('Устройства:', devices.map(device => device.toString()).join('\n'));

  const subscribeIds = newDevices.map(device => device.id);
  console.log('Подписываемся на изменения устройств:', subscribeIds.join(', '));
  plugin.onSub('devices', {did_prop: subscribeIds}, data => {
    //console.log('devices data:', data);
    //{ did: 'd0164', dn: 'svet_holl', prop: 'value', value: 37 }
    let updatedDevices: Device[] = [];
    for (let {did, prop, value} of data) {
      const device = devicesById[did];
      if (device) {
        const prevYaState = device.toYandexStateObj();
        device.setPropValue(prop, value);
        const nextYaState = device.toYandexStateObj();
        if (JSON.stringify(prevYaState) != JSON.stringify(nextYaState)) {
          console.log(`Устройтво ${device.id} - изменно состояние`);
          updatedDevices.push(device);
        }
      }
    }
    if (updatedDevices.length > 0) sendDevicesUpdateStateToYandex(updatedDevices);
  });

  setTimeout(sendDevicesUpdateParamsReqToYandex, 100);
}

async function checkPluginDevicesChanges() {
  const newDevices = await plugin.devices.get();
  const newTypes = await plugin.types.get();
  let changed = false;
  if (JSON.stringify(newDevices) != JSON.stringify(pluginDevices)) {
    console.log('Устройства изменены');
    pluginDevices = newDevices;
    console.debug('pluginDevices:', newDevices);
    changed = true;
  }
  if (JSON.stringify(newTypes) != JSON.stringify(pluginTypes)) {
    console.log('Типы изменены');
    pluginTypes = newTypes;
    console.debug('pluginTypes:', pluginTypes);
    changed = true;
  }
  if (changed) {
    prepareDevices();
  }
}

// вернуть текущий список устройств в формате объекта "devices" ответа на запрос /v1.0/user/devices
export function getYandexUserDevices(): object[] {
  return devices.map(device => device.toYandexPropsObj());
}

export function getDeviceById(id: string): Device|undefined {
  return devicesById[id];
}

async function sendDevicesUpdateParamsReqToYandex() {
  console.log('Отправляем запрос на обновление устройств в yandex');
  const url = `https://dialogs.yandex.net/api/v1/skills/${settings.ya_skill_id}/callback/discovery`;
  const authorization = `OAuth ${settings.ya_oauth_user_token}`;
  console.debug({url, authorization});
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        ts: Date.now() / 1000,
        payload: {
          // это тот же id, что в authenticateHandler
          user_id: '123'
        }
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': authorization
      },
    });
    const text = await res.text();
    console.debug('Yandex response:', {status: res.status, text});
    if (res.ok || res.status == 400) {
      const jsonRes = JSON.parse(text);
      if (jsonRes.status == 'error') throw new Error(jsonRes.error_code || jsonRes.error_message);
    }
  } catch (err) {
    console.error('yandex response with:', err);
  }
}

async function sendDevicesUpdateStateToYandex(devices: Device[]) {
  console.log(`Отправляем запрос на обновление свойств устройств в yandex, устройства: ${devices.map(d => d.id).join(', ')}`);
  const url = `https://dialogs.yandex.net/api/v1/skills/${settings.ya_skill_id}/callback/state`;
  const authorization = `OAuth ${settings.ya_oauth_user_token}`;
  console.debug({url, authorization});
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        ts: Date.now() / 1000,
        payload: {
          // это тот же id, что в authenticateHandler
          user_id: '123',
          devices: devices.map(device => device.toYandexStateObj())
        }
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': authorization
      },
    });
    const text = await res.text();
    console.debug('Yandex response:', {status: res.status, text});
    if (res.ok || res.status == 400) {
      const jsonRes = JSON.parse(text);
      if (jsonRes.status == 'error') throw new Error(jsonRes.error_code || jsonRes.error_message);
    }
  } catch (err) {
    console.error('yandex response with:', err);
  }
}
