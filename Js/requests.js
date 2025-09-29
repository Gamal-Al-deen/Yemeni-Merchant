
let orders = JSON.parse(localStorage.getItem("orders") || "[]");

window.addEventListener("DOMContentLoaded", () => {
 
    document.querySelectorAll(".badge-2").forEach(badge => {
      badge.style.display = "none";
    });

  }
);



window.addEventListener("DOMContentLoaded", () => {
  renderOrders();


  const searchInput = document.querySelector(".filters input");
  searchInput.addEventListener("input", () => {
    renderOrders(searchInput.value.trim());
  });


  const statusFilter = document.querySelector(".filters select");
  statusFilter.addEventListener("change", () => {
    renderOrders(searchInput.value.trim());
  });
});


function renderOrders(searchTerm = "") {
  const tableBody = document.querySelector(".orders-table tbody");
  const selectedStatus = document.querySelector(".filters select").value;

  tableBody.innerHTML = "";

  const filteredOrders = orders.filter(order => {
    const matchStatus = selectedStatus ? order.status === selectedStatus : true;
    const matchSearch =
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase());

    return matchStatus && matchSearch;
  });

  if (filteredOrders.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; color:#999;">
           لا توجد طلبات مطابقة للبحث أو الفلترة
        </td>
      </tr>`;
    return;
  }

  filteredOrders.forEach(order => {
    const statusClass =
      order.status === "جديد" ? "new" :
      order.status === "قيد المعالجة" ? "processing" :
      "delivered";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.product}</td>
      <td>${order.quantity}</td>
      <td><span class="status ${statusClass}">${order.status}</span></td>
      <td>${order.date}</td>
      <td><button class="action-btn">عرض</button></td>
    `;
    tableBody.appendChild(row);

  
    row.querySelector(".action-btn").addEventListener("click", () => {
      const existingDetailsRow = row.nextElementSibling;
      if (existingDetailsRow && existingDetailsRow.classList.contains("details-row")) {
        existingDetailsRow.remove(); 
        return;
      }

      const detailsRow = document.createElement("tr");
      detailsRow.classList.add("details-row");
      detailsRow.innerHTML = `
        <td colspan="7">
          <div class="details-box">
            <p><strong>رقم الطلب:</strong> ${order.id}</p>
            <p><strong>العميل:</strong> ${order.customer}</p>
            <p><strong>المنتج:</strong> ${order.product}</p>
            <p><strong>الكمية:</strong> ${order.quantity}</p>
            <p><strong>تاريخ الطلب:</strong> ${order.date}</p>
            <label><strong>تعديل الحالة:</strong></label>
            <select class="status-select">
              <option value="جديد" ${order.status === "جديد" ? "selected" : ""}>جديد</option>
              <option value="قيد المعالجة" ${order.status === "قيد المعالجة" ? "selected" : ""}>قيد المعالجة</option>
              <option value="تم التوصيل" ${order.status === "تم التوصيل" ? "selected" : ""}>تم التوصيل</option>
            </select>
            <button class="save-status-btn">حفظ</button>
          </div>
        </td>
      `;
      row.after(detailsRow);

    
      detailsRow.querySelector(".save-status-btn").addEventListener("click", () => {
        const newStatus = detailsRow.querySelector(".status-select").value;
        order.status = newStatus;
        localStorage.setItem("orders", JSON.stringify(orders));
        renderOrders(searchTerm); 
      });
    });
  });
  
}
