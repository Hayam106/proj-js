// let userInfo = document.querySelector ("#n-user")
// let userD = document.querySelector ("#user")
// let link = document.querySelector ("#link")

// if (localStorage.getItem("FirstName")){
//     link.remove()
//     userInfo.style.display ="flex"
// userD.innerHTML = "Hello, " + localStorage.getItem("FirstName");
// }
// let logOutBtn = document.querySelector("#logout")
// logOutBtn.addEventListener("click", function (){
//     localStorage.clear();
//     setTimeout(() => {
//         window.location = "login.html";
//     } , 1000)
// })

////////////////////////////////////////////////////////////////////////////////////////
// document.addEventListener("DOMContentLoaded", () => {

//   const userInfo = document.querySelector("#n-user");
//   const userD = document.querySelector("#user");
//   const link = document.querySelector("#link");
//   const logOutBtn = document.querySelector("#logout");

//   if(localStorage.getItem("FirstName")){
//     if(link) link.remove();
//     if(userInfo) userInfo.style.display = "flex";
//     if(userD) userD.innerHTML = "Hello, " + localStorage.getItem("FirstName");
//   }

//   if(logOutBtn){
//     logOutBtn.addEventListener("click", function(){
//       localStorage.clear();
//       setTimeout(() => {
//         window.location = "login.html";
//       }, 1000);
//     });
//   }

// });

document.addEventListener("DOMContentLoaded", () => {

  const userInfo = document.querySelector("#n-user"); // العنصر اللي هيظهر لليوزر
  const userD = document.querySelector("#user");      // اسم المستخدم
  const link = document.querySelector("#link");       // العنصر اللي فيه login/register
  const logOutBtn = document.querySelector("#logout");

  const firstName = localStorage.getItem("FirstName");

  if(firstName){
    // المستخدم عامل تسجيل دخول
    if(link) link.remove();
    if(userInfo) userInfo.style.display = "flex"; // نعرض بيانات المستخدم
    if(userD) userD.textContent = "Hello, " + firstName;
  } else {
    // المستخدم مش عامل تسجيل دخول
    if(link) link.style.display = "flex"; // عرض Login/Register
    if(userInfo) userInfo.style.display = "none"; // نخفي بيانات المستخدم
  }

  if(logOutBtn){
    logOutBtn.addEventListener("click", function(){
      localStorage.clear();                 // مسح بيانات اليوزر
      // تحديث الهيدر فورًا
      if(link) link.style.display = "flex";
      if(userInfo) userInfo.style.display = "none";
    });
  }

});

