exports.Task = extend(TolokaHandlebarsTask, function (options) {
  TolokaHandlebarsTask.call(this, options);
}, {
  onRender: function() {
    var DOM = this.getDOMElement();
    var currentList = DOM.querySelectorAll("div.list")[0];
    currentList.style.backgroundColor = "#E6E6FA";
    currentList.focus();

    $(DOM).find("div.list").click(function() {
      var everyList = DOM.querySelectorAll("div.list");
      for (var i = 0; i < everyList.length; i++) {
        everyList[i].style.backgroundColor = "#FFFFFF";
      }

      this.style.backgroundColor = "#E6E6FA";
      this.focus();
    });
  },
  onDestroy: function() {
    // Задание завершено, можно освобождать (если были использованы) глобальные ресурсы
  }
});

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
