'use strict';

window.form = (function () {

  window.initializePins();
  window.showCard();


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
  var currentProperty = 'min';

  price.required = true;
  price.setAttribute('min', 1000);
  price.setAttribute('max', 1000000);

  window.synchronizeFields(selectType, price, availableAccommodationTypes, availablePrices, currentProperty);
  window.synchronizeFields(selectType, price, availableAccommodationTypes, availablePrices, 'placeholder');

  var selectTimeIn = document.getElementById('time');
  var selectTimeOut = document.getElementById('timeout');

  var availableTimein = ['12', '13', '14'];
  var availableTimeout = ['12', '13', '14'];
  currentProperty = 'value';

  window.synchronizeFields(selectTimeIn, selectTimeOut, availableTimein, availableTimeout, currentProperty);
  window.synchronizeFields(selectType, price, availableAccommodationTypes, availablePrices, 'placeholder');

  var selectRoomNumber = document.getElementById('room_number');
  var selectCapacity = document.getElementById('capacity');

  var availableRoomNumber = ['1 комната', '2 комнаты', '100 комнат'];
  var availableCapacity = ['не для гостей', 'для 3 гостей'];
  currentProperty = 'value';

  window.synchronizeFields(selectRoomNumber, selectCapacity, availableRoomNumber, availableCapacity, currentProperty);
  window.synchronizeFields(selectType, price, availableAccommodationTypes, availablePrices, 'placeholder');
})();
