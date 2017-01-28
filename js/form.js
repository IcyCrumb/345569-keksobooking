'use strict';

var items = document.querySelectorAll(".pin");

for (var i = 0, len = items.length; i < len; i++) {
  items[i].addEventListener('click', set_handler(i), false);
}

function set_handler(i) {
  return function(e) {
    document.querySelector("div.pin.pin--active").classList.remove("pin--active");
    items[i].classList.add("pin--active");
  };
}
