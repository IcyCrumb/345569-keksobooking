'use strict';

window.initializePins = (function () {

  var ENTER_KEY_CODE = 13;
  var pinMap = document.querySelector('.tokyo__pin-map');

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

  function commonHandler(target, keyDown) {
    while (target !== document.body) {
      if (target.classList.contains('pin')) {
        if (target.classList.contains('pin--active')) {
          break;
        }

        if (keyDown) {
          var currentActiveElement = document.activeElement;
          window.showCard.show(function () {
            currentActiveElement.focus();
          });
        } else {
          window.showCard.show();
        }

        activeElementHandler(target);
        return;
      }
      target = target.parentNode;
    }
  }

  // функция вызывает showDialog() и activeElementHandler()
  // при клике на любой из потомков элемента pinMap
  function clickHandler(evt) {
    var target = evt.target;
    commonHandler(target, false);
  }

  // функция вызывает showDialog() и activeElementHandler()
  // при нажатии enter-ом на любой из потомков элемента pinMap
  function keydownHandler(evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      var target = evt.target;
      commonHandler(target, true);
    }
  }

  // вызываем  clickHandler() при клике и keydownHandler() при нажатии на pinMap
  pinMap.addEventListener('click', clickHandler);
  pinMap.addEventListener('keydown', keydownHandler);

  window.showCard.show();
})();
