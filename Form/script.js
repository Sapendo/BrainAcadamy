 var errors = document.getElementById('errors');
 var succes = document.getElementById('succes');
 var nameError = document.getElementById('nameError');
 var phoneError = document.getElementById('phoneError');
 var ageError = document.getElementById('ageError');
 var form = document.forms[0];
 var input = document.getElementsByTagName('input');

 for (var i = 0; i < input.length; i++) {
     input[i].onfocus = function() {
         var textError = this.nextElementSibling;
         if (textError)
             textError.innerHTML = '';
     }

 }
 form.onsubmit = function(e) {
     e.preventDefault();
     if (validateForm())
         showError("Форма удачно отправлена", true);
 };

 function validateForm() {
     if (!validateTextInput(form.elements.first_name))
         return false;
     if (!validateTelephone(form.elements.phone))
         return false;
     if (!validateNumberInput(form.elements.age))
         return false;
     if (!validateCheckbox(form.elements.gender))
         return false;

     return true;
 }

 function showError(text, success, place) {
     if (success)
         succes.innerHTML = "<span style='color: green'>" + text + "</span>";
     else
         place.innerHTML = "<span style='color: red'>" + text + "</span>";
 }

 function validateTextInput(input) {
     input.value = input.value.trim();
     var value = input.value;
     if (!value) {
         showError("Это обязательное поле", false, nameError);
         return false;
     } else if (value.length < 2) {
         showError("Длина введенного значения должна быть больше одного символа", false, nameError);
         return false;
     } else if (value.length > 20) {
         showError("Длина введенного значения должна быть меньше 21 символа", false, nameError);
         return false;
     } else
         return true;
 }

 function validateNumberInput(input) {
     input.value = input.value.trim();
     var value = input.value;
     if (!value) {
         showError("Это обязательное поле", false, ageError);
         return false;
     } else if (isNaN(+value)) {
         showError("Вы должны ввести число", false, ageError);
         return false;
     } else if (value < 10 || value > 90) {
         showError("Значение должно быть в пределах 10..90", false, ageError);
         return false;
     } else
         return true;
 }

 function validateCheckbox(input) {
     var value = input.value;
     if (value !== 'male' && value !== 'female') {
         showError("Пожалуйста выберите значение", false);
         return false;
     } else
         return true;

 }

 function validateTelephone(input) {
     var value = input.value;
     if (!/^\(0\d{2}\)\s?\d{3}-\d{2}-\d{2}$/.test(value)) {
         showError("Введите телефон в формате (XXX)XXX-XX-XX", false, phoneError);
         return false;
     } else
         return true;
 }