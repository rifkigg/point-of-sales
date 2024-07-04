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


//sistem modal
const myModal = document.getElementById("myModal");
const myInput = document.getElementById("myInput");

myModal.addEventListener("shown.bs.modal", () => {
  myInput.focus();
});

