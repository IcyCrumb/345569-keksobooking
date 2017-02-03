'use strict';

var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

//var isActivateEvent = function(evt) {
  //return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
//}

// находим все элементы с классом .pin и делаем из них кнопки
var pins = document.querySelectorAll('.pin');

for (var i = 0; i < pins.length; i++) {
  pins[i].setAttribute('role', 'button');
  pins[i].tabIndex = 0;
  pins[i].setAttribute('aria-pressed', 'false');
}

// при нажатии клавиатуры или щелчке мышью на элемент .pin срабатывает функция setHandler(k)
for (var i = 0; i < pins.length; i++) {
  pins[i].addEventListener('click', setPinHandler(i));
  //if (evt.keyCode == ENTER_KEY_CODE) {
    pins[i].addEventListener('keydown', setPinHandler(i));
  //}
}

// функция делает текущий элемент активным и убирает "активность" с предыдущего элемента
function setPinHandler(k) {
  return function () {
    var active = document.querySelector('div.pin.pin--active');
    if (active) {
      active.classList.remove('pin--active');
    }
    pins[k].classList.add('pin--active');
    var dialogWindow = document.querySelector('.dialog');
    dialogWindow.style.visibility = 'visible';
  };
}

// находим элемент с классом .dialog и делаем из него "документ"
var dialog = document.querySelector('div.dialog');
dialog.setAttribute('role', 'document');

// находим элемент с классом .dialog__close и делаем из него кнопку
var buttonCross = document.querySelector('.dialog__close');
buttonCross.setAttribute('role', 'button');
buttonCross.tabIndex = 1;
buttonCross.setAttribute('aria-pressed', 'false');

// при нажатии клавиатуры или щелчке мышью на крестик срабатывает функция setCrossHandler
buttonCross.addEventListener('click', setCrossHandler);
//if (evt.keyCode == ENTER_KEY_CODE) {
  buttonCross.addEventListener('keydown', setCrossHandler);
//}

// функция закрывает элемент .dialog и деактивирует элемент .pin
function setCrossHandler() {
  //if (evt.keyCode === ENTER_KEY_CODE) {
    var dialogWindow = document.querySelector('.dialog');
    dialogWindow.style.visibility = 'hidden';
    document.querySelector('div.pin.pin--active').classList.remove('pin--active');
  //}
};




/*
buttonCross.addEventListener('click', function () {
  var dialogWindow = document.querySelector('.dialog');
  dialogWindow.style.visibility = 'hidden';
  document.querySelector('div.pin.pin--active').classList.remove('pin--active');
});
*/
/*
var dialog = document.querySelector('div.dialog');
//dialog.setAttribute('role', 'dialog');

var isActivateEvent = function(evt) {
  return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
}

var setupKeydownHandler = function(evt) {
  if (evt.target !== document.querySelector('') && evt.keyCode === ESCAPE_KEY_CODE) {
    pins.classList.add('invisible');
  }
}

var showSetupElement = function () {
  pins.classList.remove('invisible');
  document.addEventListener('keydown', setupKeydownHandler);
}

var hideSetupElement = function () {
  pins.classList.add('invisible');
  document.removeEventListener('keydown', setupKeydownHandler);
}

.addEventListener('click', function () {
  showSetupElement;
});

.addEventListener('keydown', function(evt) {
  if (isActivateEvent(evt)) {
    showSetupElement;
  }
});
*/


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
