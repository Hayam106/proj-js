 let FirstName = document.querySelector("#f-name")
  let LastName = document.querySelector("#l-name")
   let email = document.querySelector("#email")
      let password = document.querySelector("#password")
      
      let register_btn = document.querySelector("#sign_up")


      
register_btn.addEventListener ("click" , function (e){
    e.preventDefault()
    if (FirstName.value==="" || LastName.value==="" || email.value==="" || password.value ===""){
        alert("please fill data")
    } else {
        localStorage.setItem("FirstName" , FirstName.value);
        localStorage.setItem("LastName" , LastName.value);
        localStorage.setItem("email" , email.value);
        localStorage.setItem("password" , password.value); // 

        setTimeout ( () => {
            window.location = "login.html"
        } , 1000)
    }
})

