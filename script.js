// Sistem Tanggal Dan Jam
function updateTime() {
  const now = new Date();
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const date = now.toLocaleDateString("id-ID", options);
  const time = now.toLocaleTimeString("id-ID");

  document.getElementById("currentDate").textContent = date;
  document.getElementById("currentTime").textContent = time;
}

updateTime();
setInterval(updateTime, 1000); // Update setiap detik

// Sistem Table
document.addEventListener("DOMContentLoaded", function () {
  const table = document.querySelector("table");
  const no_data = document.querySelector(".no-data");

  if (table.rows.length <= 1) {
    // Jumlah baris tabel kurang dari atau sama dengan 1 (hanya header)
    const message = document.createElement("p");
    message.textContent = "Data tidak ada";
    message.setAttribute("colspan", "8"); // Menambahkan atribut colspan
    no_data.appendChild(message);
  }
});

//Punya Lutfi
var productsearchdata = [];
document.addEventListener("turbo:load", function () {
  var timer;
  $(".searchProductInput").keyup(function (e) {
    if (e.key !== "Enter" || e.keyCode !== 13) {
      clearTimeout(timer);
      var ms = 100; // milliseconds
      var val = this.value;
      timer = setTimeout(function () {
        searchProduct(val);
      }, ms);
    }
  });
});

function add_to_cart(e) {
  let data = productsearchdata.find((r) => r.id == ($(e).attr("data-id") || e));
  data.product_discount = 0;
  data.product_cut_price = 0;
  console.log("add:", {
    data,
  });

  let c_apc = $("#customer").attr("data-additionalpricecategory");
  selected_product_data.push({
    ...data,
    product_quantity: 1,
    product_price:
      data.additional_prices.find(
        (r) =>
          r.additional_price_category_id == c_apc &&
          r.additional_price_unit_id == data.unit_id
      )?.additional_price || data?.product_sell_price,
  });
  const product_modal = document.querySelector("#productModal");
  const modal = bootstrap.Modal.getInstance(product_modal);

  refresh_cart_list();
}

function add_promo(e) {
  console.log(e);
}

function searchProduct(val) {
  $.ajax({
    type: "POST",
    url: "https://poslite.bizkit.id/dashboard/product/selectajax",
    data: {
      // "type": "check"
      search: val,
      page: 1,
      // outlet_id: '',
      saleable: 1,
    },
    success: function (response) {
      $(".search_product_list").html("");
      productsearchdata = response.data;

      response.data.map((r, i) =>
        $(".search_product_list").append(`
                              <tr class="lgi">
                                      <td>${r.product_code || "-"}</td>
                                      <td>${r.product_name}</td>
                                      <td class="text-end">${formatNumber(
                                        r.product_sell_price
                                      )}</td>
                                      <td class="text-end">${r.product_stock} ${
          r.unit?.unit_name
        }</td>
                                      <td class="text-end"><button data-id="${
                                        r.id
                                      }"  onclick="add_to_cart(this)" class="add-product">+</button></td>
                                  </tr>
                                  `)
      );
      // $('#productdataTable').DataTable({
      //     "lengthChange": false,
      //     language: {
      //         searchPlaceholder: "Masukkan ID Item atau scan barcode"
      //     }
      // });
    },
  });
}

document.addEventListener("turbo:load", function () {
  $.ajax({
    type: "POST",
    url: "https://poslite.bizkit.id/dashboard/product/selectajax",
    data: {
      // "type": "check"
      search: null,
      page: 1,
      // outlet_id: '',
      saleable: 1,
    },
    success: function (response) {
      $(".search_product_list").html("");
      productsearchdata = response.data;
      response.data.map((r, i) =>
        $(".search_product_list").append(`
                              <tr class="lgi">
                                      <td>${r.product_code || "-"}</td>
                                      <td>${r.product_name}</td>
                                      <td class="text-end">${formatNumber(
                                        r.product_sell_price
                                      )}</td>
                                      <td class="text-end">${r.product_stock} ${
          r.unit?.unit_name
        }</td>
                                      <td class="text-end"><button data-id="${
                                        r.id
                                      }"  onclick="add_to_cart(this)" class="add-product">+</button></td>
                                  </tr>
                                  `)
      );
    },
  });
});

