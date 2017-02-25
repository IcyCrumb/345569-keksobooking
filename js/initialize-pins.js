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
    var dialogWindow = document.querySelector('.dialog');
    dialogWindow.style.visibility = 'visible';
    var pinMain = document.querySelector('.pin__main');
    while (target !== document.body) {
      if (target === pinMain) {
        dialogWindow.style.visibility = 'hidden';
      }
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

  var tokios = document.querySelectorAll('.tokyo__pin-map');

  // Массив пинов
  var newElements = [];

  var callback = function (similarApartments) {
    // Создаём <template> в index.html
    //document.getElementsByClassName('tokyo')[0].insertAdjacentHTML('afterbegin', '<template id="pin-template"><div class="pin"><img src="" alt="" tabindex="1" class="rounded" width="40" height="40"></div></template>');



    for (var j = 0; j < similarApartments.length; j++) {
      // Клонируем элемент из <template>
      var templateElement = document.querySelector('#pin-template');
      var elementToClone = templateElement.content.querySelector('.pin');
      // Добавляем его в массив
      newElements.push(elementToClone.cloneNode(true));

      // Координаты для новых пинов
      newElements[j].style.position = 'absolute';
      var x = similarApartments[j].location.x;
      var y = similarApartments[j].location.y;
      newElements[j].style.top = y + 'px';
      newElements[j].style.left = x + 'px';

      // Загрузка аватарки
      newElements[j].children[0].src = similarApartments[j].author.avatar;
      tokios[0].appendChild(newElements[j]);
    }

    for (let i = 0; i < similarApartments.length; i++) {
      newElements[i].addEventListener('click', function () {
       window.showCard.fill(similarApartments[i]);
      });
      newElements[i].addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEY_CODE) {
         window.showCard.fill(similarApartments[i]);
        }
      });
    }
  };


    // Вызываем window.load
  window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', callback);
})();
