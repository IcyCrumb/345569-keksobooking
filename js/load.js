'use strict';


window.load = (function () {

  function load(url, callback) {

    // Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.onload = function (event) {
      // Парсим JSON
      var similarApartments = JSON.parse(event.target.responseText);
      callback(similarApartments);
    };

    xhr.send();
  }
  return load;
})();
