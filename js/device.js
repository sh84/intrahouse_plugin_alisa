"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = exports.DeviceType = void 0;
const util_1 = __importDefault(require("util"));
const node_vm_1 = __importDefault(require("node:vm"));
const yandex_config_1 = __importDefault(require("./yandex-config"));
// храним так, отдельно, для того что бы значения свойств не терялись при пересоздании объектов Device
let devicesPropValues = {};
class DeviceType {
    id;
    title;
    pluginProps;
    constructor(pluginProps) {
        this.id = pluginProps['_id'];
        this.title = pluginProps['title'];
        this.pluginProps = pluginProps;
        delete this.pluginProps['_id'];
        delete this.pluginProps['title'];
        if (!devicesPropValues[this.id])
            devicesPropValues[this.id] = {};
    }
}
exports.DeviceType = DeviceType;
class Device {
    plugin;
    pluginProps;
    id;
    deviceType;
    inherit;
    active;
    name;
    room;
    type;
    capabilities = [];
    properties = [];
    constructor(plugin, pluginProps, typesById) {
        this.plugin = plugin;
        this.pluginProps = pluginProps;
        this.id = pluginProps["_id"];
        this.deviceType = typesById[pluginProps["type"]];
        this.active = pluginProps['active'] == 1;
        this.inherit = pluginProps['inherit'] == 1;
        this.name = pluginProps['ya_name'] || '';
        this.room = pluginProps['ya_room'] || '';
        if (this.inherit && this.deviceType) {
            pluginProps = { ...pluginProps, ...this.deviceType.pluginProps };
        }
        this.type = pluginProps['ya_type'] || '';
        const createValueFn = (source) => {
            let fnSource = source.trim();
            if (!fnSource.startsWith('return')) {
                fnSource = 'return ' + fnSource;
            }
            try {
                return new Function('value', fnSource);
            }
            catch (err) {
                console.error(`${err}`);
            }
            return undefined;
        };
        const parseFns = (capIndex, capType, paramPrefix) => {
            const prefix = `ya_cap${capIndex}_${capType}_${paramPrefix ? paramPrefix + '_' : ''}fns_block_`;
            let prop = pluginProps[prefix + 'prop'];
            if (prop == '-')
                prop = undefined;
            let cmdOn = pluginProps[prefix + 'cmd_on'];
            if (cmdOn == '-')
                cmdOn = undefined;
            let cmdOff = pluginProps[prefix + 'cmd_off'];
            if (cmdOff == '-')
                cmdOff = undefined;
            let fnParamName = paramPrefix ? paramPrefix + '_fns_block' : 'fns_block';
            const setFnSource = pluginProps[prefix + 'set_fn'] || yandex_config_1.default.capabilities[capType]['parameters']['visible'][fnParamName]['default_set_fn'];
            const setFn = createValueFn(setFnSource);
            const getFnSource = pluginProps[prefix + 'get_fn'] || yandex_config_1.default.capabilities[capType]['parameters']['visible'][fnParamName]['default_get_fn'];
            const getFn = createValueFn(getFnSource);
            return { prop, cmdOn, cmdOff, setFn, getFn };
        };
        const capCount = parseInt(pluginProps['capabilities_count']);
        if (!isNaN(capCount)) {
            for (let capIndex = 0; capIndex <= capCount; capIndex++) {
                const type = pluginProps[`ya_cap${capIndex}_type`];
                let cap = { type };
                if (type == 'on_off') {
                    cap.fns = parseFns(capIndex, type);
                }
                else if (type == 'color_setting') {
                    const instance = pluginProps[`ya_cap${capIndex}_color_setting_instance`];
                    if (instance != '-')
                        cap.instance = instance;
                    if (instance == 'rgb') {
                        cap.rgbFns = parseFns(capIndex, type, 'rgb');
                    }
                    else if (instance == 'hsv') {
                        cap.hsvFns = parseFns(capIndex, type, 'hsv');
                    }
                    else if (instance == 'temperature_k') {
                        cap.temperatureKMin = parseInt(pluginProps[`ya_cap${capIndex}_color_setting_temperature_k_min`]);
                        cap.temperatureKMax = parseInt(pluginProps[`ya_cap${capIndex}_color_setting_temperature_k_max`]);
                        cap.temperatureKFns = parseFns(capIndex, type, 'temperature_k');
                    }
                    else if (instance == 'scene') {
                        const colorSceneScenesProp = pluginProps[`ya_cap${capIndex}_color_setting_color_scene_scenes`];
                        if (colorSceneScenesProp) {
                            let colorSceneScenes = `${colorSceneScenesProp}`.trim().split(/\s*,\s*/);
                            colorSceneScenes = colorSceneScenes.filter(scenes => {
                                if (!scenes) {
                                    console.error(`Пустое значение в списке "Темы и сценарии освещения" = "${colorSceneScenesProp}"`);
                                    return false;
                                }
                                return true;
                            });
                            if (colorSceneScenes.length != 0) {
                                cap.colorSceneScenes = colorSceneScenes;
                            }
                        }
                        cap.colorSceneFns = parseFns(capIndex, type, 'color_scene');
                    }
                }
                else if (type == 'mode') {
                    cap.fns = parseFns(capIndex, type);
                    const instance = pluginProps[`ya_cap${capIndex}_mode_instance`];
                    if (instance != '-')
                        cap.instance = instance;
                    const modesProp = pluginProps[`ya_cap${capIndex}_mode_modes`];
                    if (modesProp) {
                        let modes = `${modesProp}`.trim().split(/\s*,\s*/);
                        modes = modes.filter(mode => {
                            if (!mode) {
                                console.error(`Пустое значение в списке "Режимы работы функции" = "${modesProp}"`);
                                return false;
                            }
                            return true;
                        });
                        if (modes.length != 0)
                            cap.modes = modes;
                    }
                }
                else if (type == "range") {
                    cap.fns = parseFns(capIndex, type);
                    const instance = pluginProps[`ya_cap${capIndex}_range_instance`];
                    if (instance != '-')
                        cap.instance = instance;
                    const unit = pluginProps[`ya_cap${capIndex}_range_unit`];
                    if (unit != '-')
                        cap.unit = unit;
                    cap.randomAccess = pluginProps[`ya_cap${capIndex}_range_random_access`] != '0';
                    if (pluginProps[`ya_cap${capIndex}_range_range_min`] != undefined) {
                        cap.rangeMin = parseInt(pluginProps[`ya_cap${capIndex}_range_range_min`]);
                    }
                    if (pluginProps[`ya_cap${capIndex}_range_range_max`]) {
                        cap.rangeMax = parseInt(pluginProps[`ya_cap${capIndex}_range_range_max`]);
                    }
                    if (pluginProps[`ya_cap${capIndex}_range_range_precision`]) {
                        cap.rangePrecision = parseInt(pluginProps[`ya_cap${capIndex}_range_range_precision`]);
                    }
                    cap.fns = parseFns(capIndex, type);
                }
                else if (type == "toggle") {
                    const instance = pluginProps[`ya_cap${capIndex}_toggle_instance`];
                    if (instance != '-')
                        cap.instance = instance;
                    cap.fns = parseFns(capIndex, type);
                }
                else {
                    console.error(`Неизвестный тип "${type}"`);
                }
                this.capabilities[capIndex] = cap;
            }
        }
        const propsCount = parseInt(pluginProps['properties_count']);
        if (!isNaN(propsCount)) {
            for (let propIndex = 0; propIndex <= propsCount; propIndex++) {
                const type = pluginProps[`ya_prop${propIndex}_type`];
                let instance = pluginProps[`ya_prop${propIndex}_${type}_instance`];
                if (instance == '-')
                    instance = undefined;
                let calcFnState = pluginProps[`ya_prop${propIndex}_${type}_calc`] || yandex_config_1.default.properties[type]['parameters']['visible']['calc']['default'];
                let prop = { type, instance, calcFnState };
                if (type == 'float') {
                    let unit = pluginProps[`ya_prop${propIndex}_${type}_unit_${instance}`];
                    if (unit == '-')
                        unit = null;
                    prop.unit = unit;
                }
                else if (type == 'event') {
                    let event = pluginProps[`ya_prop${propIndex}_${type}_event_${instance}`];
                    if (event == '-')
                        event = null;
                    prop.event = event;
                }
                else {
                    console.error(`Неизвестный тип "${type}"`);
                }
                this.properties[propIndex] = prop;
            }
        }
    }
    toString() {
        return `${util_1.default.inspect({ id: this.id, deviceType: this.deviceType, name: this.name, room: this.room, type: this.type, capabilities: this.capabilities }, false, 4)}`;
    }
    static makeFromPluginProps(plugin, pluginDevices, pluginTypes) {
        const typesById = {};
        for (let pluginProps of pluginTypes) {
            const type = new DeviceType(pluginProps);
            typesById[type.id] = type;
        }
        return pluginDevices.map(pluginProps => new Device(plugin, pluginProps, typesById)).filter(device => {
            const missedFields = device.validateMissedFields();
            if (missedFields) {
                console.error(`Устройство ${util_1.default.inspect(device.pluginProps)} пропущено. Не заполнены поля: ${missedFields}`);
                return false;
            }
            return true;
        });
    }
    validateMissedFields() {
        let result = [];
        if (!this.id)
            result.push('_id');
        if (!this.active)
            result.push('Включить в интеграцию');
        if (!this.type)
            result.push('Тип устройства');
        if (!this.name)
            result.push('Название для Алисы');
        if (this.capabilities.length == 0 && this.properties.length == 0)
            result.push('Умения или свойства');
        for (let i = 1; i <= this.capabilities.length; i++) {
            const cap = this.capabilities[i - 1];
            if (!cap.type)
                result.push(`Умение ${i}: тип`);
            if (cap.type == "color_setting") {
                if (!cap.instance)
                    result.push(`Умение ${i}: название функции умения`);
                if (cap.instance == 'rgb' && !cap.rgbFns?.prop)
                    result.push(`Умение ${i}: свойство`);
                if (cap.instance == 'rgb' && (!cap.rgbFns?.setFn || !cap.rgbFns?.getFn))
                    result.push(`Умение ${i}: функции пребразования`);
                if (cap.instance == 'hsv' && !cap.hsvFns?.prop)
                    result.push(`Умение ${i}: свойство`);
                if (cap.instance == 'hsv' && (!cap.hsvFns?.setFn || !cap.hsvFns?.getFn))
                    result.push(`Умение ${i}: функции пребразования`);
                if (cap.instance == 'temperature_k' && !cap.temperatureKFns?.prop)
                    result.push(`Умение ${i}: свойство`);
                if (cap.instance == 'temperature_k' && (!cap.temperatureKFns?.setFn || !cap.temperatureKFns?.getFn))
                    result.push(`Умение ${i}: функции пребразования`);
                if (cap.instance == 'scene' && !cap.colorSceneFns?.prop)
                    result.push(`Умение ${i}: свойство`);
                if (cap.instance == 'scene' && (!cap.colorSceneFns?.setFn || !cap.colorSceneFns?.getFn))
                    result.push(`Умение ${i}: функции пребразования`);
                if (cap.instance == 'scene' && !cap.colorSceneScenes)
                    result.push(`Умение ${i}: темы и сценарии освещения`);
            }
            else {
                if (!cap.fns?.prop && !(cap.fns?.cmdOn && cap.fns?.cmdOff))
                    result.push(`Умение ${i}: свойство`);
                if (!cap.fns?.setFn || !cap.fns?.getFn)
                    result.push(`Умение ${i}: функции пребразования`);
                if (cap.type == "mode") {
                    if (!cap.instance)
                        result.push(`Умение ${i}: название функции умения`);
                    if (!cap.modes)
                        result.push(`Умение ${i}: режимы работы функции`);
                }
                else if (cap.type == "range") {
                    if (!cap.instance)
                        result.push(`Умение ${i}: название функции умения`);
                }
                else if (cap.type == "toggle") {
                    if (!cap.instance)
                        result.push(`Умение ${i}: название функции умения`);
                }
            }
        }
        for (let i = 1; i <= this.properties.length; i++) {
            const prop = this.properties[i - 1];
            if (!prop.type)
                result.push(`Свойство ${i}: тип`);
            if (!prop.instance)
                result.push(`Свойство ${i}: название функции для свойства`);
            if (prop.type == "float") {
                if (!prop.unit)
                    result.push(`Свойство ${i}: единицы измерения значений функции`);
                if (!prop.calcFnState)
                    result.push(`Свойство ${i}: выражение для вычисления для отправки данных`);
            }
            else {
                if (!prop.event)
                    result.push(`Свойство ${i}: событие`);
                if (!prop.calcFnState)
                    result.push(`Свойство ${i}: Выражение для вычисления`);
            }
        }
        return result.length ? result.join(', ') : null;
    }
    setPropValue(prop, value) {
        console.debug(`setPropValue for ${this.id} [${this.name}], ${prop} -> ${value}`);
        if (!devicesPropValues[this.id])
            devicesPropValues[this.id] = {};
        devicesPropValues[this.id][prop] = value;
    }
    applyAction(capType, capState) {
        const cap = this.capabilities.find(cap => 'devices.capabilities.' + cap.type == capType);
        if (!cap) {
            return { status: 'ERROR', error_code: 'INVALID_ACTION', error_message: 'Умения не найдено' };
        }
        let err;
        if (cap.type == 'color_setting') {
            if (capState.instance == 'rgb') {
                err = this.runGetFn(capState.value, cap.rgbFns);
            }
            else if (capState.instance == 'hsv') {
                err = this.runGetFn(capState.value, cap.hsvFns);
            }
            else if (capState.instance == 'temperature_k') {
                err = this.runGetFn(capState.value, cap.temperatureKFns);
            }
            else if (capState.instance == 'scene') {
                err = this.runGetFn(capState.value, cap.colorSceneFns);
            }
            else {
                err = 'Не поддерживаемый instance';
            }
        }
        else {
            if (capState.relative) {
                const newVal = capState.value + this.getCapStateValue(cap);
                err = this.runGetFn(newVal, cap.fns);
            }
            else {
                err = this.runGetFn(capState.value, cap.fns);
            }
        }
        if (err) {
            return { status: 'ERROR', error_code: 'INTERNAL_ERROR', error_message: err };
        }
        else {
            return { status: 'DONE' };
        }
    }
    runGetFn(inValue, fns) {
        let outValue = inValue;
        if (!fns)
            return 'Не заданы действия';
        if (fns.getFn) {
            try {
                outValue = fns.getFn(inValue);
                //console.debug('getFn:', {input_value: inValue, out_value: outValue, fn: fns.getFn.toString()});
            }
            catch (err) {
                console.error('Ошибка запуска функции преобразования:', err);
                return 'Ошибка запуска функции преобразования';
            }
        }
        if (fns.cmdOn && outValue) {
            console.log(`Вызов ON команды для ${this.id}(${this.name}): ${fns.cmdOn}`);
            this.plugin.sendCommand({ did: this.id, act: fns.cmdOn });
        }
        else if (fns.cmdOff && !outValue) {
            console.log(`Вызов OFF команды для ${this.id}(${this.name}): ${fns.cmdOff}`);
            this.plugin.sendCommand({ did: this.id, act: fns.cmdOff });
        }
        else {
            console.log(`Установка свойства ${this.id}(${this.name}) ${fns.prop}, значение:`, outValue);
            this.plugin.sendCommand({ did: this.id, act: 'set', prop: fns.prop, value: outValue });
        }
    }
    getCapStateValue(cap) {
        if (cap.type == 'color_setting') {
            if (cap.instance == 'rgb') {
                return this.runSetFn(cap, cap.rgbFns);
            }
            else if (cap.instance == 'hsv') {
                return this.runSetFn(cap, cap.hsvFns);
            }
            else if (cap.instance == 'temperature_k') {
                return this.runSetFn(cap, cap.temperatureKFns);
            }
            else if (cap.instance == 'scene') {
                return this.runSetFn(cap, cap.colorSceneFns);
            }
            else {
                throw new Error('Не поддерживаемый instance');
            }
        }
        else {
            return this.runSetFn(cap, cap.fns);
        }
    }
    runSetFn(cap, fns) {
        if (!fns)
            throw new Error(`Не задан setFn для capabilty ${cap}`);
        if (!fns.prop)
            throw new Error(`Не задан prop для capabilty ${cap}`);
        const inValue = devicesPropValues[this.id]?.[fns.prop];
        let outValue = inValue;
        if (fns.setFn) {
            try {
                outValue = fns.setFn(inValue);
                //console.debug(` setFn for ${fns.prop}: ${inValue} -> ${outValue}`);
            }
            catch (err) {
                console.error('Ошибка запуска функции преобразования');
                throw err;
            }
        }
        return outValue;
    }
    runPropStateFn(fn) {
        if (devicesPropValues[this.id] === undefined)
            return undefined;
        const propsCopy = JSON.parse(JSON.stringify(devicesPropValues[this.id]));
        const context = node_vm_1.default.createContext(propsCopy);
        try {
            return node_vm_1.default.runInContext(fn, context);
        }
        catch (err) {
            console.error('Ошибка запуска выражения для вычисления:', err);
        }
    }
    capToYandexObj(cap) {
        const parameters = {};
        for (let [key, val] of Object.entries(yandex_config_1.default.capabilities[cap.type]['parameters']['hidden'])) {
            parameters[key] = val;
        }
        if (cap.type == 'color_setting') {
            if (cap.instance == 'rgb') {
                parameters['color_model'] = 'rgb';
            }
            else if (cap.instance == 'hsv') {
                parameters['color_model'] = 'hsv';
            }
            else if (cap.instance == 'temperature_k') {
                parameters['temperature_k'] = {
                    max: cap.temperatureKMax,
                    min: cap.temperatureKMin
                };
            }
            else if (cap.instance == 'scene') {
                parameters['color_scene'] = {
                    scenes: cap.colorSceneScenes?.map(scene => ({ id: scene }))
                };
            }
        }
        else if (cap.type == 'mode') {
            parameters['instance'] = cap.instance;
            parameters['modes'] = cap.modes?.map(mode => ({ value: mode }));
        }
        else if (cap.type == 'range') {
            parameters['instance'] = cap.instance;
            parameters['unit'] = cap.unit;
            parameters['random_access'] = cap.randomAccess;
            if (cap.rangeMax != undefined || cap.rangeMin != undefined || cap.rangePrecision != undefined)
                parameters['range'] = {};
            if (cap.rangeMax != undefined)
                parameters['range']['max'] = cap.rangeMax;
            if (cap.rangeMin != undefined)
                parameters['range']['min'] = cap.rangeMin;
            if (cap.rangePrecision != undefined)
                parameters['range']['precision'] = cap.rangePrecision;
        }
        else if (cap.type == 'toggle') {
            parameters['instance'] = cap.instance;
        }
        return {
            type: 'devices.capabilities.' + cap.type,
            retrievable: true,
            reportable: true,
            parameters
        };
    }
    propsToYandexObj(props) {
        let result = [];
        const floatProps = props.filter(prop => prop.type === 'float');
        for (let prop of floatProps) {
            result.push({
                type: 'devices.properties.float',
                retrievable: true,
                reportable: true,
                parameters: {
                    instance: prop.instance,
                    unit: prop.unit
                }
            });
        }
        let eventsByInstance = {};
        const eventProps = props.filter(prop => prop.type === 'event');
        for (let prop of eventProps) {
            if (!eventsByInstance[prop.instance])
                eventsByInstance[prop.instance] = [];
            if (prop.event)
                eventsByInstance[prop.instance]?.push(prop.event);
        }
        for (let [instance, events] of Object.entries(eventsByInstance)) {
            result.push({
                type: 'devices.properties.event',
                retrievable: true,
                reportable: true,
                parameters: {
                    instance,
                    events: events.map(event => ({ value: event }))
                }
            });
        }
        return result;
    }
    toYandexPropsObj() {
        return {
            id: this.id,
            name: this.name,
            room: this.room,
            description: this.deviceType?.title,
            type: this.type,
            custom_data: {},
            capabilities: this.capabilities.map(cap => this.capToYandexObj(cap)),
            properties: this.propsToYandexObj(this.properties),
            device_info: {
                manufacturer: "intrahouse",
                model: `intrahouse device ${this.deviceType?.id}`,
                sw_version: "1"
            }
        };
    }
    toYandexStateObj() {
        const capabilities = this.capabilities.map(cap => {
            const instance = cap.type == 'on_off' ? 'on' : cap.instance;
            return {
                type: 'devices.capabilities.' + cap.type,
                state: {
                    instance,
                    value: this.getCapStateValue(cap)
                }
            };
        });
        let properties = this.properties.filter(prop => prop.type === 'float').map(prop => {
            return {
                type: 'devices.properties.' + prop.type,
                state: {
                    instance: prop.instance,
                    value: this.runPropStateFn(prop.calcFnState)
                }
            };
        });
        // ведем учет уже сработавших событий - технически это возожно
        // таким образом отправиться в yandex первое подходящее событие
        let instances = new Set();
        for (let prop of this.properties.filter(prop => prop.type === 'event')) {
            if (instances.has(prop.instance))
                continue;
            if (!this.runPropStateFn(prop.calcFnState))
                continue;
            instances.add(prop.instance);
            properties.push({
                type: 'devices.properties.' + prop.type,
                state: {
                    instance: prop.instance,
                    value: prop.event
                }
            });
        }
        return {
            id: this.id,
            capabilities,
            properties
        };
    }
}
exports.Device = Device;
