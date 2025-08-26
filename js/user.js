

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

