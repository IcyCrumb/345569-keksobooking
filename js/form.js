'use strict';

var items = document.querySelectorAll('.pin');

for (var i = 0; i < items.length; i++) {
  items[i].addEventListener('click', setHandler(i), false);
}

function setHandler(k) {
  return function () {
    var active = document.querySelector('div.pin.pin--active');
    if (active) {
      active.classList.remove('pin--active');
    }
    items[k].classList.add('pin--active');
    var dialogWindow = document.querySelector('.dialog');
    dialogWindow.style.visibility = 'visible';
  };
}

var buttonCross = document.querySelector('.dialog__close');
buttonCross.addEventListener('click', function () {
  var dialogWindow = document.querySelector('.dialog');
  dialogWindow.style.visibility = 'hidden';
  document.querySelector('div.pin.pin--active').classList.remove('pin--active');
});

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
