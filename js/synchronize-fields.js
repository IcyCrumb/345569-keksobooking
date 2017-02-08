/*elem1 = var selectType = document.getElementById('type');
elem2 = var price = document.getElementById('price');
array1 = ['квартира', 'лачуга', 'дворец'];
array2 = [1000, 0, 10000];
property = 'min';
*/

;(function synchronizeFields (elem1, elem2, arr1, arr2, prop) {

elem1.addEventListener('change', function () {
  if (elem1.value === arr1[0]) {
    elem2.setAttribute(prop, arr2[0]);
  } else if (elem1.value === arr1[1]) {
    elem2.setAttribute(prop, arr2[1]);
  } else if (elem1.value === arr1[2]) {
    elem2.setAttribute(prop, arr2[2]);
  }
});


  window.synchronizeFields = synchronizeFields;
}());


//for (var i = 0; i < elem1.length; i++) {
  //elem2.setAttribute(property, array2[i])
//}

//array1.forEach(function(item, i, array1) {
//elem2.setAttribute(property, array2[i]);
//});
