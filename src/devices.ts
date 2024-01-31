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
  await prepareDevices();
  
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
  let initPromiseResolve: (value: void) => void;
  let initPromise = new Promise(function(resolve) {
    initPromiseResolve = resolve;
  });
  // сразу после подписки на изменения сработает обрабочик на каждое свойство
  // поэтому первое срабатывание мы пропускаем
  let firstRun = true;
  plugin.onSub('devices', {did_prop: subscribeIds}, data => {
    console.log('devices data:', JSON.stringify(data));
    //{ did: 'd0164', dn: 'svet_holl', prop: 'value', value: 37 }
    const updatedDevices: Record<string, Device> = {};
    for (let {did, dn, prop, value} of data) {
      const device = devicesById[did];
      if (device) {
        const prevYaState = !firstRun && device.toYandexStateObj();
        device.setPropValue(prop, value);
        if (firstRun) continue;
        
        const nextYaState = device.toYandexStateObj();
        if (JSON.stringify(prevYaState) != JSON.stringify(nextYaState)) {
          console.log(`Устройтво ${device.id} - изменно состояние`);
          updatedDevices[device.id] = device;
        }
      } else {
        console.error(`Not found device ${did}(${dn})`);
      }
    }
    if (Object.keys(updatedDevices).length > 0) {
      console.log('sendDevicesUpdateStateToYandex');
      sendDevicesUpdateStateToYandex(Object.values(updatedDevices));
    }
    if (firstRun) {
      firstRun = false;
      initPromiseResolve();
    }
  });

  await initPromise;
  console.log('prepareDevices success');
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

export async function sendDevicesUpdateParamsReqToYandex() {
  console.log('Отправляем запрос на обновление устройств в yandex');
  const url = `https://dialogs.yandex.net/api/v1/skills/${settings.ya_skill_id}/callback/discovery`;
  const authorization = `OAuth ${settings.ya_oauth_user_token}`;
  console.debug({url, authorization});
  try {
    const body = {
      ts: Date.now() / 1000,
      payload: {
          // это тот же id, что в authenticateHandler
          user_id: '123',
          devices: devices.map(device => device.toYandexStateObj())
      }
    };
    //console.debug('body:', body);
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': authorization
      },
    });
    const text = await res.text();
    console.debug('Yandex discovery response:', {status: res.status, text});
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
    const body = {
      ts: Date.now() / 1000,
      payload: {
        // это тот же id, что в authenticateHandler
        user_id: '123',
        devices: devices.map(device => device.toYandexStateObj())
      }
    };
    console.debug('body:', body);
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': authorization
      },
    });
    const text = await res.text();
    console.debug('Yandex state  response:', {status: res.status, text});
    if (res.ok || res.status == 400) {
      const jsonRes = JSON.parse(text);
      if (jsonRes.status == 'error') throw new Error(jsonRes.error_code || jsonRes.error_message);
    }
  } catch (err) {
    console.error('yandex response with:', err);
  }
}
