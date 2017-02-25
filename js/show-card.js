'use strict';

window.showCard = (function () {
  var buttonCross = document.querySelector('.dialog__close');
  var dialogWindow = document.querySelector('.dialog');

  // Функция заполняет элемент .dialog данными
  function fillWithData(data) {
    var avatar = dialogWindow.getElementsByTagName('img')[0];
    avatar.src = data.author.avatar;

    var title = dialogWindow.querySelector('.lodge__title');
    title.innerText = data.offer.title;

    var address = dialogWindow.querySelector('.lodge__address');
    address.innerText = data.offer.address;

    var price = dialogWindow.querySelector('.lodge__price');
    price.innerText = data.offer.price + '/ночь';

    var type = dialogWindow.querySelector('.lodge__type');
    type.innerText = data.offer.type;


    var roomsWordForm = 'комнат';
    if (data.offer.rooms === 1) {
      roomsWordForm = 'комната';
    } else if (data.offer.rooms === 2 || data.offer.rooms === 3 || data.offer.rooms === 4) {
      roomsWordForm = 'комнаты';
    }

    var guestsWordForm = 'гостей';
    if (data.offer.guests === 1) {
      guestsWordForm = 'гостя';
    }

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


    //document.getElementsByClassName('tokyo')[0].insertAdjacentHTML('afterbegin', '<template id="lodge-template"><div class="pin"><img src="" alt="Lodge photo" tabindex="2" width="52" height="42"></div></template>');

    // Удалила все <img>
    var photoArea = document.querySelector('.lodge__photos');
    var photos = document.querySelectorAll('.lodge__photos');
    var images = photoArea.querySelectorAll('img');
    for (var i = 0; i < images.length; i++) {
      photos[0].removeChild(images[i]);
    }

    var newElements = [];

    for (var j = 0; j < data.offer.photos.length; j++) {
      // Клонирование шаблона <template>
      var templateElement = document.querySelector('#lodge-template');
      var elementToClone = templateElement.content.querySelector('img');
      // Добавление элемента в массив
      newElements.push(elementToClone.cloneNode(true));

      // Загрузка аватарки
      newElements[j].src = data.offer.photos[j];
      photos[0].appendChild(newElements[j]);
    }
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
