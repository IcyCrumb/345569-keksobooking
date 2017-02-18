'use strict';

window.showCard = (function () {
  var buttonCross = document.querySelector('.dialog__close');
  var dialogWindow = document.querySelector('.dialog');

  var onButtonCross;
   // функция делает элемент с классом .dialog видимым
  function showDialog(callback) {
    dialogWindow.style.visibility = 'visible';
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
    hide: hideDialog};
})();
