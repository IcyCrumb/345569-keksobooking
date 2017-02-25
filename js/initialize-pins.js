'use strict';

window.initializePins = (function () {

  var ENTER_KEY_CODE = 13;
  var pinMap = document.querySelector('.tokyo__pin-map');

  var housingType = document.querySelector('#housing_type');
  var housingPrice = document.querySelector('#housing_price');
  var housingRoomNumber = document.querySelector('#housing_room-number');
  var housingGuestsNumber = document.querySelector('#housing_guests-number');
  var housingFeatures = document.querySelector('#housing_features');

  var housingFeaturesArray = housingFeatures.getElementsByTagName('input');


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

    var housingPrice = document.querySelector('#housing_price');

    var changeHandler = function () {

      var housingTypeValue = housingType.options[housingType.selectedIndex].value;
      var housingPriceValue = housingPrice.options[housingPrice.selectedIndex].value;
      var housingRoomNumberValue = housingRoomNumber.options[housingRoomNumber.selectedIndex].value;
      var housingGuestsNumberValue = housingGuestsNumber.options[housingGuestsNumber.selectedIndex].value;

      for (var i = 0; i < similarApartments.length; i++) {
        var isFine = true;
        if ((similarApartments[i].offer.type !==  housingTypeValue) && (housingTypeValue !== 'any')) {
          isFine = false;
        }

        if ((similarApartments[i].offer.price < 10000) && (housingPriceValue !== 'low')) {
          isFine = false;
        }

        if ((similarApartments[i].offer.price >= 10000) && (similarApartments[i].offer.price < 50000) && (housingPriceValue !== 'middle')) {
          isFine = false;
        }

        if ((similarApartments[i].offer.price > 50000) && (housingPriceValue !== 'hight')) {
          isFine = false;
        }


        if ((String(similarApartments[i].offer.rooms) !==  housingRoomNumberValue) && (housingRoomNumberValue !== 'any')) {
          isFine = false;
        }

        if ((String(similarApartments[i].offer.guests) !==  housingGuestsNumberValue) && (housingGuestsNumberValue !== 'any')) {
          isFine = false;
        }

       for (var k = 0; k < housingFeaturesArray.length; k++) {
         if (housingFeaturesArray[k].checked) {
           if (similarApartments[i].offer.features.indexOf(housingFeaturesArray[k].value) === -1) {
             isFine = false;
           }
         }
       } 

        if (isFine) {
          pinMap.children[i+1].style.visibility = 'visible';
        } else {
          pinMap.children[i+1].style.visibility = 'hidden';
        }
      }
    };

      housingType.addEventListener('change', changeHandler);
      housingPrice.addEventListener('change', changeHandler);
      housingRoomNumber.addEventListener('change', changeHandler);
      housingGuestsNumber.addEventListener('change', changeHandler);

      for (let l = 0; l < housingFeaturesArray.length; l++) {
        housingFeaturesArray[l].addEventListener('click', changeHandler);
      }
  };


    // Вызываем window.load
  window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', callback);
})();
