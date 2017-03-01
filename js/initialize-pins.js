'use strict';

window.initializePins = (function () {

  var ENTER_KEY_CODE = 13;
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinMain = document.querySelector('.pin__main');
  var dialogWindow = document.querySelector('.dialog');

  var activeElement = document.querySelector('div.pin.pin--active');
  var activeClass = 'pin--active';

  // Клонируем элемент из <template>
  var templateElement = document.querySelector('#pin-template');

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
    dialogWindow.style.visibility = 'visible';

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

  // Массив пинов
  var newElements = [];

  var callback = function (similarApartments) {
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
      pinMap.appendChild(element);
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

    function changeHandler() {

      var housingTypeValue = housingType.options[housingType.selectedIndex].value;
      var housingPriceValue = housingPrice.options[housingPrice.selectedIndex].value;
      var housingRoomNumberValue = housingRoomNumber.options[housingRoomNumber.selectedIndex].value;
      var housingGuestsNumberValue = housingGuestsNumber.options[housingGuestsNumber.selectedIndex].value;

      similarApartments.forEach(function (apartamentItemData, apartamentItem) {

        var type = apartamentItemData.offer.type;
        var price = apartamentItemData.offer.price;
        var rooms = apartamentItemData.offer.rooms;
        var guests = apartamentItemData.offer.guests;
        var features = apartamentItemData.offer.features;

        var isFine = (type !== housingTypeValue) && (housingTypeValue !== 'any') ||
        (price < LOW_PRICE) && (housingPriceValue !== 'low') ||
        (price >= LOW_PRICE) && (price <= HIGH_PRICE) && (housingPriceValue !== 'middle') ||
        (price > HIGH_PRICE) && (housingPriceValue !== 'hight') ||
        (String(rooms) !== housingRoomNumberValue) && (housingRoomNumberValue !== 'any') ||
        (String(guests) !== housingGuestsNumberValue) && (housingGuestsNumberValue !== 'any') ? false : true;


        Array.prototype.forEach.call(housingFeaturesArray, function (featuresItemData) {
          if (featuresItemData.checked && features.indexOf(featuresItemData.value) === -1) {
            isFine = false;
          }
        });

        pinMap.children[apartamentItem + 1].style.visibility = (isFine) ? 'visible' : 'hidden';
      });

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
    // при начальной загрузке страницы показываются первые три объекта
    pins.forEach(function (pinsItem, pinsIndex) {
      if (pinsIndex > 3) {
        pinsItem.style.visibility = 'hidden';
      }
    });
  };


  // Вызываем window.load
  window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', callback);

})();
