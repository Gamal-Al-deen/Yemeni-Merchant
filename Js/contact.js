
const showModal = (id, message) => {
    const modal = document.getElementById(id);
    if (message) {
      const textElement = modal.querySelector("p");
      textElement.textContent = message;
    }
    modal.classList.remove("hidden");
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 3000);
  };
  
 
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
     
     
      if(!name){
          showModal("errorModal", "❌ حقل الاسم مطلوب");
          document.getElementById("name").focus();
          return;
        }
        else if(!email ){
          showModal("errorModal", "❌ حقل الايميل مطلوب");
          document.getElementById("email").focus();
          return;
        }
        else if(!message){
        showModal("errorModal", "❌ حقل الرسالة مطلوب");
        document.getElementById("message").focus();
        return;
      }
      
  
      if (!emailPattern.test(email)) {
        
        showModal("errorModal", "❌ يرجى إدخال بريد إلكتروني صالح.");
        document.getElementById("email").value="";
        document.getElementById("email").focus();
        return;
      }
  
      if (message.length < 10) {
        showModal("errorModal", "❌ يرجى كتابة رسالة لا تقل عن 10 أحرف.");
        document.getElementById("message").focus();
        return;
      }
  
    
      showModal("successModal", "✅ تم إرسال رسالتك بنجاح.");
      form.reset();
    });
  });
  