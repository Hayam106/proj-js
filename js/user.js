document.addEventListener("DOMContentLoaded", () => {
  const userInfo  = document.querySelector("#n-user"); // العنصر اللي هيظهر لليوزر
  const userD     = document.querySelector("#user");   // اسم المستخدم
  const link      = document.querySelector("#link");   // العنصر اللي فيه login/register
  const logOutBtn = document.querySelector("#logout");

  const firstName = localStorage.getItem("FirstName");

  if(firstName){
    // المستخدم عامل تسجيل دخول
    if(link) link.remove();
    if(userInfo) userInfo.style.display = "flex"; 
    if(userD) userD.textContent = "Hello, " + firstName;
  } else {
    // المستخدم مش عامل تسجيل دخول
    if(link) link.style.display = "flex"; 
    if(userInfo) userInfo.style.display = "none"; 
  }

  if(logOutBtn){
    logOutBtn.addEventListener("click", function(){
      localStorage.clear(); // 🗑 مسح كل بيانات المستخدم

      // 🔀 تحويل مباشر لصفحة تسجيل الدخول
      window.location.href = "login.html";
    });
  }
});

