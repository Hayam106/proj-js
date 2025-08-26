let email = document.querySelector("#email");
let password = document.querySelector("#password");
let login_btn = document.querySelector("#sign_in");


   // نجيب القيم من localStorage كل مرة عند الضغط
    let getEmail = localStorage.getItem("email");
    let getPassword = localStorage.getItem("password");

login_btn.addEventListener("click", function(e) {
    e.preventDefault();

 
    if (email.value === "" || password.value === "") {
        alert("please fill data");
    } else {
        if (getEmail && getEmail.trim() === email.value && getPassword && getPassword === password.value) {
            alert("هل تريد تأكيد التسجيل؟");
            setTimeout(() => {
                window.location = "index.html";
            }, 1000);
        } else {
            alert("email or password is wrong");
        }
    }
});
