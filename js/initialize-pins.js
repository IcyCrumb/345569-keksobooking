'use strict';

window.initializePins = (function () {

  var ENTER_KEY_CODE = 13;
  var pinMap = document.querySelector('.tokyo__pin-map');
  var activeElement = document.querySelector('div.pin.pin--active');
  var activeClass = 'pin--active';

  var housingType = document.querySelector('#housing_type');
  var housingPrice = document.querySelector('#housing_price');
  var housingRoomNumber = document.querySelector('#housing_room-number');
  var housingGuestsNumber = document.querySelector('#housing_guests-number');
  var housingFeatures = document.querySelector('#housing_features');

  var housingFeaturesArray = housingFeatures.getElementsByTagName('input');

  // функция дективирует предыдущий элемент и делает активным текущий
  function activeElementHandler(elem) {
    elem.setAttribute('aria-pressed', 'true');

    if (activeElement) {
      activeElement.classList.remove(activeClass);
      activeElement = null;
      elem.setAttribute('aria-pressed', 'false');
    }

    activeElement = elem;
    elem.classList.add(activeClass);
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
        if (target.classList.contains(activeClass)) {
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

    // Клонируем элемент из <template>
    var templateElement = document.querySelector('#pin-template');
    var elementToClone = templateElement.content.querySelector('.pin');

    similarApartments.forEach(function (apartamentItemData) {
      var clonedElement = elementToClone.cloneNode(true);
      clonedElement.style.position = 'absolute';
      clonedElement.style.top = apartamentItemData.location.y + 'px';
      clonedElement.style.left = apartamentItemData.location.x + 'px';
      clonedElement.children[0].src = apartamentItemData.author.avatar;
      newElements.push(clonedElement);
    });
     // загрузка аватарки
    newElements.forEach(function (element) {
      tokios[0].appendChild(element);
    });

    similarApartments.forEach(function (apartamentItem, itemIndex) {
      newElements[itemIndex].addEventListener('click', function () {
        window.showCard.fill(similarApartments[itemIndex]);
      });
      newElements[itemIndex].addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEY_CODE) {
          window.showCard.fill(similarApartments[itemIndex]);
        }
      });
    });

    var i;
    function changeHandler() {

      var housingTypeValue = housingType.options[housingType.selectedIndex].value;
      var housingPriceValue = housingPrice.options[housingPrice.selectedIndex].value;
      var housingRoomNumberValue = housingRoomNumber.options[housingRoomNumber.selectedIndex].value;
      var housingGuestsNumberValue = housingGuestsNumber.options[housingGuestsNumber.selectedIndex].value;

      for (i = 0; i < similarApartments.length; i++) {
        var isFine = true;

        var type = similarApartments[i].offer.type;
        var price = similarApartments[i].offer.price;
        var rooms = similarApartments[i].offer.rooms;
        var guests = similarApartments[i].offer.guests;
        var features = similarApartments[i].offer.features;

        if ((type !== housingTypeValue) && (housingTypeValue !== 'any')) {
          isFine = false;
        }

        if ((price < 10000) && (housingPriceValue !== 'low')) {
          isFine = false;
        }

        if ((price >= 10000) && (price < 50000) && (housingPriceValue !== 'middle')) {
          isFine = false;
        }

        if ((price > 50000) && (housingPriceValue !== 'hight')) {
          isFine = false;
        }


        if ((String(rooms) !== housingRoomNumberValue) && (housingRoomNumberValue !== 'any')) {
          isFine = false;
        }

        if ((String(guests) !== housingGuestsNumberValue) && (housingGuestsNumberValue !== 'any')) {
          isFine = false;
        }

        for (var j = 0; j < housingFeaturesArray.length; j++) {
          if (housingFeaturesArray[j].checked) {
            if (features.indexOf(housingFeaturesArray[j].value) === -1) {
              isFine = false;
            }
          }
        }

        if (isFine) {
          pinMap.children[i + 1].style.visibility = 'visible';
        } else {
          pinMap.children[i + 1].style.visibility = 'hidden';
        }
      }
      window.showCard.hide();
    }

    housingType.addEventListener('change', changeHandler);
    housingPrice.addEventListener('change', changeHandler);
    housingRoomNumber.addEventListener('change', changeHandler);
    housingGuestsNumber.addEventListener('change', changeHandler);

    Array.prototype.forEach.call(housingFeaturesArray, function (featureItem) {
      featureItem.addEventListener('click', changeHandler);
    });


    var pins = document.querySelectorAll('.pin');
    for (i = 3; i < similarApartments.length; i++) {
      pins[i].style.visibility = 'hidden';
    }
  };


    // Вызываем window.load
  window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', callback);

})();
