// Js/account.js
document.addEventListener("DOMContentLoaded", () => {
    /* ========== 1) صورة الحساب ========== */
    const fileInput = document.getElementById("profileImageInput");
    const changeBtn = document.getElementById("changeProfileImageBtn");
    const avatarPreview = document.querySelector(".avatar-preview");
  
    if (changeBtn && fileInput) {
      changeBtn.addEventListener("click", () => fileInput.click());
  
      fileInput.addEventListener("change", () => {
        const file = fileInput.files?.[0];
        if (!file) return;
  
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageData = e.target.result;
          if (avatarPreview) avatarPreview.src = imageData;
          localStorage.setItem("profileImage", imageData);
          const headerImg = document.querySelector(".nav-actions img.account-img");
          if (headerImg) headerImg.src = imageData;
        };
        reader.readAsDataURL(file);
      });
    }
  
    // تحميل الصورة المخزنة
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      if (avatarPreview) avatarPreview.src = savedImage;
      const headerImg = document.querySelector(".nav-actions img.account-img");
      if (headerImg) headerImg.src = savedImage;
    }
  
    /* ========== 2) الوضع الليلي/النهاري ========== */
    const THEME_KEY = "app_theme"; // light | dark
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
      if (theme === "dark") {
        themeIcon.src = "icon/sun.png";
        themeIcon.alt = "الوضع النهاري";
      } else {
        themeIcon.src = "icon/moon.png";
        themeIcon.alt = "الوضع الليلي";
      }
    }
  
    /* ========== 3) تغيير اللون الأساسي ========== */
    const PRIMARY_KEY = "app_primary_color";
    const colorPicker = document.getElementById("primaryColorPicker");
  
    // استخدم نفس المتغير في CSS: --main-color
    const savedPrimary = localStorage.getItem(PRIMARY_KEY) || getComputedStyle(document.documentElement).getPropertyValue("--main-color").trim() || "#e66b19";
    document.documentElement.style.setProperty("--main-color", savedPrimary);
    if (colorPicker) colorPicker.value = savedPrimary;
  
    if (colorPicker) {
      colorPicker.addEventListener("input", (e) => {
        const color = e.target.value;
        document.documentElement.style.setProperty("--main-color", color);
        localStorage.setItem(PRIMARY_KEY, color);
      });
    }
  });
  
  /* =========================
   4) إعادة اللون الأساسي
========================== */
const resetBtn = document.getElementById("resetColorsBtn");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    const defaultColor = "#e66b19"; // اللون الافتراضي للموقع
    document.documentElement.style.setProperty("--main-color", defaultColor);
    localStorage.setItem("app_primary_color", defaultColor);
    if (colorPicker) colorPicker.value = defaultColor;
  });
}
