export default {
  devices: [
    {
      name: 'devices.types.light',
      desc: 'Устройство, которое имеет управляемые светящиеся элементы.',
      example: 'Лампочка, светильник, ночник, люстра.',
      phrases: ['Алиса, включи свет.',
                'Алиса, выключи свет.',
                'Алиса, прибавь яркость света.',
                'Алиса, сделай свет теплее.']
    },
    {
      name: 'devices.types.socket',
      desc: 'Розетка.',
      example: 'Умная розетка.',
      phrases: ['Алиса, включи розетку.',
                'Алиса, выключи розетки в зале.']
    },
    {
      name: 'devices.types.switch',
      desc: 'Выключатель.',
      example: 'Настенный выключатель света, тумблер, автомат в электрическом щитке, умное реле, умная кнопка.',
      phrases: []
    },
    {
      name: 'devices.types.thermostat',
      desc: 'Устройство с возможностью регулирования температуры.',
      example: 'Водонагреватель, теплый пол, обогреватель, электровентилятор. Для кондиционера рекомендуется использовать отдельный тип "Устройство, управляющее микроклиматом в помещении, с возможностью регулирования температуры и режима работы."',
      phrases: []
    },
    {
      name: 'devices.types.thermostat.ac',
      desc: 'Устройство, управляющее микроклиматом в помещении, с возможностью регулирования температуры и режима работы.',
      example: 'Кондиционер.',
      phrases: []
    },
    {
      name: 'devices.types.media_device',
      desc: 'Аудио, видео, мультимедиа техника. Устройства, которые умеют воспроизводить звук и видео.',
      example: 'DVD-плеер и другие медиаустройства. Для телевизора рекомендуется использовать отдельный тип devices.types.media_device.tv , для умной ТВ-приставки — devices.types.media_device.tv_box , для ресивера — devices.types.media_device.receiver .',
      phrases: []
    },
    {
      name: 'devices.types.media_device.tv',
      desc: 'Устройство для просмотра видеоконтента. На устройстве можно изменять громкость и переключать каналы.',
      example: 'Умный телевизор, ИК-пульт от телевизора, медиаприставка, ресивер.',
      phrases: []
    },
    {
      name: 'devices.types.media_device.tv_box',
      desc: 'Устройство, подключаемое к телевизору или дисплею, для просмотра видеоконтента. На устройстве можно управлять громкостью воспроизведения и переключать каналы.',
      example: 'ИК-пульт от ТВ-приставки, умная ТВ-приставка.',
      phrases: []
    },
    {
      name: 'devices.types.media_device.receiver',
      desc: 'Устройство, подключаемое к телевизору или дисплею, для просмотра видеоконтента. На устройстве можно изменять громкость, переключать каналы и источники аудио-/видеосигнала.',
      example: 'ИК-пульт от ресивера, AV-ресивер, спутниковый ресивер.',
      phrases: []
    },
    {
      name: 'devices.types.cooking',
      desc: 'Различная умная кухонная техника.',
      example: 'Холодильник, духовой шкаф, кофеварка, мультиварка. Для чайника рекомендуется использовать отдельный тип devices.types.cooking.kettle , для кофеварки — devices.types.cooking.coffee_maker.',
      phrases: []
    },
    {
      name: 'devices.types.cooking.coffee_maker',
      desc: 'Устройство, которое умеет делать кофе.',
      example: 'Кофеварка, кофемашина.',
      phrases: []
    },
    {
      name: 'devices.types.cooking.kettle',
      desc: 'Устройство, которое умеет кипятить воду и/или делать чай.',
      example: 'Умный чайник, термопот.',
      phrases: []
    },
    {
      name: 'devices.types.cooking.multicooker',
      desc: 'Устройство, которое выполняет функции мультиварки — приготовление пищи по заданным программам.',
      example: 'Мультиварка.',
      phrases: []
    },
    {
      name: 'devices.types.openable',
      desc: 'Устройство, которое умеет открываться и/или закрываться.',
      example: 'Дверь, ворота, окно, ставни. Для штор и жалюзи рекомендуется использовать отдельный тип devices.types.openable.curtain .',
      phrases: []
    },
    {
      name: 'devices.types.openable.curtain',
      desc: 'Устройство, которое выполняет функцию штор.',
      example: 'Шторы, жалюзи.',
      phrases: []
    },
    {
      name: 'devices.types.humidifier',
      desc: 'Устройство, которое умеет изменять влажность в помещении.',
      example: 'Увлажнитель воздуха.',
      phrases: []
    },
    {
      name: 'devices.types.purifier',
      desc: 'Устройство с функцией очистки воздуха.',
      example: 'Очиститель воздуха, мойка воздуха.',
      phrases: []
    },
    {
      name: 'devices.types.vacuum_cleaner',
      desc: 'Устройство, которое выполняет функцию пылесоса.',
      example: 'Робот-пылесос.',
      phrases: []
    },
    {
      name: 'devices.types.washing_machine',
      desc: 'Устройство для стирки белья.',
      example: 'Стиральная машина.',
      phrases: []
    },
    {
      name: 'devices.types.dishwasher',
      desc: 'Устройство для мытья посуды.',
      example: 'Посудомоечная машина.',
      phrases: []
    },
    {
      name: 'devices.types.iron',
      desc: 'Устройство, которое выполняет функции утюга.',
      example: 'Утюг, парогенератор.',
      phrases: []
    },
    {
      name: 'devices.types.sensor',
      desc: 'Устройство, которое передает данные со свойств.',
      example: 'Датчик температуры, датчик влажности, датчик открытия двери, датчик движения.',
      phrases: []
    },
    {
      name: 'devices.types.pet_drinking_fountain',
      desc: 'Устройство, которое наполняет водой миску домашнего животного.',
      example: 'Поилка.',
      phrases: []
    },
    {
      name: 'devices.types.pet_feeder',
      desc: 'Устройство для кормления домашних животных.',
      example: 'Кормушка.',
      phrases: []
    },
    {
      name: 'devices.types.other',
      desc: 'Остальные устройства.',
      example: 'Остальные устройства, не подходящие под типы выше.',
      phrases: []
    }
  ],

  capabilities: {
    'on_off': {
      desc: 'Удаленное включение и выключение устройства (аналог нажатия кнопки питания на устройстве или его пульте управления). Является базовым умением для большинства устройств.',
      parameters: {
        hidden: {
          'split': false
        },
        visible: {
          // спец параметр - задает несколько полей для выбора свойства и команды для приема/отправки сообщений
          'fns_block': {
            title: 'Отсылаемое и принимаемое значение: true или false',
            type: 'fns_block',
            default_set_fn: 'Boolean(value)',
            default_get_fn: 'value ? 1 : 0'
          }
        }
      }
    },
    'color_setting': {
      desc: `Управление цветом для светящихся элементов в устройстве. Устройство может иметь одну или несколько из перечисленных функций:
        изменение цвета своих светящихся элементов на произвольный из схемы HSV или из модели RGB;
        изменение температуры цвета своих светящихся элементов;
        воспроизведение различных визуальных эффектов.`,
      parameters: {
        hidden: {},
        visible: {
          'instance': {
            title: 'Название функции умения',
            type: 'droplist',
            data: [
              {id: 'rgb', title: 'Произвольное изменение цвета (RGB).'},
              {id: 'hsv', title: 'Произвольное изменение цвета (HSV).'},
              {id: 'temperature_k', title: 'Изменение температуры цвета.'},
              {id: 'scene', title: 'Темы и сценарии освещения.'},
            ]
          },
          'rgb_fns_block': {
            title: 'Отсылаемое и принимаемое значение: число от 0 до 16777215',
            type: 'fns_block',
            visible_for: {'instance': 'rgb'},
            default_set_fn: 'value',
            default_get_fn: 'value'
          },
          'hsv_fns_block': {
            title: 'Отсылаемое и принимаемое значение: объект вида {h: 255, s: 100, v: 50}',
            type: 'fns_block',
            visible_for: {'instance': 'hsv'},
            default_set_fn: 'value',
            default_get_fn: 'value'
          },
          'temperature_k_min': {
            title: 'Изменение температуры цвета в кельвинах. Min',
            type: 'number',
            visible_for: {'instance': 'temperature_k'}
          },
          'temperature_k_max': {
            title: 'Изменение температуры цвета в кельвинах. Max',
            type: 'number',
            visible_for: {'instance': 'temperature_k'}
          },
          'temperature_k_fns_block': {
            title: 'Отсылаемое и принимаемое значение: число (температура в кельвинах)',
            visible_for: {'instance': 'temperature_k'},
            type: 'fns_block',
            default_set_fn: 'Number(value)',
            default_get_fn: 'value'
          },
         'color_scene_scenes': {
            title: 'Темы и сценарии освещения. Значения чере запятую.',
            type: 'input',
            visible_for: {'instance': 'scene'}
          },
          'color_scene_fns_block': {
            title: 'Отсылаемое и принимаемое значение: сценарий из списка выше',
            type: 'fns_block',
            visible_for: {'instance': 'scene'},
            default_set_fn: 'value',
            default_get_fn: 'value'
          },
        },
      }
    },
    'mode': {
      desc: 'Переключение режимов работы устройства, например, переключение между температурными режимами работы кондиционера: «Охлаждение», «Нагрев» или «Авто».',
      parameters: {
        hidden: {},
        visible: {
          'instance': {
            title: 'Название функции умения',
            type: 'droplist',
            data: [
              {id: 'cleanup_mode', title: 'Установка режима уборки.'},
              {id: 'coffee_mode', title: 'Установка режима работы кофеварки.'},
              {id: 'dishwashing', title: 'Установка режима мытья посуды.'},
              {id: 'fan_speed', title: 'Установка режима работы скорости вентиляции, например, в кондиционере, вентиляторе или обогревателе.'},
              {id: 'heat', title: 'Установка режима нагрева.'},
              {id: 'input_source', title: 'Установка источника сигнала.'},
              {id: 'program', title: 'Установка какой-либо программы работы.'},
              {id: 'swing', title: 'Установка направления воздуха в климатической технике.'},
              {id: 'tea_mode', title: 'Установка режима приготовления чая.'},
              {id: 'thermostat', title: 'Установка температурного режима работы климатической техники, например, в кондиционере.'},
              {id: 'work_speed', title: 'Установка скорости работы.'},
            ]
          },
          'modes': {
            title: 'Режимы работы функции. Значения чере запятую.',
            type: 'input'
          },
          'fns_block': {
            title: 'Отсылаемое и принимаемое значение: ',
            type: 'fns_block',
            default_set_fn: 'value',
            default_get_fn: 'value'
          }
        }
      }
    },
    'range': {
      desc: 'Управление параметрами устройства, которые имеют диапазон. Например, яркость лампы, громкость звука, температура обогревателя.',
      parameters: {
        hidden: {},
        visible: {
          'instance': {
            title: 'Название функции умения',
            type: 'droplist',
            data: [
              {id: 'brightness', title: 'Изменение яркости световых элементов.'},
              {id: 'channel', title: 'Изменение канала, например телевизионного.'},
              {id: 'humidity', title: 'Изменение влажности.'},
              {id: 'open', title: 'Открывание чего-либо (открывание штор, окна).'},
              {id: 'temperature', title: 'Изменение температуры. Может обозначать температуру нагрева чайника, обогревателя или температуру кондиционера в каком-либо его режиме.'},
              {id: 'volume', title: 'Изменение громкости устройства.'},
            ]
          },
          'unit': {
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.percent', title: 'Проценты'},
              {id: 'unit.temperature.celsius', title: 'Градусы цельсия'},
              {id: 'unit.temperature.kelvin', title: 'Кельвины'}
            ]
          },
          'random_access': {
            title: 'Возможность устанавливать произвольные значения функции',
            type: 'cb',
            default: 1
          },
          'range_min': {
            title: 'Минимальное допустимое значение',
            type: 'number'
          },
          'range_max': {
            title: 'Максимальное допустимое значение',
            type: 'number'
          },
          'range_precision': {
            title: 'Минимальный шаг изменения значений внутри диапазона',
            type: 'number',
            default: 1
          },
          'fns_block': {
            title: 'Отсылаемое и принимаемое значение: ',
            type: 'fns_block',
            default_set_fn: 'value',
            default_get_fn: 'value'
          }
        }
      }
    },
    'toggle': {
      desc: 'Управление параметрами устройства, которые могут находиться только в одном из двух состояний. Например, кнопки, тумблеры и подобные им элементы управления, которые включают или выключают какую-либо дополнительную функцию устройства.',
      parameters: {
        hidden: {},
        visible: {
          'instance': {
            title: 'Название функции умения',
            type: 'droplist',
            data: [
              {id: 'backlight', title: 'Функция отвечает за включение подсветки.'},
              {id: 'controls_locked', title: 'Функция отвечает за блокировку управления и включение детского режима.'},
              {id: 'ionization', title: 'Функция отвечает за включение ионизации.'},
              {id: 'keep_warm', title: 'Функция отвечает за включение поддержания тепла.'},
              {id: 'mute', title: 'Функция отвечает за выключение звука на устройстве.'},
              {id: 'oscillation', title: 'Функция отвечает за включение вращения. Например, включение вращения вентилятора.'},
              {id: 'pause', title: 'Функция отвечает за временную остановку (паузу) текущей деятельности устройства. Например, постановка фильма на паузу или временная остановка работающего робота-пылесоса.'},
            ]
          },
          'fns_block': {
            title: 'Отсылаемое и принимаемое значение: ',
            type: 'fns_block',
            default_set_fn: 'value',
            default_get_fn: 'value'
          }
        }
      }
    } 
  }
};
