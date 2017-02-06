'use strict';

var ENTER_KEY_CODE = 13;

// находим элемент с классом .tokyo__pin-map
var pinMap = document.querySelector('.tokyo__pin-map');


// функция делает элемент с классом .dialog видимым
var showDialog = function () {
  document.querySelector('.dialog').style.visibility = 'visible';
};

// функция дективирует предыдущий элемент и делает активным текущий
var activeElementHandler = function (elem) {
  var activeElement = document.querySelector('div.pin.pin--active');

  if (activeElement) {
    activeElement.classList.remove('pin--active');
  }
  elem.classList.add('pin--active');
};

// функция вызывает showDialog() и activeElementHandler()
// при клике на любой из потомков элемента pinMap
var clickHandler = function (evt) {
  var target = evt.target;

  while (target !== 'div.tokyo__pin-map') {
    if (target.className === 'pin' || target.className === 'pin pin__main') {
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
    var target = evt.target;

    while (target !== 'div.tokyo__pin-map') {
      if (target.className === 'pin' || target.className === 'pin pin__main') {
        showDialog();
        activeElementHandler(target);
        return;
      }
      target = target.parentNode;
    }
  }
};

// вызываем  clickHandler() при клике и keydownHandler() при нажатии на pinMap
pinMap.addEventListener('click', clickHandler);
pinMap.addEventListener('keydown', keydownHandler);


// находим элемент с классом .dialog__close
var buttonCross = document.querySelector('.dialog__close');

// при щелчке мышью на крестик срабатывает функция hideDialog()
buttonCross.addEventListener('click', function () {
  buttonCross.setAttribute('aria-pressed', 'true');
  hideDialog();
});

// при нажатии enter-ом на крестик срабатывает функция hideDialog()
buttonCross.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    buttonCross.setAttribute('aria-pressed', 'true');
    hideDialog();
  }
});

// функция закрывает элемент .dialog и деактивирует элемент .pin
var hideDialog = function () {
  var dialogWindow = document.querySelector('.dialog');
  dialogWindow.style.visibility = 'hidden';
  document.querySelector('div.pin.pin--active').classList.remove('pin--active');
};


var title = document.getElementById('title');
title.required = true;
title.minLength = 30;
title.maxLength = 100;

var price = document.getElementById('price');
price.required = true;
price.setAttribute('min', 1000);
price.setAttribute('max', 1000000);

var address = document.getElementById('address');
address.required = true;

var selectTimeIn = document.getElementById('time');
var selectTimeOut = document.getElementById('timeout');

selectTimeIn.addEventListener('change', function () {
  var index = selectTimeIn.selectedIndex;
  selectTimeOut.selectedIndex = index;
});

var selectType = document.getElementById('type');
selectType.addEventListener('change', function () {
  if (selectType.value === 'Квартира') {
    price.setAttribute('min', 1000);
  } else if (selectType.value === 'Лачуга') {
    price.setAttribute('min', 0);
  } else if (selectType.value === 'Дворец') {
    price.setAttribute('min', 10000);
  }
});

var selectRoomNumber = document.getElementById('room_number');
var selectCapacity = document.getElementById('capacity');

var ROOMS_CAPACITY_RELATIONS = [[true, false],
                                [true, true],
                                [true, true]];

function setCapacityAbilities(context) {
  for (var j = 0; j < ROOMS_CAPACITY_RELATIONS[0].length; j++) {
    selectCapacity.options[j].disabled = !ROOMS_CAPACITY_RELATIONS[context.selectedIndex][j];
  }
}

setCapacityAbilities(selectRoomNumber);

selectRoomNumber.addEventListener('change', function () {
  setCapacityAbilities(selectRoomNumber);
  if (!ROOMS_CAPACITY_RELATIONS[selectRoomNumber.selectedIndex][selectCapacity.selectedIndex]) {
    selectCapacity.selectedIndex = 0;
  }
});
