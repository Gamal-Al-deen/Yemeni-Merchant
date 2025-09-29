document.addEventListener("DOMContentLoaded", () => {

    const products = [
      {
        name: "شيلان الفخامة",
        category: "ملابس",
        image: "imgs/شيلان.jpg",
        price: "3500 ريال",
        description: "شيلان فاخر مصنوع من أجود الأقمشة اليمنية.",
        available: true
      },
      {
        name: "بهارات الرجوي",
        category: "بهارات",
        image: "imgs/بهارات2.jpg",
        price: "1200 ريال",
        description: "بهارات طبيعية من مزارع الرجوي.",
        available: true
      },
      {
        name: "بن يمني",
        category: "مشروبات",
        image: "imgs/قهوة1.jpg",
        price: "2500 ريال",
        description: "بن يمني محمص بعناية.",
        available: false
      },
      {
        name: "كبتسينو",
        category: "مشروبات",
        image: "imgs/كبتسينو.jpg",
        price: "1800 ريال",
        description: "كبتسينو سريع التحضير.",
        available: true
      },
      {
        name: "عسل يمني",
        category: "عسل",
        image: "imgs/517147df54e81dfbf1936e89abf2b78b.jpg",
        price: "5000 ريال",
        description: "عسل طبيعي من جبال اليمن.",
        available: true
      },
      {
        name: "كركم الرجوي",
        category: "بهارات",
        image: "imgs/يهارات.jpg",
        price: "900 ريال",
        description: "كركم نقي من إنتاج الرجوي.",
        available: true
      }
    ];
  
    //  الشركات
    const companies = [
      {
        name: "شركة قهوة",
        category: "مشروبات",
        image: "imgs/43f6e699273c5b5d8c5c33fca85c5dbf.jpg",
        activity: "تحميص وتوزيع البن اليمني",
        phone: "770123456",
        website: "https://coffee-ye.com",
        followers: 128,
        isFollowing: false
      },
      {
        name: "حراز كافي",
        category: "مشروبات",
        image: "imgs/b10d6c39ba4bed1f7e90bfa7e27c806f.jpg",
        activity: "مقهى ومحمصة بن",
        phone: "770654321",
        website: "https://harazcafe.com",
        followers: 95,
        isFollowing: false
      },
      {
        name: "تمور وأكثر",
        category: "أغذية",
        image: "imgs/a9a2cfa4e2e45ccc524120ed9c6c1f6c.jpg",
        activity: "بيع التمور ومنتجات النخيل",
        phone: "770987654",
        website: "https://tamorplus.com",
        followers: 67,
        isFollowing: false
      },
      {
        name: "الزين لتجارة والاستيراد",
        category: "استيراد",
        image: "imgs/3985d0187d479bbe0a3b3b1c03ed4c75.jpg",
        activity: "استيراد مواد غذائية",
        phone: "770112233",
        website: "https://alzain-import.com",
        followers: 42,
        isFollowing: false
      },
      {
        name: "شركة الملابس الجاهزة",
        category: "ملابس",
        image: "imgs/7abf2ca43b62487de9aa4cfc62686e84.jpg",
        activity: "تصنيع وتوزيع الملابس",
        phone: "770445566",
        website: "https://readywear.com",
        followers: 73,
        isFollowing: false
      },
      {
        name: "كافي يمن",
        category: "مشروبات",
        image: "imgs/901081d05f5ad113e61044086177f2cf.jpg",
        activity: "مقهى يمني عصري",
        phone: "770778899",
        website: "https://cafeyemen.com",
        followers: 88,
        isFollowing: false
      }
    ];
  
 
    
    const container = document.getElementById("productCards");
    const filterSelect = document.getElementById("categoryFilter");
    const companyContainer = document.getElementById("companyCards");
    const companyFilter = document.getElementById("companyFilter");
  
    const modal = document.getElementById("detailsModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const requestBtn = document.getElementById("requestBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const confirmBtn = document.getElementById("confirmBtn");
    const confirmSection = document.getElementById("confirmSection");

    const closeBtn = document.querySelector(".close");
    const followBtn = document.getElementById("followBtn");
    const followerCount = document.getElementById("followerCount");
    const followSection = document.getElementById("followSection");
  
  
    function renderProducts(list) {
      container.innerHTML = "";
      list.forEach(item => {
        const card = document.createElement("div");
        card.className = "card-img";
        card.innerHTML = `<img src="${item.image}" alt="${item.name}" width="200">
  <p>${item.name}</p>
  <div class="rating">★★★★☆ <span>(4.2)</span></div>

`;


        card.onclick = () => showModal(item);
        container.appendChild(card);
      });
    }
  
    // عرض الشركات
    function renderCompanies(list) {
      companyContainer.innerHTML = "";
      list.forEach(item => {
        const card = document.createElement("div");
        card.className = "card-img";
        card.innerHTML = `<img src="${item.image}" alt="${item.name}" width="200"><p>${item.name}</p>`;
        card.onclick = () => showModal(item);
        companyContainer.appendChild(card);
      });
    }
  
 
    filterSelect.onchange = () => {
      const selected = filterSelect.value;
      const filtered = selected === "الكل" ? products : products.filter(p => p.category === selected);
      renderProducts(filtered);
    };
  
    companyFilter.onchange = () => {
      const selected = companyFilter.value;
      const filtered = selected === "الكل" ? companies : companies.filter(c => c.category === selected);
      renderCompanies(filtered);
    };
  
    
    function showModal(item) {
      modalImage.src = item.image;
      modalTitle.textContent = item.name;
     
  
      if (item.price) {
      
        modalDescription.innerHTML = `
          <p>الصنف: ${item.category}</p>
          <p>السعر: ${item.price}</p>
          <p>الوصف: ${item.description}</p>
          <p>الحالة: ${item.available ? "متوفر ✅" : "غير متوفر ❌"}</p>
     <br>
          <div class="rating"> ★★★★☆ <span>(4.2)</span></div>
        `;
        requestBtn.style.display = "inline-block";
        cancelBtn.style.display = "inline-block";
        confirmSection.style.display = "none";
        followSection.style.display = "none";
  
        requestBtn.onclick = () => {
          confirmSection.style.display = "block";
          requestBtn.style.display = "none";
          cancelBtn.style.display = "none";
        };
  
        confirmBtn.onclick = () => {
          modal.style.display = "none"; 
          showToast("✅ تم إرسال طلبك بنجاح"); 
        };
        
      
  
      } else {

        modalDescription.innerHTML = `
          <p>النشاط: ${item.activity}</p>
          <p>الصنف: ${item.category}</p>
          <p>رقم التواصل: ${item.phone}</p>
          <p><a href="${item.website}" target="_blank">زيارة الموقع</a></p>
        `;
        requestBtn.style.display = "none";
        confirmSection.style.display = "none";
        followSection.style.display = "block";
        cancelBtn.style.display = "inline-block";
  
        const updateFollowUI = () => {
          followerCount.textContent = `عدد المتابعين: ${item.followers}`;
          if (item.isFollowing) {
            followBtn.textContent = "تتابع ✅";
            followBtn.classList.add("following");
        
        } else {
            followBtn.textContent = "متابعة";
            followBtn.classList.remove("following");
          }
        };
  
        updateFollowUI();
  
        followBtn.onclick = () => {
          item.isFollowing = !item.isFollowing;
          item.followers += item.isFollowing ? 1 : -1;
          updateFollowUI();
        };
      }
  
      cancelBtn.onclick = () => {
        modal.style.display = "none";
      };
  
      modal.style.display = "flex";
    }
    
  

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  
  
    renderProducts(products);
    renderCompanies(companies);
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slides img");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dotsContainer = document.querySelector(".dots");
    let index = 0;
  
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        index = i;
        showSlide(index);
      });
      dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll("span");
  
    function showSlide(i) {
      slides.forEach(slide => slide.classList.remove("active"));
      dots.forEach(dot => dot.classList.remove("active"));
      slides[i].classList.add("active");
      dots[i].classList.add("active");
    }
  
    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
    });
  
    nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      showSlide(index);
    });
  

    setInterval(() => {
      index = (index + 1) % slides.length;
      showSlide(index);
    }, 4000);
  });
  


function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

