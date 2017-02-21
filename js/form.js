'use strict';

window.form = (function () {

  var title = document.getElementById('title');
  title.required = true;
  title.minLength = 30;
  title.maxLength = 100;

  var address = document.getElementById('address');
  address.required = true;

  var selectType = document.getElementById('type');
  var price = document.getElementById('price');
  var availableAccommodationTypes = ['Квартира', 'Лачуга', 'Дворец'];
  var availablePrices = [1000, 0, 10000];

  price.required = true;
  price.setAttribute('min', 1000);
  price.setAttribute('max', 1000000);


  var callbackMin = function (element, value) {
    element['min'] = value;
  };

  window.synchronizeFields(selectType, price, availableAccommodationTypes, availablePrices, callbackMin);

  var selectTimeIn = document.getElementById('time');
  var selectTimeOut = document.getElementById('timeout');

  var availableTimein = ['12', '13', '14'];
  var availableTimeout = ['12', '13', '14'];

  var callbackValue = function (element, value) {
    element['value'] = value;
  };

  window.synchronizeFields(selectTimeIn, selectTimeOut, availableTimein, availableTimeout, callbackValue);
  window.synchronizeFields(selectTimeOut, selectTimeIn, availableTimein, availableTimeout, callbackValue);


  var selectRoomNumber = document.getElementById('room_number');
  var selectCapacity = document.getElementById('capacity');

  var availableRoomNumber = ['1 комната', '2 комнаты', '100 комнат'];
  var availableCapacity = ['не для гостей', 'для 3 гостей', 'для 3 гостей'];

  window.synchronizeFields(selectRoomNumber, selectCapacity, availableRoomNumber, availableCapacity, callbackValue);
})();
