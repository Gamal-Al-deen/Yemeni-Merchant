document.addEventListener("DOMContentLoaded", () => {
  // التحقق من وجود المعلمة في الرابط
  const params = new URLSearchParams(window.location.search);
  if (params.get("openModal") === "true") {
    const addBtn = document.querySelector(".add-product-btn");
    if (addBtn) {
      addBtn.click(); // يفتح المودال مباشرة
    }
  }
});

// تحميل المنتجات من التخزين المحلي
let products = JSON.parse(localStorage.getItem("products") || "[]");
let editIndex = null;
let deleteIndex = null; // نخزن رقم المنتج المراد حذفه مؤقتًا

document.addEventListener("DOMContentLoaded", () => {
  renderTable();

  const productForm = document.getElementById("productForm");
  const saveBtn = document.querySelector("#productModal .save-btn");
  const modalHeading = document.querySelector("#productModal .modal-header h3");

  // زر إضافة منتج في القائمة الجانبية
  document.querySelector(".add-button")?.addEventListener("click", () => openModal());

  if (productForm) {
    productForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const product = {
        id: editIndex !== null && products[editIndex]?.id ? products[editIndex].id : Date.now(),
        name: document.getElementById("productName")?.value || "",
        category: document.getElementById("productCategory")?.value || "",
        price: document.getElementById("productPrice")?.value || "",
        status: document.getElementById("productStatus")?.value || "",
        city: document.getElementById("productCity")?.value || "",
        quantity: document.getElementById("productQuantity")?.value || "",
        company: document.getElementById("productCompany")?.value || "",
        description: document.getElementById("productDescription")?.value || "",
        notes: document.getElementById("productNotes")?.value || ""
      };

      if (editIndex !== null && editIndex > -1 && products[editIndex]) {
        products[editIndex] = product;
        showToast("✏️ تم تعديل المنتج بنجاح");
      } else {
        products.push(product);
        showToast("✅ تم حفظ المنتج بنجاح");
      }
      

      localStorage.setItem("products", JSON.stringify(products));
      renderTable();
      closeModal();

      if (saveBtn) saveBtn.textContent = "حفظ المنتج";
      if (modalHeading) modalHeading.textContent = "إضافة / تعديل منتج";

      this.reset();
      editIndex = null;
    });
  }

  // فلترة حسب الحالة والمدينة
  document.getElementById("filterStatus")?.addEventListener("change", renderTable);
  document.getElementById("filterCity")?.addEventListener("change", renderTable);

  // البحث المباشر
  document.getElementById("searchInput")?.addEventListener("input", renderTable);

  // زر الرجوع للأعلى
  const scrollBtn = document.getElementById("backToTop");
  if (scrollBtn) {
    window.addEventListener("scroll", function () {
      scrollBtn.classList.toggle("show", window.scrollY > 300);
    });
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // زر "نعم، احذف" في مودال التأكيد
  const confirmBtn = document.querySelector(".confirm-delete-btn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      if (deleteIndex !== null) {
        products.splice(deleteIndex, 1);
        localStorage.setItem("products", JSON.stringify(products));
        renderTable();
        showToast("❌ تم حذف المنتج بنجاح");
      }
      closeDeleteModal();
    });
  }
});

// فتح نافذة الإضافة أو التعديل
function openModal(index = null) {
  const modal = document.getElementById("productModal");
  const saveBtn = document.querySelector("#productModal .save-btn");
  const modalHeading = document.querySelector("#productModal .modal-header h3");
  if (!modal) return;

  modal.style.display = "flex";

  if (index !== null && index > -1 && products[index]) {
    const product = products[index];
    document.getElementById("productName").value = product.name || "";
    document.getElementById("productCategory").value = product.category || "";
    document.getElementById("productPrice").value = product.price || "";
    document.getElementById("productStatus").value = product.status || "متوفر";
    document.getElementById("productCity").value = product.city || "";
    document.getElementById("productQuantity").value = product.quantity || "";
    document.getElementById("productCompany").value = product.company || "";
    document.getElementById("productDescription").value = product.description || "";

    editIndex = index;
    if (saveBtn) saveBtn.textContent = "حفظ التعديل";
    if (modalHeading) modalHeading.textContent = "تعديل المنتج";
  } else {
    document.getElementById("productForm").reset();
    editIndex = null;
    if (saveBtn) saveBtn.textContent = "حفظ المنتج";
    if (modalHeading) modalHeading.textContent = "إضافة منتج";
  }
}

// إغلاق نافذة الإضافة
function closeModal() {
  const modal = document.getElementById("productModal");
  if (modal) {
    modal.style.display = "none";
    document.getElementById("productForm")?.reset();
  }
}

// عرض المنتجات في الجدول
function renderTable() {
  const tableBody = document.querySelector(".product-table tbody");
  const numProducts = document.getElementById("numProducts");
  const numProductsAva = document.getElementById("numProductsAva");

  if (!tableBody) return;

  const selectedStatus = document.getElementById("filterStatus")?.value || "";
  const selectedCity = document.getElementById("filterCity")?.value || "";
  const searchTerm = document.getElementById("searchInput")?.value.toLowerCase() || "";

  tableBody.innerHTML = "";
  let availableCount = 0;

  const filteredProducts = products.filter(product => {
    const matchStatus = selectedStatus ? product.status === selectedStatus : true;
    const matchCity = selectedCity ? product.city === selectedCity : true;
    const matchSearch =
      product.name?.toLowerCase().includes(searchTerm) ||
      product.category?.toLowerCase().includes(searchTerm) ||
      product.city?.toLowerCase().includes(searchTerm);

    return matchStatus && matchCity && matchSearch;
  });

  if (filteredProducts.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">لا توجد منتجات مطابقة</td></tr>`;
  }

  filteredProducts.forEach(product => {
    const realIndex = products.findIndex(p => p.id === product.id);

    const statusColor = product.status === "متوفر" ? "green" : "red";
    if (product.status === "متوفر") availableCount++;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name || ""}</td>
      <td>${product.category || ""}</td>
      <td>${product.price || ""} ريال</td>
      <td><span style="color:${statusColor}; font-weight:bold;">${product.status || ""}</span></td>
      <td>${product.city || ""}</td>
      <td>
        <button class="edit-btn" onclick="openModal(${realIndex})">
          <img src="icon/compose.png" alt="تعديل" class="btn-icon"> تعديل
        </button>
        <button class="delete-btn" onclick="deleteProduct(${realIndex})">
          <img src="icon/trash.png" alt="حذف" class="btn-icon"> حذف
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  if (numProducts) numProducts.textContent = filteredProducts.length;
  if (numProductsAva) numProductsAva.textContent = availableCount;
}

// فتح مودال تأكيد الحذف
function deleteProduct(index) {
  deleteIndex = index;
  const modal = document.getElementById("deleteConfirmModal");
  const msg = document.getElementById("deleteMessage");
  if (msg) msg.textContent = `هل أنت متأكد من حذف المنتج: ${products[index]?.name || ""}؟`;
  if (modal) modal.style.display = "flex";
}

// إغلاق مودال الحذف
function closeDeleteModal() {
  const modal = document.getElementById("deleteConfirmModal");
  if (modal) modal.style.display = "none";
  deleteIndex = null;
}

// دالة التوست (لو مش موجودة في main.js)
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}
