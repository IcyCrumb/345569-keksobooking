'use strict'


window.load = (function () {

  function load(url, smth) {

    // Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Конфигурируем его: GET-запрос на URL, передающийся в load() в качестве параметра
    xhr.open('GET', url);
    //xhr.withCredentials = true;
    //xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    // Отсылаем запрос
    xhr.send();

    // Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
    // обработать ошибку
      alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
    } else {
      smth(xhr.responseText);
      //alert( xhr.responseText );
   }
 }
 return load;
})();
