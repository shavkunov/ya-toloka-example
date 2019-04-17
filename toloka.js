exports.Task = extend(TolokaHandlebarsTask, function (options) {
  TolokaHandlebarsTask.call(this, options);
}, {
  onRender: function() {
    var DOM = this.getDOMElement();
    var solution = this.getSolution();
    var task = this.getTask();
    $(DOM).find("div.topics").click(function() {
      showSublist(DOM, solution.output_values.chosen_lvl1);
    });

    solution.output_values.news = task.input_values.news;
    solution.output_values.news_id = task.input_values.news_id;
    solution.output_values.pred_lvl1 = task.input_values.pred_lvl1;
    solution.output_values.pred_lvl2 = task.input_values.pred_lvl2;
    solution.output_values.url = task.input_values.url;
    solution.output_values.probability = task.input_values.probability;

    if (solution.output_values.chosen_lvl1) {
      TolokaHandlebarsTask.prototype.setSolution.call(this, solution);
    }
  },
  onDestroy: function() {
    // Задание завершено, можно освобождать (если были использованы) глобальные ресурсы
  }
});

function showSublist(DOM, first_item) {
  var topics = ['спорт', 'политика', 'культура', 'наука_и_техника', 'силовые_структуры', 'бизнес', 'проишествия', 'экономика_и_финансы', 'общество'];
  var className = 0;
  for(var i = 0; i < topics.length; i++) {
    if (topics[i] == first_item) {
      className = ".key" + i;
    }

    var selectedList = DOM.querySelector(".key" + i);
    selectedList.style.display = 'none';            
  }

  var selectedList1 = DOM.querySelector(className);
  selectedList1.style.display = 'block';
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