exports.Task = extend(TolokaHandlebarsTask, function (options) {
  TolokaHandlebarsTask.call(this, options);
}, {
  setSolution: function(solution) {
      var secondScale = this.getDOMElement().querySelector('.second-scale');
      var topics = ['спорт', 'политика', 'культура',
      'наука_и_техника', 'силовые_структуры', 'бизнес',
      'проишествия', 'экономика_и_финансы', 'общество'];

      var DOM = this.getDOMElement();
      //var solution = this.getSolution();
      //DOM.addEventListener("keydown", function(event){ console.log(event.key); });

      //$(DOM).find("div.rdlist").click(function() {
      //DOM.querySelector('.rdlist');
      var chosenTopic = solution.output_values.chosen_lvl1;

      if (chosenTopic) {
        var listNumber = topics.indexOf(chosenTopic);
        showList(DOM, topics, listNumber);
      }
      //});
      TolokaHandlebarsTask.prototype.setSolution.call(this, solution);
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
