/*var buttonCross = document.querySelector('.dialog__close');
var dialogWindow = document.querySelector('.dialog');
var activeElement = document.querySelector('div.pin.pin--active')
var pinMap = document.querySelector('.tokyo__pin-map');
*/


//;(function() {
function initializePins(button, dialogState, dialog, active) {


  // при щелчке мышью на крестик срабатывает функция hideDialog()
  button.addEventListener('click', clickHandler);

   function clickHandler () {
     //var target = evt.target;
     dialog.style.visibility = dialogState;
     //target.setAttribute('aria-pressed', 'true');
    //activeElement.classList.remove('pin--active');
     if (active) {
       active.classList.remove('pin--active');
       //target.setAttribute('aria-pressed', 'false');
     }
     //target.classList.add('pin--active');
     //return;
    pinMap.classList.add('pin--active');
   };
//};
window.initializePins = initializePins;
}//());
/*
  var clickHandler = function (evt) {
    var target = evt.target;

    while (target !== document.body) {
      if (target.classList.contains('pin')) {
        if (target.classList.contains('pin--active')) {
          break;
        }
        dialogWindow.style.visibility = 'visible';
        target.setAttribute('aria-pressed', 'true');

        if (activeElement) {
          activeElement.classList.remove('pin--active');
          target.setAttribute('aria-pressed', 'false');
        }

        target.classList.add('pin--active');
        return;
      }
      target = target.parentNode;
    }
  };



  var activeElementHandler = function (elem) {
    elem.setAttribute('aria-pressed', 'true');

    if (activeElement) {
      activeElement.classList.remove('pin--active');
      elem.setAttribute('aria-pressed', 'false');
    }

    elem.classList.add('pin--active');
  };
}

// находим элемент с классом .tokyo__pin-map
var pinMap = document.querySelector('.tokyo__pin-map');


// функция дективирует предыдущий элемент и делает активным текущий
var activeElementHandler = function (elem) {
  elem.setAttribute('aria-pressed', 'true');
  var activeElement = document.querySelector('div.pin.pin--active');

  if (activeElement) {
    activeElement.classList.remove('pin--active');
    elem.setAttribute('aria-pressed', 'false');
  }

  elem.classList.add('pin--active');
};

// функция вызывает showDialog() и activeElementHandler()
// при клике на любой из потомков элемента pinMap
var clickHandler = function (evt) {
  var target = evt.target;

  while (target !== document.body) {
    if (target.classList.contains('pin')) {
      if (target.classList.contains('pin--active')) {
        break;
      }
      dialogWindow.style.visibility = 'visible';
      activeElementHandler(target);
      return;
    }
    target = target.parentNode;
  }
};

// функция вызывает showDialog() и activeElementHandler()
// при нажатии enter-ом на любой из потомков элемента pinMap
var keydownHandler = function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    evt.target.click();
  }
};

// вызываем  clickHandler() при клике и keydownHandler() при нажатии на pinMap
pinMap.addEventListener('click', clickHandler);
pinMap.addEventListener('keydown', keydownHandler);
*/
