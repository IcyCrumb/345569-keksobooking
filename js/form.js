'use strict';

var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

// находим все элементы с классом .pin и делаем из них кнопки
var pins = document.querySelectorAll('.pin');

for (var i = 0; i < pins.length; i++) {
  pins[i].setAttribute('role', 'button');
  pins[i].tabIndex = 0;
  pins[i].setAttribute('aria-pressed', 'false');
}

// функция делает элемент с классом .dialog видимым
var showDialog = function () {
  var dialogWindow = document.querySelector('.dialog');
  dialogWindow.style.visibility = 'visible';
}

// функция деактивирует активный элемент
var activeElementHandler = function () {
  var active = document.querySelector('div.pin.pin--active');
  if (active) {
    active.classList.remove('pin--active');
  }
}

// клик на элемент .pin деактивирует предыдущий элемент, делает активным текущий элемент
// и делает видимым элемент .gialog
for (i = 0; i < pins.length; i++) {
  pins[i].addEventListener('click', function () {
    activeElementHandler();
    this.classList.add('pin--active');
    showDialog();
  });
}

// нажатие enter-ом на элемент .pin деактивирует предыдущий элемент,
//делает активным текущий элемент и делает видимым элемент .gialog
for (i = 0; i < pins.length; i++) {
  pins[i].addEventListener('keydown', function(evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      activeElementHandler();
      this.classList.add('pin--active');
      showDialog();
    }
  });
}

// находим элемент с классом .dialog и делаем из него "документ"
var dialog = document.querySelector('div.dialog');
dialog.setAttribute('role', 'document');

// находим элемент с классом .dialog__close и делаем из него кнопку
var buttonCross = document.querySelector('.dialog__close');
buttonCross.setAttribute('role', 'button');
buttonCross.tabIndex = 1;
buttonCross.setAttribute('aria-pressed', 'false');

// при щелчке мышью на крестик срабатывает функция hideDialog()
buttonCross.addEventListener('click', function() {
  hideDialog();
});

// при нажатии enter-ом на крестик срабатывает функция hideDialog()
buttonCross.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    setCrossHandler();
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
