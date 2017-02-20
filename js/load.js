'use strict'

window.load = (function (url, onLoad) {
  var onLoad = function(array) {
    array = JSON.parse(evt.target.response);
    document.write(JSON.stringify(array));
  }
  // Создаём новый объект XMLHttpRequest
  var xhr = new XMLHttpRequest();
  // Конфигурируем его: GET-запрос на URL, передающийся в load() в качестве параметра
  xhr.open('GET', url);
  // Отсылаем запрос
  xhr.send();

  // Если код ответа сервера не 200, то это ошибка
  if (xhr.status != 200) {
  // обработать ошибку
    alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
  } else {
    onLoad();
    //alert( xhr.responseText );
  }
})();
