'use strict';

window.showCard = (function () {
  var buttonCross = document.querySelector('.dialog__close');
  var dialogWindow = document.querySelector('.dialog');

  // Клонирование шаблона <template>
  var elementToClone = document.querySelector('#lodge-template').content.querySelector('img');

  var avatar = dialogWindow.getElementsByTagName('img')[0];
  var title = dialogWindow.querySelector('.lodge__title');
  var address = dialogWindow.querySelector('.lodge__address');
  var price = dialogWindow.querySelector('.lodge__price');
  var type = dialogWindow.querySelector('.lodge__type');

  var roomsAndGuests = dialogWindow.querySelector('.lodge__rooms-and-guests');
  var checkin = dialogWindow.querySelector('.lodge__checkin-time');
  var features = dialogWindow.querySelector('.lodge__features');
  var description = dialogWindow.querySelector('.lodge__description');

  // Функция заполняет элемент .dialog данными
  function fillWithData(data) {

    avatar.src = data.author.avatar;
    title.innerText = data.offer.title;
    address.innerText = data.offer.address;
    price.innerText = data.offer.price + '/ночь';
    type.innerText = data.offer.type;

    var roomsWordForm;
    switch (data.offer.rooms) {
      case 1:
        roomsWordForm = 'комната';
        break;
      case 2:
      case 3:
      case 4:
        roomsWordForm = 'комнаты';
        break;
      default:
        roomsWordForm = 'комнат';
    }

    var guestsWordForm = (data.offer.guests === 1) ?  'гостя' : 'гостей';

    var roomsAndGuests = dialogWindow.querySelector('.lodge__rooms-and-guests');
    roomsAndGuests.innerText = data.offer.rooms + ' ' + roomsWordForm + ' для ' + data.offer.guests + ' ' + guestsWordForm;

    var checkin = dialogWindow.querySelector('.lodge__checkin-time');
    checkin.innerText = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

    var features = dialogWindow.querySelector('.lodge__features');

    features.getElementsByTagName('span')[0].style.display = (data.offer.features.indexOf('wifi') === -1) ? 'none' : 'block';
    features.getElementsByTagName('span')[1].style.display = (data.offer.features.indexOf('dishwasher') === -1) ? 'none' : 'block';
    features.getElementsByTagName('span')[2].style.display = (data.offer.features.indexOf('parking') === -1) ? 'none' : 'block';
    features.getElementsByTagName('span')[3].style.display = (data.offer.features.indexOf('washer') === -1) ? 'none' : 'block';
    features.getElementsByTagName('span')[4].style.display = (data.offer.features.indexOf('elevator') === -1) ? 'none' : 'block';
    features.getElementsByTagName('span')[5].style.display = (data.offer.features.indexOf('conditioner') === -1) ? 'none' : 'block';


    var description = dialogWindow.querySelector('.lodge__description');
    description.innerText = data.offer.description;


    // Удалила все <img>
    var photoArea = document.querySelector('.lodge__photos');
    var images = photoArea.querySelectorAll('img');

    images.forEach(function (item) {
      photoArea.removeChild(item);
    });

    var newElements = [];

    data.offer.photos.forEach(function (photo) {
      // Клонирование шаблона <template>
      // var elementToClone = document.querySelector('#lodge-template').content.querySelector('img');
      var clonedElement = elementToClone.cloneNode(true);
      clonedElement.src = photo;
      // Добавление элемента в массив
      newElements.push(clonedElement);
    });
    // Загрузка аватарки
    newElements.forEach(function (newPhotoElement) {
      photoArea.appendChild(newPhotoElement);
    });
  }

  var onButtonCross;
   // функция делает элемент с классом .dialog видимым
  function showDialog(callback) {
    buttonCross.addEventListener('click', crossClickHandler);
    onButtonCross = callback;
  }

   // обработчик клика на крестик
  function crossClickHandler() {
    buttonCross.setAttribute('aria-pressed', 'true');
    hideDialog();
  }

  // функция закрывает элемент .dialog и деактивирует элемент .pin
  function hideDialog() {
    dialogWindow.style.visibility = 'hidden';
    var activeElement = document.querySelector('div.pin.pin--active');
    if (activeElement) {
      activeElement.classList.remove('pin--active');
    }
    if (typeof onButtonCross === 'function') {
      onButtonCross();
    }
    buttonCross.removeEventListener('click', crossClickHandler);
  }

  return {show: showDialog,
    hide: hideDialog,
    fill: fillWithData};
})();
