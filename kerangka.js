// === KERANGKA TAMPILAN — ATLANTIC PERFUME ===

// Tampilkan produk ke halaman
function tampilkanProduk(daftar) {
  const wadah = document.getElementById('isiTabel');
  if (!wadah) return;
  
  let html = '';
  daftar.forEach(p => {
    html += `<tr class="baris-produk" onclick="bukaAroma('${p.nama}','${p.atas}','${p.tengah}','${p.bawah}')">
      <td>${p.kode}</td>
      <td>${p.nama}</td>
      <td>${p.harga.toLocaleString('id-ID')}</td>
      <td style="text-align:center" onclick="event.stopPropagation()">
        <button class="btn-beli" onclick="tambahKeKeranjang('${p.kode}','${p.nama.replace(/'/g,"\\'")}',${p.harga})">+</button>
      </td>
    </tr>`;
  });
  wadah.innerHTML = html;
}

// Buka-tutup keterangan wangi
function bukaAroma(nama, atas, tengah, bawah) {
  document.getElementById('namaProdukModal').textContent = nama;
  document.getElementById('aromaAtas').textContent = atas;
  document.getElementById('aromaTengah').textContent = tengah;
  document.getElementById('aromaBawah').textContent = bawah;
  document.getElementById('modalAroma').style.display = 'flex';
}
function tutupAroma() {
  document.getElementById('modalAroma').style.display = 'none';
}

// Buka-tutup menu
function bukaMenu() { document.getElementById('menuKotak').style.right = '0'; }
function tutupMenu() { document.getElementById('menuKotak').style.right = '-300px'; }

// Gabungkan semua data produk lalu tampilkan
window.onload = function() {
  if (typeof dataProduk !== 'undefined') {
    tampilkanProduk(dataProduk);
  }
};
  
