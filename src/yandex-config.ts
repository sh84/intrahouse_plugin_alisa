export default {
  devices: [
    {
      name: 'devices.types.camera',
      desc: 'Устройство со встроенной камерой и функцией трансляции видео.',
      example: 'Видеокамера, видео-домофон, дверной глазок с камерой.',
      phrases: ['Алиса, покажи камеру в прихожей.',
                'Алиса, включи видео из детской.',
                'Алиса, видео на даче.',
                'Алиса, камера в коридоре.']
    },
    {
      name: 'devices.types.cooking',
      desc: 'Различная умная кухонная техника.',
      example: 'Холодильник, духовой шкаф. Для чайника рекомендуется использовать отдельный тип  devices.types.cooking.kettle , для кофеварки —  devices.types.cooking.coffee_maker , для мультиварки —  devices.types.cooking.multicooker .',
      phrases: []
    },
    {
      name: 'devices.types.cooking.coffee_maker',
      desc: 'Устройство, которое умеет делать кофе.',
      example: 'Кофеварка, кофемашина.',
      phrases: ['Алиса, включи кофеварку.',
                'Алиса, свари кофе.',
                'Алиса, сделай кофе.',
                'Алиса, включи кофемашину.']
    },
    {
      name: 'devices.types.cooking.kettle',
      desc: 'Устройство, которое умеет кипятить воду и/или делать чай.',
      example: 'Умный чайник, термопот.',
      phrases: ['Алиса, поставь чайник.',
                'Алиса, вскипяти чайник.',
                'Алиса, нагрей чайник.',
                'Алиса, подогрей чайник.']
    },
    {
      name: 'devices.types.cooking.multicooker',
      desc: 'Устройство, которое выполняет функции мультиварки — приготовление пищи по заданным программам.',
      example: 'Мультиварка.',
      phrases: ['Алиса, включи мультиварку.',
                'Алиса, выруби мультиварку.']
    },
    {
      name: 'devices.types.dishwasher',
      desc: 'Устройство для мытья посуды.',
      example: 'Посудомоечная машина.',
      phrases: ['Алиса, включи посудомоечную машину.',
                'Алиса, запусти посудомойку.']
    },
    {
      name: 'devices.types.humidifier',
      desc: 'Устройство, которое умеет изменять влажность в помещении.',
      example: 'Увлажнитель воздуха.',
      phrases: ['Алиса, включи увлажнитель воздуха.',
                'Алиса, выключи воздухоувлажнитель.',
                'Алиса, включи увлажнитель.']
    },
    {
      name: 'devices.types.iron',
      desc: 'Устройство, которое выполняет функции утюга.',
      example: 'Утюг, парогенератор.',
      phrases: ['Алиса, выключи утюг.',
                'Алиса, выруби парогенератор.']
    },
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
      name: 'devices.types.media_device',
      desc: 'Аудио, видео, мультимедиа техника. Устройства, которые умеют воспроизводить звук и видео.',
      example: 'DVD-плеер и другие медиаустройства. Для телевизора рекомендуется использовать отдельный тип  devices.types.media_device.tv , для умной ТВ-приставки —  devices.types.media_device.tv_box , для ресивера —  devices.types.media_device.receiver .',
      phrases: []
    },
    {
      name: 'devices.types.media_device.receiver',
      desc: 'Устройство, подключаемое к телевизору или дисплею, для просмотра видеоконтента. На устройстве можно изменять громкость, переключать каналы и источники аудио-/видеосигнала.',
      example: 'ИК-пульт от ресивера, AV-ресивер, спутниковый ресивер.',
      phrases: ['Алиса, включи ресивер.',
                'Алиса, сделай ресивер погромче.',
                'Алиса, выключи звук на ресивере.',
                'Алиса, включи на ресивере пятый канал.',
                'Алиса, включи первый источник сигнала на ресивере.']
    },
    {
      name: 'devices.types.media_device.tv',
      desc: 'Устройство для просмотра видеоконтента. На устройстве можно изменять громкость и переключать каналы.',
      example: 'Умный телевизор, ИК-пульт от телевизора, медиаприставка, ресивер.',
      phrases: ['Алиса, включи телевизор.',
                'Алиса, выключи телек.',
                'Алиса, сделай телевизор погромче.',
                'Алиса, выключи звук на телевизоре.',
                'Алиса, включи на телеке пятый канал.']
    },
    {
      name: 'devices.types.media_device.tv_box',
      desc: 'Устройство, подключаемое к телевизору или дисплею, для просмотра видеоконтента. На устройстве можно управлять громкостью воспроизведения и переключать каналы.',
      example: 'ИК-пульт от ТВ-приставки, умная ТВ-приставка.',
      phrases: ['Алиса, включи приставку.',
                'Алиса, сделай приставку погромче.',
                'Алиса, выключи звук на приставке.',
                'Алиса, включи на приставке пятый канал.',
                'Алиса, поставь приставку на паузу.']
    },
    {
      name: 'devices.types.openable',
      desc: 'Устройство, которое умеет открываться и/или закрываться.',
      example: 'Дверь, ворота, окно, ставни. Для штор и жалюзи рекомендуется использовать отдельный тип  devices.types.openable.curtain .',
      phrases: ['Алиса, открой дверь.',
                'Алиса, закрой окно.']
    },
    {
      name: 'devices.types.openable.curtain',
      desc: 'Устройство, которое выполняет функцию штор.',
      example: 'Шторы, жалюзи.',
      phrases: ['Алиса, открой шторы.',
                'Алиса, закрой шторы.']
    },
    {
      name: 'devices.types.other',
      desc: 'Любые устройства, не подходящие под доступные типы. Ограничение. Если для устройства доступен подходящий тип из списка — используйте его. Иначе навык может быть отклонен на этапе модерации и тестирования.',
      example: 'Любые устройства, не подходящие под доступные типы.',
      phrases: []
    },
    {
      name: 'devices.types.pet_drinking_fountain',
      desc: 'Устройство, которое наполняет водой миску домашнего животного.',
      example: 'Поилка.',
      phrases: ['Алиса, включи поилку.',
                'Алиса, выключи питьевой фонтанчик.']
    },
    {
      name: 'devices.types.pet_feeder',
      desc: 'Устройство для кормления домашних животных.',
      example: 'Кормушка.',
      phrases: ['Алиса, пора накормить моего кота.',
                'Алиса, покорми котика.',
                'Алиса, насыпь в миску еды.',
                'Алиса, наполни чашку кота.']
    },
    {
      name: 'devices.types.purifier',
      desc: 'Устройство с функцией очистки воздуха.',
      example: 'Очиститель воздуха, мойка воздуха.',
      phrases: ['Алиса, включи очиститель.',
                'Алиса, включи воздухоочиститель.',
                'Алиса, включи очиститель воздуха.']
    },
    {
      name: 'devices.types.sensor',
      desc: 'Устройство, которое передает данные со свойств.',
      example: 'Датчик температуры, датчик влажности, датчик открытия двери, датчик движения.',
      phrases: ['Алиса, что с температурой на кухне?',
                'Алиса, что с уровнем углекислого газа в спальне?',
                'Алиса, какая влажность в детской?']
    },
    {
      name: 'devices.types.sensor.button',
      desc: 'Устройство, которое сообщает о нажатии на кнопку.',
      example: 'Умная кнопка.',
      phrases: ['Алиса, когда последний раз нажимали на кнопку?',
                'Алиса, отключи кнопку до 10 утра.']
    },
    {
      name: 'devices.types.sensor.climate',
      desc: 'Устройство, которое сообщает о температуре и влажности в помещении.',
      example: 'Датчик климата.',
      phrases: ['Алиса, что с температурой на кухне?',
                'Алиса, какая влажность в детской?']
    },
    {
      name: 'devices.types.sensor.gas',
      desc: 'Устройство, которое сообщает о наличии газа в помещении.',
      example: 'Датчик газа.',
      phrases: ['Алиса, что с уровнем углекислого газа в спальне?',
                'Алиса, что с датчиком газа?']
    },
    {
      name: 'devices.types.sensor.illumination',
      desc: 'Устройство, которое сообщает об уровне освещенности.',
      example: 'Датчик освещенности.',
      phrases: ['Алиса, какой уровень освещенности в спальне?',
                'Алиса, что с датчиком освещенности?']
    },
    {
      name: 'devices.types.sensor.motion',
      desc: 'Устройство, которое сообщает о наличии движения.',
      example: 'Датчик движения.',
      phrases: ['Алиса, когда в прихожей было движение?',
                'Алиса, что с датчиком движения в гостиной?']
    },
    {
      name: 'devices.types.sensor.open',
      desc: 'Устройство, которое сообщает об открытии/закрытии двери.',
      example: 'Датчик открытия двери.',
      phrases: ['Алиса, когда была открыта дверь на кухне?',
                'Алиса, что с датчиком открытия двери?']
    },
    {
      name: 'devices.types.sensor.smoke',
      desc: 'Устройство, которое сообщает о наличии дыма в помещении.',
      example: 'Датчик дыма.',
      phrases: ['Алиса, есть ли дым на кухне?',
                'Алиса, что с датчиком дыма?']
    },
    {
      name: 'devices.types.sensor.vibration',
      desc: 'Устройство, которое сообщает о физическом воздействии: вибрация, падение, переворачивание.',
      example: 'Датчик вибрации.',
      phrases: ['Алиса, установи высокую чувствительность вибрации у датчика вибрации.',
                'Алиса, когда была вибрация в гостиной?']
    },
    {
      name: 'devices.types.sensor.water_leak',
      desc: 'Устройство, которое сообщает о протечке воды.',
      example: 'Датчик протечки воды.',
      phrases: ['Алиса, что с датчиком протечки воды?',
                'Алиса, когда была протечка воды в ванной?']
    },
    {
      name: 'devices.types.smart_meter',
      desc: 'Устройство, которое измеряет расход чего-либо (универсальный тип для счетчиков).',
      example: 'Счетчик.',
      phrases: ['Алиса, что со счетчиком?',
                'Алиса, какие текущие показания счетчика?']
    },
    {
      name: 'devices.types.smart_meter.cold_water',
      desc: 'Устройство, которое измеряет расход холодной воды.',
      example: 'Счетчик холодной воды.',
      phrases: ['Алиса, что со счетчиком холодной воды?',
                'Алиса, какой расход воды в декабре?',
                'Алиса, какие текущие показания воды?']
    },
    {
      name: 'devices.types.smart_meter.electricity',
      desc: 'Устройство, которое измеряет расход электроэнергии.',
      example: 'Счетчик электроэнергии.',
      phrases: ['Алиса, что со счетчиком электроэнергии?',
                'Алиса, какой расход электричества в декабре?',
                'Алиса, какие текущие показания электричества?']
    },
    {
      name: 'devices.types.smart_meter.gas',
      desc: 'Устройство, которое измеряет расход газа.',
      example: 'Счетчик газа.',
      phrases: ['Алиса, что со счетчиком газа?',
                'Алиса, какой расход газа в декабре?',
                'Алиса, какие текущие показания газа?']
    },
    {
      name: 'devices.types.smart_meter.heat',
      desc: 'Устройство, которое измеряет расход тепла.',
      example: 'Счетчик тепла.',
      phrases: ['Алиса, что со счетчиком тепла?',
                'Алиса, какой расход тепла в декабре?',
                'Алиса, какие текущие показания тепла?']
    },
    {
      name: 'devices.types.smart_meter.hot_water',
      desc: 'Устройство, которое измеряет расход горячей воды.',
      example: 'Счетчик горячей воды.',
      phrases: ['Алиса, что со счетчиком горячей воды?',
                'Алиса, какой расход воды в декабре?',
                'Алиса, какие текущие показания воды?']
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
      phrases: ['Алиса, включи переключатель.',
                'Алиса, включи выключатель.']
    },
    {
      name: 'devices.types.thermostat',
      desc: 'Устройство с возможностью регулирования температуры.',
      example: 'Водонагреватель, теплый пол, обогреватель, электровентилятор. Для кондиционера рекомендуется использовать отдельный тип  devices.types.thermostat.ac .',
      phrases: ['Алиса, сделай теплее.',
                'Алиса, сделай холоднее.',
                'Алиса, теплее на четыре градуса.',
                'Алиса, выставь температуру на максимум.']
    },
    {
      name: 'devices.types.thermostat.ac',
      desc: 'Устройство, управляющее микроклиматом в помещении, с возможностью регулирования температуры и режима работы.',
      example: 'Кондиционер.',
      phrases: ['Алиса, включи кондиционер.',
                'Алиса, выключи кондей.',
                'Алиса, сделай теплее.',
                'Алиса, сделай холоднее.',
                'Алиса, теплее на четыре градуса.',
                'Алиса, выставь температуру на минимум.']
    },
    {
      name: 'devices.types.vacuum_cleaner',
      desc: 'Устройство, которое выполняет функцию пылесоса.',
      example: 'Робот-пылесос.',
      phrases: ['Алиса, включи пылесос.',
                'Алиса, включи робот-пылесос.',
                'Алиса, пропылесось.',
                'Алиса, уберись.',
                'Алиса, верни пылесос на зарядку.',
                'Алиса, верни пылесос на базу.']
    },
    {
      name: 'devices.types.washing_machine',
      desc: 'Устройство для стирки белья.',
      example: 'Стиральная машина.',
      phrases: ['Алиса, включи стиральную машину.',
                'Алиса, запусти стиралку.']
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
            title: 'Единицы измерения значений функции. Должно подходить для выбранной выше функции.',
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
  },

  properties: {
    'float': {
      desc: `Отображение значений свойств устройства в числовом формате.`,
      parameters: {
        hidden: {},
        visible: {
          'instance': {
            title: 'Название функции для свойства',
            type: 'droplist',
            data: [
              {id: 'amperage', title: 'Отображение текущего потребления тока.'},
              {id: 'battery_level', title: 'Отображение уровня заряда аккумулятора.'},
              {id: 'co2_level', title: 'Отображение показаний уровня углекислого газа.'},
              {id: 'electricity_meter', title: 'Отображение текущих показаний счетчика электроэнергии.'},
              {id: 'food_level', title: 'Отображение показаний уровня корма.'},
              {id: 'gas_meter', title: 'Отображение текущих показаний счетчика газа.'},
              {id: 'heat_meter', title: 'Отображение текущих показаний счетчика тепла.'},
              {id: 'humidity', title: 'Отображение показаний влажности.'},
              {id: 'illumination', title: 'Отображение уровня освещенности.'},
              {id: 'pm1_density', title: 'Отображение уровня загрязнения воздуха частицами PM1.'},
              {id: 'pm2.5_density', title: 'Отображение уровня загрязнения воздуха частицами PM2.5.'},
              {id: 'pm10_density', title: 'Отображение уровня загрязнения воздуха частицами PM10.'},
              {id: 'power', title: 'Отображение текущей потребляемой мощности.'},
              {id: 'pressure', title: 'Отображение давления.'},
              {id: 'temperature', title: 'Отображение показаний температуры.'},
              {id: 'tvoc', title: 'Отображение уровня загрязнения воздуха органическими веществами.'},
              {id: 'voltage', title: 'Отображение текущего напряжения.'},
              {id: 'water_level', title: 'Отображение показаний уровня воды.'},
              {id: 'water_meter', title: 'Отображение текущих показаний счетчика воды.'}
            ]
          },
          'unit_amperage': {
            visible_for: {'instance': 'amperage'},
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.ampere', title: 'Амперы'},
            ]
          },
          'unit_battery_level': {
            visible_for: {'instance': 'battery_level'},
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.percent', title: 'Проценты'},
            ]
          },
          'unit_co2_level': {
            visible_for: {'instance': 'co2_level'},
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.ppm', title: 'ppm — parts per million'},
            ]
          },
          'unit_electricity_meter': {
            visible_for: {'instance': 'electricity_meter'},
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.kilowatt_hour', title: 'киловатт-часы'},
            ]
          },
          'unit_food_level': {
            visible_for: {'instance': 'food_level'},
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.percent', title: 'Проценты'},
            ]
          },
          'unit_gas_meter': {
            visible_for: {'instance': 'gas_meter'},
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.gas_meter', title: 'Кубические метры'},
            ]
          },
          'unit_heat_meter': {
            visible_for: {'instance': 'heat_meter'},
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.gigacalorie', title: 'Гигакалории'},
            ]
          },
          'unit_humidity': {
            visible_for: {'instance': 'humidity'},
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.percent', title: 'Проценты'},
            ]
          },
          'unit_illumination': {
            visible_for: {'instance': 'illumination'},
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.illumination.lux', title: 'Люксы'},
            ]
          },
          'unit_pm1_density': {
            visible_for: {'instance': 'pm1_density'},
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.density.mcg_m3', title: 'мкг/м3'},
            ]
          },
          'unit_pm2.5_density': {
            visible_for: {'instance': 'pm2.5_density'},
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.density.mcg_m3', title: 'мкг/м3'},
            ]
          },
          'unit_pm10_density': {
            visible_for: {'instance': 'pm10_density'},
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.density.mcg_m3', title: 'мкг/м3'},
            ]
          },
          'unit_power': {
            visible_for: {'instance': 'power'},
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.watt', title: 'ватты'},
            ]
          },
          'unit_pressure': {
            visible_for: {'instance': 'pressure'},
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.pressure.atm', title: 'атмосферы'},
              {id: 'unit.pressure.pascal', title: 'паскали'},
              {id: 'unit.pressure.bar', title: 'бары'},
              {id: 'unit.pressure.mmhg', title: 'миллиметры ртутного столба'}
            ]
          },
          'unit_temperature': {
            visible_for: {'instance': 'temperature'},
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.temperature.celsius', title: 'градусы по цельсию'},
              {id: 'unit.temperature.kelvin', title: 'кельвины'},
            ]
          },
          'unit_tvoc': {
            visible_for: {'instance': 'tvoc'},
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.density.mcg_m3', title: 'мкг/м3'},
            ]
          },
          'unit_voltage': {
            visible_for: {'instance': 'voltage'},
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.volt', title: 'вольты'},
            ]
          },
          'unit_water_level': {
            visible_for: {'instance': 'water_level'},
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.percent', title: 'проценты'},
            ]
          },
          'unit_water_meter': {
            visible_for: {'instance': 'water_meter'},
            title: 'Единицы измерения значений функции',
            type: 'droplist',
            data: [
              {id: 'unit.cubic_meter', title: 'кубические метры'},
            ]
          },
          // спец параметр - задает функцию вычисления для отправки данных
          'calc': {
            title: 'Выражение для вычисления для отправки данных. Можно использовать все свойства устройства.',
            type: 'input',
            default: 'value'
          }
        }
      }
    },
    'event': {
      desc: `Отображение показаний свойств устройства (свойства могут иметь одно из заданных состояний).`,
      parameters: {
        hidden: {},
        visible: {
          'instance': {
            title: 'Название функции для свойства',
            type: 'droplist',
            data: [
              {id: 'vibration', title: 'Отображение событий физического воздействия: вибрация, падение, переворачивание.'},
              {id: 'open', title: 'Отображение событий открытия/закрытия дверей, окон и т.п.'},
              {id: 'button', title: 'Отображение событий нажатия кнопки.'},
              {id: 'motion', title: 'Отображение событий, связанных с наличием движения в области действия датчика.'},
              {id: 'smoke', title: 'Отображение событий наличия дыма в помещении.'},
              {id: 'gas', title: 'Отображение событий наличия газа в помещении.'},
              {id: 'battery_level', title: 'Отображение событий заряда батареи.'},
              {id: 'food_level', title: 'Отображение событий, связанных с уровнем корма.'},
              {id: 'water_level', title: 'Отображение событий, связанных с уровнем воды.'},
              {id: 'water_leak', title: 'Отображение событий протечки воды.'}
            ]
          },
          'event_vibration': {
            visible_for: {'instance': 'vibration'},
            title: 'Событие',
            type: 'droplist',
            data: [
              {id: 'tilt', title: 'переворачивание'},
              {id: 'fall', title: 'падение'},
              {id: 'vibration', title: 'вибрация'},
            ]
          },
          'event_open': {
            visible_for: {'instance': 'open'},
            title: 'Событие',
            type: 'droplist',
            data: [
              {id: 'opened', title: 'открыто'},
              {id: 'closed', title: 'закрыто'},
            ]
          },
          'event_button': {
            visible_for: {'instance': 'button'},
            title: 'Событие',
            type: 'droplist',
            data: [
              {id: 'click', title: 'одиночное нажатие'},
              {id: 'double_click', title: 'двойное нажатие'},
              {id: 'long_press', title: 'долгое нажатие'},
            ]
          },
          'event_motion': {
            visible_for: {'instance': 'motion'},
            title: 'Событие',
            type: 'droplist',
            data: [
              {id: 'detected', title: 'обнаружено'},
              {id: 'not_detected', title: 'не обнаружено'},
            ]
          },
          'event_smoke': {
            visible_for: {'instance': 'smoke'},
            title: 'Событие',
            type: 'droplist',
            data: [
              {id: 'detected', title: 'обнаружено'},
              {id: 'not_detected', title: 'не обнаружено'},
              {id: 'high', title: 'высокий уровень'},
            ]
          },
          'event_gas': {
            visible_for: {'instance': 'gas'},
            title: 'Событие',
            type: 'droplist',
            data: [
              {id: 'detected', title: 'обнаружено'},
              {id: 'not_detected', title: 'не обнаружено'},
              {id: 'high', title: 'высокий уровень'},
            ]
          },
          'event_battery_level': {
            visible_for: {'instance': 'battery_level'},
            title: 'Событие',
            type: 'droplist',
            data: [
              {id: 'low', title: 'низкий'},
              {id: 'normal', title: 'нормальный'},
            ]
          },
          'event_food_level': {
            visible_for: {'instance': 'food_level'},
            title: 'Событие',
            type: 'droplist',
            data: [
              {id: 'empty', title: 'пустой'},
              {id: 'low', title: 'низкий'},
              {id: 'normal', title: 'нормальный'},
            ]
          },
          'event_water_level': {
            visible_for: {'instance': 'water_level'},
            title: 'Событие',
            type: 'droplist',
            data: [
              {id: 'empty', title: 'пустой'},
              {id: 'low', title: 'низкий'},
              {id: 'normal', title: 'нормальный'},
            ]
          },
          'event_water_leak': {
            visible_for: {'instance': 'water_leak'},
            title: 'Событие',
            type: 'droplist',
            data: [
              {id: 'dry', title: 'нет протечки'},
              {id: 'leak', title: 'протечка.'},
            ]
          },
          // спец параметр - задает поле для вычисления условия срабатывания события
          'calc': {
            title: 'Выражение для вычисления, событие срабатывает при истинном значении выражения. Можно использовать все свойства устройства.',
            type: 'input',
            default: 'state == 1'
          }
        }
      }
    }
  }
};
