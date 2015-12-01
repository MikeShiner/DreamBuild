window.db = window.db || {};
window.db.cf = (function () {
   "use strict";

   var
      resetValues = function () {
         var form;
         console.log("resetValues is running...");
         form = document.getElementById("contform");
         form.reset();   
      },

      pushData = function (name, home, mobile, enquiry) {
         var form, infoJSON, payload, xhr = new XMLHttpRequest();
         form = document.getElementById("contform");
         console.log("Name: " + name +" Home: " + home + " Mobile: " + mobile + " Enquiry: " + enquiry);

         infoJSON = {
            fullName: name,
            homePhone: home,
            mobilePhone: mobile,
            enquiry: enquiry
         };

         payload = "infoJSON=" + JSON.stringify(infoJSON);
         console.log(infoJSON);

         xhr.open("POST", "inc/mailto.php", true);
         xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
         xhr.send(payload);


      },

      validateData = function () {
         var form, nameError, mobileError, homeError,
         enquiryError, namePattern, homePattern, mobilePattern,
         enquiryPattern, errors;

         form = document.getElementById("contform");
         errors = 0;
         // input error messages
         nameError = document.getElementById("nameError");
         mobileError = document.getElementById("mobileError");
         homeError = document.getElementById("homeError");
         enquiryError = document.getElementById("enquiryError");

         // input regular expressions
         namePattern = /^[a-z]+([a-z-]|\s)+$/i;
         homePattern = /\d{11}/;
         mobilePattern = /\+44\d{10}/;
         enquiryPattern = /^(.|\c){10,}/i;

         if (!namePattern.test(form.name.value)) {
            nameError.innerHTML ="Please include your first and last name.";
            errors += 1;
            console.log("errors: " + errors);
         } else {
            nameError.innerHTML ="";
         }
         if (!homePattern.test(form.home.value)) {
            homeError.innerHTML ="Not valid. Please include areacode followed by your number. e.g. 01202875746.";
            errors +=1;
            console.log("errors: " + errors);
         } else {
            homeError.innerHTML ="";
         }
         if (form.mobile.value == "") {
         } else if (!mobilePattern.test(form.mobile.value)) {
            mobileError.innerHTML ="Not valid. Please format your UK mobile number with +44 followed by 10 digits.";
            errors +=1;
            console.log("errors: " + errors);
         } else {
            mobileError.innerHTML ="";
         }
         if (!enquiryPattern.test(form.enquiry.value)) {
            enquiryError.innerHTML =" Your enquiry must contain at least a sentence.";
            errors +=1;
            console.log("errors: " + errors);
         } else {
            enquiryError.innerHTML ="";
         }

         if(errors >0) {
            return false;
         }

         pushData(form.name.value, form.home.value, form.mobile.value, form.enquiry.value)

      },

      setup = function (){
         var send = document.getElementById("sendButton");
         //resetValues();

         send.addEventListener("click", validateData);

      };
      
   return {
      "setup": setup
   };
}());
window.addEventListener("load", db.cf.setup);