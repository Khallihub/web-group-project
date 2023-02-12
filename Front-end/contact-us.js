let fname = document.getElementById('firstName')
let lName = document.getElementById('lastName')
let email = document.getElementById('email')
let msg = document.getElementById('msgArea')
let submit = document.querySelector('.submit-btn')

submit.addEventListener("click", function () {
    if (fname.value.length == 0){
        fname.focus
        alert("Please enter your first name!")
    }

    else if (lName.value.length == 0){
        alert("Please enter your last name!")
        lName.focus
    }

    else if (email.value.length == 0){
        alert("Please enter your email address!")
        email.focus
    }

    else if (!isValidEmail()){
        alert("please enter a valid email address!")
        email.focus
    }

    else if (msg.value.length == 0){
        alert("Please enter your message!")
        msg.focus
    }

    else {
        alert("message successfully sent!")
        setTimeout (function () {
            window.open("login.html", "_self")
        }, (1000))
    }
})


function isValidEmail() {
    let regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    return regexEmail.test(email.value)
  }