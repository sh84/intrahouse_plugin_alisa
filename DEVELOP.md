## Разработка

Код написан на typescript и расположен в папке **src**. Что бы его запускать в рамках IntraHouse нужно его преобразовать в JS, который расположен в папке **js**. Для этого можно сделать либо `npm run build` для одноразового запуска, либо `npm run watch` для запуска фонового преобразования.

-----
Основные файлы задающие формы интеграции устройства с Алисой - это **v5/formIntegration.json** и **v5/formTypeIntegration.json**.
Оба этих файла генерятся автоматически по файлу **src/yandex-config.ts** с помощью запуска команды `npm run generate-forms`.

Файл **src/yandex-config.ts** составляется полу ручным способом:

### Умения

Извлекаем всю необходимую информацию из документации яндекса отсюда: https://yandex.ru/dev/dialogs/smart-home/doc/concepts/device-types.html
Для упрощения этой работы можно в консоли браузера на каждой странице умения запускать код:
```
let name = $('#ariaid-title1').text().trim();
let desc = $('.doc-c-abstract').text().trim();
let example = ($('.doc-c-p[id$="examples"]').text().trim() || $('.doc-c-p[id$="exmaples"]').text().trim());
let phrases = $('.doc-c-section[id$="phrases"] em').toArray().map(el => el.innerText.trim());
console.log(`    {
      name: '${name}',
      desc: '${desc}',
      example: '${example}',
      phrases: [${phrases.map(ph => `'${ph}'`).join(`,
                `)}]
    },`)
```
### События

Извлекаем всю необходимую информацию из документации яндекса отсюда: https://yandex.ru/dev/dialogs/smart-home/doc/concepts/properties-types.html
