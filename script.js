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
  const tambah = document.getElementById("tambah");
  const kurang = document.getElementById("kurang");

  if (table.rows.length <= 1) {
    // Jumlah baris tabel kurang dari atau sama dengan 1 (hanya header)
    const message = document.createElement("p");
    message.textContent = "Data tidak ada";
    message.setAttribute("colspan", "8"); // Menambahkan atribut colspan
    no_data.appendChild(message);
  }
});

// document.getElementById("tambah").addEventListener("click", function () {
//   let nilai = parseInt(document.getElementById("nilai").textContent);
//   nilai += 1;
//   document.getElementById("nilai").textContent = nilai;
// });

// document.getElementById("minus").addEventListener("click", function () {
//   let nilai = parseInt(document.getElementById("nilai").textContent);
//   nilai -= 1;
//   document.getElementById("nilai").textContent = nilai;
// });

// Ambil nilai awal dari local storage atau set ke 0 jika tidak ada
let nilai = parseInt(localStorage.getItem("nilai")) || 0;
const harga = parseInt(document.getElementById("harga").textContent) || 1000; // Harga per item, default 1000

// Fungsi untuk update nilai dan total
function updateNilaiAndTotal() {
  // Update nilai
  document.getElementById("nilai").textContent = nilai;

  // Hitung total
  const total = nilai * harga;
  localStorage.setItem("total", total); // Simpan total ke local storage

  // Format total to Indonesian Rupiah
  const formattedTotal = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(total).replace("Rp", "");

  // Ambil semua elemen dengan id total
  const totalElements = document.querySelectorAll("#total");

  // Ubah isi dari setiap elemen dengan id total menjadi isi dari variable total yang diformat
  totalElements.forEach(element => {
    element.textContent = formattedTotal;
  });
}

// Tambah event listener untuk tombol tambah
document.getElementById("tambah").addEventListener("click", function () {
  nilai += 1;
  localStorage.setItem("nilai", nilai); // Simpan nilai ke local storage
  updateNilaiAndTotal();
});

// Tambah event listener untuk tombol kurang
document.getElementById("kurang").addEventListener("click", function () {
  nilai -= 1;
  localStorage.setItem("nilai", nilai); // Simpan nilai ke local storage
  updateNilaiAndTotal();
});

// Panggil fungsi update saat halaman dimuat
updateNilaiAndTotal();

//sistem modal
const myModal = document.getElementById("myModal");
const myInput = document.getElementById("myInput");

myModal.addEventListener("shown.bs.modal", () => {
  myInput.focus();
});

// Ambil harga dari tag HTML dan format ke dalam Rupiah
// const hargaElement = document.getElementById("harga");
// const hargaValue = parseInt(hargaElement.textContent) || 1000;
// hargaElement.textContent = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(hargaValue).replace("Rp", "");
