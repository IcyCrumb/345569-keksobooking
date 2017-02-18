'use strict';

window.synchronizeFields = (function () {

  function synchronizeFields(firstForm, secondForm, firstArray, secondArray, callback) {
    firstForm.addEventListener('change', function () {
      for (var i = 0; i < firstArray.length; i++) {
        if (firstForm.value === firstArray[i]) {
          callback(secondForm, secondArray[i]);
          break;
        }
      }
    });
  }
  return synchronizeFields;
})();
