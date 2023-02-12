let submit = document.querySelector(".reset-submit-btn");
let email = document.getElementById("email")
submit.addEventListener("click", function () {
    if (isValidEmail()) {
        alert("Message is sent to the provided email, check your inbox!")
    }

    else {
        alert("invalid email address!")
    }
});

function isValidEmail() {
  let regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  return regexEmail.test(email.value);
}
