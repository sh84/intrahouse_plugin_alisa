"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const yandex_config_1 = __importDefault(require("../yandex-config"));
function generate(forType) {
    const table = forType ? '_types' : '_devices';
    const form = {
        spacing: 10,
        grid: [
            { id: 'header', xs: 12, class: 'main', hide: '' },
            { id: 'main', xs: 12, class: 'main', table, hide: '' },
        ],
        header: [
            { prop: '_title1', title: 'Информация о типах устройств: https://yandex.ru/dev/dialogs/smart-home/doc/concepts/device-types.html', type: 'header' },
            { prop: '_title2', title: 'Информация о умениях: https://yandex.ru/dev/dialogs/smart-home/doc/concepts/capability-types.html', type: 'header' },
            { prop: '_title3', title: 'Информация о свойствах: https://yandex.ru/dev/dialogs/smart-home/doc/concepts/properties-types.html', type: 'header' },
        ],
        main: []
    };
    if (!forType) {
        form.main.push({ prop: 'active', title: 'Включить в интеграцию', type: 'cb' });
        form.main.push({ prop: 'inherit', title: 'Наследовать настройки из типа', type: 'cb' });
        form.main.push({ prop: 'ya_name', title: 'Название для Алисы', type: 'input' });
        form.main.push({ prop: 'ya_room', title: 'Комната', type: 'input' });
    }
    form.main.push({ prop: 'ya_type', title: 'Тип устройства (Yandex)', type: 'droplist', data: [], hide: 'data.main.inherit' });
    // заполняем значениями Тип устройства и добвляем подсказки команд
    const yaType = form.main.find(el => el['prop'] == 'ya_type');
    for (let device of yandex_config_1.default.devices) {
        yaType.data.push({ id: device.name, title: device.desc });
        form.main.push({
            prop: `_title_example_${device.name}`,
            title: 'Пример: \n' + device.example,
            type: 'header',
            hide: `data.main.inherit || data.main.ya_type.id != '${device.name}'`
        });
        if (device.phrases?.length)
            form.main.push({
                prop: `_title_phrases_${device.name}`,
                title: 'Фразы: \n' + device.phrases.join(' \n '),
                type: 'header',
                hide: `data.main.inherit || data.main.ya_type.id != '${device.name}'`
            });
    }
    form.main.push({
        prop: `capabilities_count`,
        title: 'Количество умений',
        type: 'droplist',
        hide: 'data.main.inherit',
        data: [
            { id: '-', title: '-' },
            { id: '0', title: '1' },
            { id: '1', title: '2' },
            { id: '2', title: '3' },
            { id: '3', title: '4' },
            { id: '4', title: '5' },
        ],
        default: '-'
    });
    form.main.push({
        prop: `properties_count`,
        title: 'Количество свойств*событий',
        type: 'droplist',
        hide: 'data.main.inherit',
        data: [
            { id: '-', title: '-' },
            { id: '0', title: '1' },
            { id: '1', title: '2' },
            { id: '2', title: '3' },
            { id: '3', title: '4' },
            { id: '4', title: '5' },
            { id: '5', title: '6' },
            { id: '6', title: '7' },
            { id: '7', title: '8' },
        ],
        default: '-'
    });
    // генерим плашки для умений
    const capTypesList = Object.keys(yandex_config_1.default.capabilities).map(capName => ({ id: capName, title: capName }));
    for (let capIndex = 0; capIndex < 8; capIndex++) {
        const tableId = `capability_${capIndex}`;
        form.grid.push({
            id: tableId,
            xs: 12,
            class: 'main',
            table,
            hide: `data.main.inherit || data.main.capabilities_count.id == '-' || data.main.capabilities_count.id < ${capIndex}`
        });
        const capTable = [];
        capTable.push({
            prop: `_title`, title: `Умение №${capIndex + 1}`, type: 'header'
        });
        capTable.push({
            prop: `ya_cap${capIndex}_type`, title: 'Тип умения', type: 'droplist', data: capTypesList
        });
        for (let [capName, capability] of Object.entries(yandex_config_1.default.capabilities)) {
            const hide = `data.${tableId}.ya_cap${capIndex}_type.id != '${capName}'`;
            capTable.push({
                prop: `_${capName}${capIndex}_title_desc`,
                title: capability.desc,
                type: 'header',
                hide
            });
            for (let [paramName, paramProps] of Object.entries(capability.parameters.visible)) {
                let paramHide = hide;
                if (paramProps['visible_for']) {
                    for (let [visibleParam, paramVal] of Object.entries(paramProps['visible_for'])) {
                        paramHide += ` || data.${tableId}.ya_cap${capIndex}_${capName}_${visibleParam}.id != '${paramVal}'`;
                    }
                }
                if (paramProps.type == 'fns_block') {
                    capTable.push({ prop: `_${capName}${capIndex}_${paramName}_fns_title`,
                        title: paramProps['title'],
                        type: 'header', hide: paramHide });
                    capTable.push({ prop: `ya_cap${capIndex}_${capName}_${paramName}_prop`,
                        title: 'Свойство (если заполнены обе команды ниже - используются они вместо записи в свойство)',
                        type: 'droplist', data: '__devprop', hide: paramHide });
                    capTable.push({ prop: `ya_cap${capIndex}_${capName}_${paramName}_cmd_on`,
                        title: 'Команда для запуска при true значении',
                        type: 'droplist', data: '__devcmd', hide: paramHide });
                    capTable.push({ prop: `ya_cap${capIndex}_${capName}_${paramName}_cmd_off`,
                        title: 'Команда для запуска при false значении',
                        type: 'droplist', data: '__devcmd', hide: paramHide });
                    capTable.push({ prop: `ya_cap${capIndex}_${capName}_${paramName}_set_fn`,
                        title: 'Функция пребразования для отправки значения, в value - свойство выбранное выше',
                        type: 'input', default: paramProps['default_set_fn'], hide: paramHide });
                    capTable.push({ prop: `ya_cap${capIndex}_${capName}_${paramName}_get_fn`,
                        title: 'Функция пребразования при приёме значения, в value - принимаемое значение',
                        type: 'input', default: paramProps['default_get_fn'], hide: paramHide });
                }
                else {
                    // на данный момент default для droplist не работает
                    /*
                    if (paramProps.type == 'droplist' && !paramProps['default']) {
                      paramProps['default'] = {
                        id: paramProps['data'][0].id,
                        title: paramProps['data'][0].title,
                      };
                    }
                    */
                    capTable.push({
                        prop: `ya_cap${capIndex}_${capName}_${paramName}`,
                        ...paramProps,
                        visible_for: undefined,
                        form_tag: undefined,
                        hide: paramHide
                    });
                }
            }
        }
        form[tableId] = capTable;
    }
    // генерим плашки для свойств
    for (let propIndex = 0; propIndex < 5; propIndex++) {
        const tableId = `property_${propIndex}`;
        form.grid.push({
            id: tableId,
            xs: 12,
            class: 'main',
            table,
            hide: `data.main.inherit || data.main.properties_count.id == '-' || data.main.properties_count.id < ${propIndex}`
        });
        const propTable = [];
        propTable.push({
            prop: `_title`, title: `Свойство №${propIndex + 1}`, type: 'header'
        });
        propTable.push({
            prop: `ya_prop${propIndex}_type`, title: 'Тип свойства', default: 'float', type: 'droplist', data: [
                { id: 'float', title: 'Float' },
                { id: 'event', title: 'Event' }
            ]
        });
        const propTitles = {
            float: 'Отображение значений свойств устройства в числовом формате.',
            event: 'Отображение показаний свойств устройства в виде событий.'
        };
        for (let propType of Object.keys(yandex_config_1.default.properties)) {
            let hide = `data.${tableId}.ya_prop${propIndex}_type.id != '${propType}'`;
            propTable.push({
                prop: `_${propType}${propIndex}_title_desc`,
                title: propTitles[propType],
                type: 'header',
                hide
            });
            for (let [paramName, paramProps] of Object.entries(yandex_config_1.default.properties[propType].parameters.visible)) {
                let paramHide = hide;
                if (paramProps['visible_for']) {
                    for (let [visibleParam, paramVal] of Object.entries(paramProps['visible_for'])) {
                        paramHide += ` || data.${tableId}.ya_prop${propIndex}_${propType}_${visibleParam}.id != '${paramVal}'`;
                    }
                }
                // на данный момент default для droplist не работает
                /*if (paramProps.type == 'droplist' && !paramProps['default']) {
                  paramProps['default'] = {
                    id: paramProps['data'][0].id,
                    title: paramProps['data'][0].title,
                  };
                }*/
                propTable.push({
                    prop: `ya_prop${propIndex}_${propType}_${paramName}`,
                    ...paramProps,
                    visible_for: undefined,
                    form_tag: undefined,
                    hide: paramHide
                });
            }
        }
        form[tableId] = propTable;
    }
    return form;
}
let file = path_1.default.join(__dirname, '../../v5/formIntegration.json');
fs_1.default.writeFileSync(file, JSON.stringify(generate(false), null, 2), 'utf8');
console.log(`Generated ${file}`);
file = path_1.default.join(__dirname, '../../v5/formTypeIntegration.json');
fs_1.default.writeFileSync(file, JSON.stringify(generate(true), null, 2), 'utf8');
console.log(`Generated ${file}`);
