## Интеграция с Яндекс

### Гланая вводная
Для связи с нашим плагином в IntraHouse нужно иметь рабочий домен и ssl сертификат к нему, и настроить проброс (проксирование) запросов от Яндекса к данному плагину (на порт указанный в настроqйках плагина).

### Настройка

Пользуемся возможностью заводить произвольные приватные навыки в [ЯндексДиалогах](https://dialogs.yandex.ru/developer): **Создать диалог** -> **Умный дом**.
В приватном режиме он будет видимым только себе (и конкртным указанным пользователям), не нужно проходить модерацию.

*Название* - произвольное.  
В *Endpoint URL* заносим свой урл (``https://мой_домен/``), *Тип доступа*: Приватный, *Официальный навык*: нет.  
В вкладке **Связка аккаунтов**:
*Идентификатор приложения*: что угодно, например alisa_intrahouse.  
*Секрет приложения*: указать такой же, как в поле **Oauth cекрет приложения** настроек плагина.  
*URL авторизации*: ``https://мой_домен/oauth/authorize``  
*URL для получения токена*: ``https://мой_домен/oauth/token``

**Сохраняем, публикуем.**

На странице созданного навыка умного дома будет поле "Идентификатор диалога". Необходимо скопировать его значение в поле **Идентификатор диалога** настроек плагина.


Использовать API сервиса уведомлений (что бы наш плагин мог сам отправлять данные  в Яндекс) можно только от имени пользователя Яндекса, который создал навык в Диалогах. На этой странице есть ссылка для получения кода для обращения к api яндекса от имени пользователя: https://yandex.ru/dev/dialogs/smart-home/doc/reference-alerts/resources-alerts.html.
Ищем текст `Для этого нужно получить OAuth-токен для Диалогов`.  
Полученный код сохранить в поле **OAuth-токен пользователя** настроек плагина.

После этого умный дом с придуманным названием появится в списке умных домов приложения управления умным дома Яндекса. Дальше все аналогично любому другому умному дому (например Xiaomi).
