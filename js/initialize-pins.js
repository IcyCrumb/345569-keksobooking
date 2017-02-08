'use strict';

var ENTER_KEY_CODE = 13;

var pinMap = document.querySelector('.tokyo__pin-map');
var buttonCross = document.querySelector('.dialog__close');
var dialogWindow = document.querySelector('.dialog');

function initializePins() {

  // функция делает элемент с классом .dialog видимым
  var showDialog = function () {
    dialogWindow.style.visibility = 'visible';
  };

  // функция дективирует предыдущий элемент и делает активным текущий
  var activeElementHandler = function (elem) {
    elem.setAttribute('aria-pressed', 'true');
    var activeElement = document.querySelector('div.pin.pin--active');

    if (activeElement) {
      activeElement.classList.remove('pin--active');
      elem.setAttribute('aria-pressed', 'false');
    }

    elem.classList.add('pin--active');
  };

  // функция вызывает showDialog() и activeElementHandler()
  // при клике на любой из потомков элемента pinMap
  var clickHandler = function (evt) {
    var target = evt.target;

    while (target !== document.body) {
      if (target.classList.contains('pin')) {
        if (target.classList.contains('pin--active')) {
          break;
        }
        showDialog();
        activeElementHandler(target);
        return;
      }
      target = target.parentNode;
    }
  };

  // функция вызывает showDialog() и activeElementHandler()
  // при нажатии enter-ом на любой из потомков элемента pinMap
  var keydownHandler = function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      evt.target.click();
    }
  };

  // вызываем  clickHandler() при клике и keydownHandler() при нажатии на pinMap
  pinMap.addEventListener('click', clickHandler);
  pinMap.addEventListener('keydown', keydownHandler);


  // при щелчке мышью на крестик срабатывает функция hideDialog()
  buttonCross.addEventListener('click', function () {
    buttonCross.setAttribute('aria-pressed', 'true');
    hideDialog();
  });

  // функция закрывает элемент .dialog и деактивирует элемент .pin
  var hideDialog = function () {
    dialogWindow.style.visibility = 'hidden';
    activeElement = document.querySelector('div.pin.pin--active');
    if (activeElement) {
      activeElement.classList.remove('pin--active');
    }
  };

window.initializePins = initializePins;
}
