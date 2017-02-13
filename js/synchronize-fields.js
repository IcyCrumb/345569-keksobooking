'use strict';

window.synchronizeFields = (function () {
  function synchronizeFields(firstForm, secondForm, firstArray, secondArray, property) {
    firstForm.addEventListener('change', function () {
      for (var i = 0; i < firstArray.length; i++) {
        if (firstForm.value === firstArray[i]) {
          (secondForm[property] = secondArray[i]) || (secondForm[property] = secondArray[i-1]);
          break;
        }
      }
    });
  }
  return synchronizeFields;
})();
