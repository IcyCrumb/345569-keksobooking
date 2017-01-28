'use strict';

var items = document.querySelectorAll(".pin");

for (var i = 0;  i < items.length; i++) {
  items[i].addEventListener("click", setHandler(i), false);
}

function setHandler(i) {
  return function(e) {
    document.querySelector("div.pin.pin--active").classList.remove("pin--active");
    items[i].classList.add("pin--active");
    var dialogWindow = document.querySelector(".dialog");
    dialogWindow.style.display = "block";
  };
}

var buttonCross = document.querySelector(".dialog__close");
buttonCross.addEventListener("click", function() {
  var dialogWindow = document.querySelector(".dialog");
  dialogWindow.style.display = "none";
  //document.querySelector("div.pin.pin--active").classList.remove("pin--active");
});
