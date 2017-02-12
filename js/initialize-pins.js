'use strict';

window.initializePins = (function () {

  var ENTER_KEY_CODE = 13;

  var pinMap = document.querySelector('.tokyo__pin-map');
  var buttonCross = document.querySelector('.dialog__close');
  var dialogWindow = document.querySelector('.dialog');

  // функция делает элемент с классом .dialog видимым
  function showDialog() {
    dialogWindow.style.visibility = 'visible';
  }

  // функция дективирует предыдущий элемент и делает активным текущий
  function activeElementHandler(elem) {
    elem.setAttribute('aria-pressed', 'true');
    var activeElement = document.querySelector('div.pin.pin--active');

    if (activeElement) {
      activeElement.classList.remove('pin--active');
      elem.setAttribute('aria-pressed', 'false');
    }

    elem.classList.add('pin--active');
  }

  // функция вызывает showDialog() и activeElementHandler()
  // при клике на любой из потомков элемента pinMap
  function clickHandler(evt) {
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
  }

  // функция вызывает showDialog() и activeElementHandler()
  // при нажатии enter-ом на любой из потомков элемента pinMap
  function keydownHandler(evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      evt.target.click();
    }
  }

  // вызываем  clickHandler() при клике и keydownHandler() при нажатии на pinMap
  pinMap.addEventListener('click', clickHandler);
  pinMap.addEventListener('keydown', keydownHandler);


  // обработчик клика на крестик
  function crossClickHandler() {
    buttonCross.setAttribute('aria-pressed', 'true');
    hideDialog();
  }

  // функция закрывает элемент .dialog и деактивирует элемент .pin
  function hideDialog() {
    dialogWindow.style.visibility = 'hidden';
    var activeElement = document.querySelector('div.pin.pin--active');
    if (activeElement) {
      activeElement.classList.remove('pin--active');
    }
    buttonCross.removeEventListener('click', crossClickHandler);
  }

  // вызываем crossClickHandler() при нажатии на крестик
  buttonCross.addEventListener('click', crossClickHandler);
  buttonCross.addEventListener('keydown', crossClickHandler);
});
