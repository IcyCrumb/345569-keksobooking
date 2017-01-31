'use strict';

var items = document.querySelectorAll(".pin");

for (var i = 0;  i < items.length; i++) {
  items[i].addEventListener("click", setHandler(i), false);
}

function setHandler(i) {
  return function(e) {
    var active = document.querySelector("div.pin.pin--active");
    if (active) {
      active.classList.remove("pin--active");
    }
    items[i].classList.add("pin--active");
    var dialogWindow = document.querySelector(".dialog");
    dialogWindow.style.display = "block";
  };
}

var buttonCross = document.querySelector(".dialog__close");
buttonCross.addEventListener("click", function() {
  var dialogWindow = document.querySelector(".dialog");
  dialogWindow.style.display = "none";
  document.querySelector("div.pin.pin--active").classList.remove("pin--active");
});


var title = document.getElementById("title");
title.required = true;
title.minLength = 30;
title.maxLength = 100;

var price = document.getElementById("price");
price.setAttribute("min", 1000);
price.setAttribute("max", 1000000);

var address = document.getElementById("address");
address.required = true;

var select1 = document.getElementById("time");
var select2 = document.getElementById("timeout");
select1.addEventListener('change', function() {
  var i = this.selectedIndex;
  select2.selectedIndex = i;
});
