'use strict';

window.showCard = (function () {
   var buttonCross = document.querySelector('.dialog__close');
   var dialogWindow = document.querySelector('.dialog');

   // функция делает элемент с классом .dialog видимым
   function showDialog() {
     dialogWindow.style.visibility = 'visible';
     buttonCross.addEventListener('click', crossClickHandler);
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
     buttonCross.removeEventListener('click', crossClickHandler);
   }

   return {show: showDialog,
           hide: hideDialog}
})();