//Punya Lutfi 2
var customersearchdata = [];
document.addEventListener("turbo:load", function () {
  var timer;
  $(".searchCustomerInput").keyup(function (e) {
    if (e.key !== "Enter" || e.keyCode !== 13) {
      clearTimeout(timer);
      var ms = 100; // milliseconds
      var val = this.value;
      timer = setTimeout(function () {
        searchCustomer(val);
      }, ms);
    }
  });
});

function change_customer(e) {
  let data = customersearchdata.find((r) => r.id == $(e).attr("data-id"));
  $(".customer_name_label").html(data.customer_name);
  $("#customer").val(data.id);
  $("#customer").attr(
    "data-additionalpricecategory",
    data.additional_price_category_id
  );
  let c_apc = data.additional_price_category_id;

  selected_product_data = selected_product_data.map((r) => {
    let ori_price =
      r?.all_unit.find((r2) => r2.id == (r?.selected_unit || r?.unit_id))
        ?.product_sell_price || r?.product_sell_price;

    let price =
      r.additional_prices.find(
        (r2) =>
          r2.additional_price_category_id == c_apc &&
          r2.additional_price_unit_id == (r?.selected_unit || r?.unit_id)
      )?.additional_price ||
      ori_price ||
      0;
    console.log({
      c_apc,
      additional_prices: r.additional_prices,
      selected_unit: r?.selected_unit || r?.unit_id,
      ori_price,
      price,
    });
    let pqty = parseInt(r?.product_quantity || 0);
    let ptotal = pqty * (price || 0);
    let product_disc_total =
      (ptotal * parseInt(r?.product_discount || 0)) / 100;
    let convertion_selected = parseFloat(
      r?.all_unit
        ? r?.all_unit.find((r2) => r2.id == (r?.selected_unit || r?.unit_id))
            ?.convertion
        : 1
    );
    return {
      ...r,
      product_id: parseInt(r.id),
      id: parseInt(r.id),
      product_total: ptotal - product_disc_total - (r.cut_price || 0),
      product_quantity_clean: pqty * convertion_selected,
      product_price: price,
    };
  });

  const customer_modal = document.querySelector("#customerModal");
  const modal = bootstrap.Modal.getInstance(customer_modal);
  modal.hide();
  refresh_cart_list();
}

function searchCustomer(val) {
  $.ajax({
    type: "POST",
    url: "https://poslite.bizkit.id/dashboard/customer/selectajax",
    data: {
      // "type": "check"
      search: val,
      page: 1,
      // outlet_id: '',
      saleable: 1,
    },
    success: function (response) {
      $(".search_customer_list").html("");
      customersearchdata = response.data;
      response.data.map((r) => {
        $(".search_customer_list").append(`
                  <tr  class="lgi">
                          <td>${r.id}</td>
                          <td>${r.customer_name}</td>
                          <td class="text-end">${r.customer_address || "-"}</td>
                          <td class="text-end"><button data-id="${
                            r.id
                          }"  onclick="change_customer(this)" class="add-product">+</button></td>
                      </tr>
                      `);
      });
    },
    // $('#productdataTable').DataTable({
    //     "lengthChange": false,
    //     language: {
    //         searchPlaceholder: "Masukkan ID Item atau scan barcode"
    //     }
    // });
  });
}

document.addEventListener("turbo:load", function () {
  $.ajax({
    type: "POST",
    url: "https://poslite.bizkit.id/dashboard/customer/selectajax",
    data: {
      // "type": "check"
      search: null,
      page: 1,
      // outlet_id: '',
      saleable: 1,
    },
    success: function (response) {
      $(".search_customer_list").html("");
      customersearchdata = response.data;

      response.data.map((r) => {
        $(".search_customer_list").append(`
                  <tr class="lgi">
                          <td>${r.id}</td>
                          <td>${r.customer_name}</td>
                          <td class="text-end">${r.customer_address || "-"}</td>
                          <td class="text-end"><button data-id="${
                            r.id
                          }"  onclick="change_customer(this)" class="add-product">+</button></td>
                      </tr>
                      `);
      });
    },
  });
});
