'use strict'


window.load = (function () {

  function load(url, smth) {

    // Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.onload = function(event){
      //document.write(event.target.responseText);

      var similarApartments = JSON.parse(event.target.responseText);
      //console.log(similarApartments[0].offer.checkout);

      document.getElementsByClassName('tokyo')[0].insertAdjacentHTML('afterbegin', '<template id="pin-template"><div class="pin"><img src="" alt="" class="rounded" width="40" height="40"></div></template>');

      var pins = document.querySelectorAll('.pin');
      var tokios = document.querySelectorAll('.tokyo__pin-map');
      for (var i = 1; i < pins.length; i++) {
        tokios[0].removeChild(pins[i]);
      }

      var newElements = [];

      for (var j = 0; j < 3; j++) {
        var templateElement = document.querySelector('#pin-template');
        var elementToClone = templateElement.content.querySelector('.pin');
        newElements.push(elementToClone.cloneNode(true));

        newElements[j].style.position = 'absolute';
        var x = similarApartments[j].location.x;
        var y = similarApartments[j].location.y;
        newElements[j].style.top = y + 'px';
        newElements[j].style.left = x + 'px';
        //newElements[j].setAttribute('offsetLeft', x);
        //newElements[j].setAttribute('offsetTop', y);

        //newElements[j].childNodes[0].src = 'img/main-pin-image.png';
        newElements[j].childNodes[0].src = similarApartments[j].author.avatar;
        tokios[0].appendChild(newElements[j]);
        //newElements[j].addEventListener('click', function () {
        //document.getElementsByClassName('tokyo')[0].insertAdjacentHTML('afterbegin', '<template id="pin-template"><div class="pin"><img src="" alt="" class="rounded" width="40" height="40"></div></template>');
        //})
      }
    }

    xhr.send();
 }
 return load;
})();

// img/main-pin-image.png
