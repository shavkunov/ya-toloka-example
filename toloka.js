exports.Task = extend(TolokaHandlebarsTask, function (options) {
  TolokaHandlebarsTask.call(this, options);
}, {
  validate: function(solution) {
    var MIN_CATEGORIES = 1, MAX_CATEGORIES = 3;
    var categoriesCount = solution.output_values.chosen_topics.length;

    if (categoriesCount && categoriesCount >= MIN_CATEGORIES && categoriesCount <= MAX_CATEGORIES) {
      return TolokaHandlebarsTask.prototype.validate.apply(this, arguments);
    } else {
      return {
        task_id: this.getTask().id,
        errors: {
          '__TASK__': {
            message: (categoriesCount < MIN_CATEGORIES)
              ? 'Отмечено слишком мало категорий'
              : 'Отмечено слишком много категорий'
          }
        }
      };
    }
  },
  setSolution: function(solution) {
    var allTopics = {'спорт': ['футбол', 'спортивные мероприятия', 'хоккей', 'единоборства', 'автоспорт'], 'политика': ['переговоры, встречи', 'региональная политика', 'вооруженные конфликты', 'внешняя политика', 'законодательство', 'оппозиция', 'выборы', 'партии, государственная дума', 'украинский кризис', 'санкции'], 'культура': ['знаменитости', 'музыка', 'кино', 'театр', 'фестивали, выставки, мероприятия', 'военная история', 'живопись', 'СМИ', 'праздники'], 'наука_и_техника': ['игры', 'астрономия, космос', 'военная техника', 'другое', 'интернет', 'гаджеты', 'автопром', 'IT', 'школа, университеты'], 'силовые_структуры': ['вооружение', 'МВД', 'министерсто обороны', 'спецслужба'], 'бизнес': ['бизнес и государство', 'долги, банкротство, обманутые дольщики'], 'проишествия': ['убийства, изнасилования', 'криминал', 'катастрофы', 'драки', 'терракты', 'расследования', 'стихийные бедствия', 'кража'], 'экономика_и_финансы': ['банки', 'мировая экономика', 'энергетика, нефть', 'промышленность', 'пенсии', 'торговля, импорт, экспорт', 'грузовые перевозки', 'экономические мероприятия', 'налоги, льготы, страховые взносы'], 'общество': ['религия', 'быт', 'пенсии', 'суд', 'здравоохранение', 'дороги', 'благоустройство территории', 'ЖКХ', 'строительство', 'корупция', 'экология', 'социальные сети']};
    var topics = ['спорт', 'политика', 'культура',
    'наука_и_техника', 'силовые_структуры', 'бизнес',
    'проишествия', 'экономика_и_финансы', 'общество'];
    var DOM = this.getDOMElement();
    var task = this.getTask();
    var chosenTopic = solution.output_values.chosen_lvl1;
    if (chosenTopic) {
      var listNumber = topics.indexOf(chosenTopic);
      showList(DOM, topics, listNumber);
    }

    var selectedCategories = [];
    for (var mainIndex = 0; mainIndex < 9; mainIndex++) {
      var isSubtopicSelected = false;

      for (var subIndex = 0; subIndex < 15; subIndex++) {
        var ourMagicField = mainIndex + "#" + subIndex;
        if (solution.output_values[ourMagicField] && chosenTopic) {
          isSubtopicSelected = true;
          selectedCategories.push(chosenTopic + "/" + allTopics[chosenTopic][subIndex]); // with main topic
        }
      }

      if (isSubtopicSelected) {
        DOM.querySelector(".rd" + mainIndex).style.background = "#E6E6FA";
      } else {
        DOM.querySelector(".rd" + mainIndex).style.background = "#FFFFFF";
      }
    }

    solution.output_values.news = task.input_values.news;
    solution.output_values.news_id = task.input_values.news_id;
    solution.output_values.pred_lvl1 = task.input_values.pred_lvl1;
    solution.output_values.pred_lvl2 = task.input_values.pred_lvl2;
    solution.output_values.url = task.input_values.url;
    solution.output_values.probability = task.input_values.probability;
    solution.output_values.chosen_topics = selectedCategories;
  },
  onRender: function() {

  },
  onDestroy: function() {
    // Задание завершено, можно освобождать (если были использованы) глобальные ресурсы
  }
});

function showList(DOM, topics, number) {
  clean(DOM, topics);
  var list = DOM.querySelector(".list" + number);
  list.style.display = 'block';
}

function clean(DOM, topics) {
  for(var i = 0; i < topics.length; i++) {
    DOM.querySelector(".list" + i).style.display = 'none';
  }
}

function extend(ParentClass, constructorFunction, prototypeHash) {
  constructorFunction = constructorFunction || function () {};
  prototypeHash = prototypeHash || {};
  if (ParentClass) {
    constructorFunction.prototype = Object.create(ParentClass.prototype);
  }
  for (var i in prototypeHash) {
    constructorFunction.prototype[i] = prototypeHash[i];
  }
  return constructorFunction;
}
