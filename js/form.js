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

var selectTimeIn = document.getElementById("time");
var selectTimeOut = document.getElementById("timeout");
selectTimeIn.addEventListener("change", function() {
  var i = this.selectedIndex;
  selectTimeOut.selectedIndex = i;
});

var selectType = document.getElementById("type");
var selectPrice = document.getElementById("price");
selectType.addEventListener("change", function() {
  if (selectType.value == "Квартира") {
    price.setAttribute("min", 1000);
  }
  else if (selectType.value == "Лачуга") {
    price.setAttribute("min", 0);
  }
  else if (selectType.value == "Дворец") {
    price.setAttribute("min", 10000);
  }
});

/*var selectRoomNumber = document.getElementById("room_number");
var selectCapacity = document.getElementById("capacity");

selectRoomNumber.addEventListener("change", function() {
  var n = selectRoomNumber.value;
  //var m = selectCapacity.value;
  if (n == "2 комнаты" || n == "100 комнат") {
    selectCapacity.selectedValue  = "для 3 гостей";
  }
  else if (n == "1 комната") {
    selectCapacity.selectedValue = "не для гостей";
  }
});
*/

var selectCapacity = document.getElementById("capacity");
var optionStore = [];
for( var i = 0; i < selectCapacity.options.length; ++i ) {
  optionStore[i] = selectCapacity.options[i];
}

var selectRoomNumber = document.getElementById("room_number");
selectRoomNumber.addEventListener("change", function() {
  var i = this.selectedIndex;
  //var value = this.selectedValue;
  selectCapacity.options.length=0;
  if (i == 0) {
    for (var k=0; k<1; k++) {
      selectCapacity.options[k] = optionStore[1];
    }
  }
  else {
    for (var k=0; k<1; k++) {
      selectCapacity.options[k] = optionStore[0];
    }
  }
});
