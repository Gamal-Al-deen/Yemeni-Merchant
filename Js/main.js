document.addEventListener("DOMContentLoaded", () => {
  const savedImage = localStorage.getItem("profileImage");
  const savedName = localStorage.getItem("profileName") || "جمال الدين الحقل";
  const savedEmail = localStorage.getItem("profileEmail") || "jamal@email.com";

  const headerImg = document.querySelector(".nav-actions img.account-img");
  if (headerImg) headerImg.src = savedImage;


  const modalUserImage = document.getElementById("modalUserImage");
  if (modalUserImage) modalUserImage.src = savedImage;


  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");
  if (userName) userName.textContent = savedName;
  if (userEmail) userEmail.textContent = savedEmail;

 
  const accountImg = document.querySelector(".account-img");
  const userModal = document.getElementById("userModal");

  if (accountImg && userModal) {
    accountImg.addEventListener("click", () => {
   
      userModal.style.display = (userModal.style.display === "block") ? "none" : "block";
    });


    document.addEventListener("click", (e) => {
      if (!userModal.contains(e.target) && !accountImg.contains(e.target)) {
        userModal.style.display = "none";
      }
    });
  }

  const THEME_KEY = "app_theme";
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = htmlEl.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const nextTheme = current === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      updateThemeIcon(nextTheme);
      localStorage.setItem(THEME_KEY, nextTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      htmlEl.setAttribute("data-theme", "dark");
    } else {
      htmlEl.removeAttribute("data-theme");
    }
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    themeIcon.src = theme === "dark" ? "icon/sun.png" : "icon/moon.png";
    themeIcon.alt = theme === "dark" ? "الوضع النهاري" : "الوضع الليلي";
  }


  const PRIMARY_KEY = "app_primary_color";
  const colorPicker = document.getElementById("primaryColorPicker");

  const savedPrimary = localStorage.getItem(PRIMARY_KEY) || "#e66b19";
  document.documentElement.style.setProperty("--main-color", savedPrimary);
  if (colorPicker) colorPicker.value = savedPrimary;

  if (colorPicker) {
    colorPicker.addEventListener("input", (e) => {
      const color = e.target.value;
      document.documentElement.style.setProperty("--main-color", color);
      localStorage.setItem(PRIMARY_KEY, color);
    });
  }


  let backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    });

    backToTopBtn.onclick = function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  }
});
