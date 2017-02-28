'use strict';

window.synchronizeFields = (function () {

  function synchronizeFields(firstForm, secondForm, firstArray, secondArray, callback) {
    firstForm.addEventListener('change', function () {
      callback(secondForm, secondArray[firstArray.indexOf(firstForm.value)]);
    });
  }
  return synchronizeFields;
})();
