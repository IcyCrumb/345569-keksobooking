'use strict';

window.synchronizeFields = (function () {
  function synchronizeFields(firstForm, secondForm, firstArray, secondArray, property) {
    firstForm.addEventListener('change', function () {
      for (var i = 0; i < secondArray.length; i++) {
        if (firstForm.value === firstArray[i]) {
          secondForm[property] = secondArray[i];
          break;
        }
      }
    });
  }
  return synchronizeFields;
})();
