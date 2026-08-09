// ==========================================
//  FUNGSI KERANJANG — SUDAH DIPERBAIKI ✅
// ==========================================

let keranjang = [];
const WA_NOMOR = "6289676100177"; // Nomor WhatsApp tanpa tanda + dan spasi

// === BUKA TUTUP MENU ===
function bukaMenu(){
  document.getElementById('menuKotak').style.right = '0';
  document.getElementById('menuLatar').style.display = 'block';
}
function tutupMenu(){
  document.getElementById('menuKotak').style.right = '-300px';
  document.getElementById('menuLatar').style.display = 'none';
}

// === BUKA TUTUP KERANJANG ===
function bukaKeranjang(){
  document.getElementById('latarKeranjang').style.display = 'flex';
  tampilkanKeranjang();
}
function tutupKeranjang(){
  document.getElementById('latarKeranjang').style.display = 'none';
}

// === TAMBAH PRODUK KE KERANJANG ===
function tambahKeKeranjang(nama, harga){
  keranjang.push({nama, harga});
  perbaruiJumlah();
  tampilkanKeranjang();
}

// === PERBARUI ANGKA DI ICON KERANJANG ===
function perbaruiJumlah(){
  document.getElementById('jumlahItem').textContent = keranjang.length;
}

// === TAMPILKAN ISI KERANJANG ===
function tampilkanKeranjang(){
  const el = document.getElementById('isiKeranjang');
  const tombol = document.getElementById('tombolKeranjang');
  
  if(keranjang.length === 0){
    el.innerHTML = "<p style='text-align:center;color:#666;padding:15px'>Keranjang masih kosong</p>";
    tombol.style.display = 'none';
    return;
  }

  let total = 0;
  let html = "";
  keranjang.forEach((p, i) => {
    total += p.harga;
    html += `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #eee">
      <span style="flex:1">${p.nama}</span>
      <span style="min-width:100px;text-align:right">Rp ${p.harga.toLocaleString('id-ID')}</span>
      <button onclick="hapusItem(${i})" style="margin-left:8px;background:#ff4444;color:#fff;border:none;border-radius:3px;cursor:pointer;padding:2px 6px">✕</button>
    </div>`;
  });

  el.innerHTML = html;
  document.getElementById('totalKeranjang').innerHTML = `Total: Rp ${total.toLocaleString('id-ID')}`;
  tombol.style.display = 'flex';
}

// === HAPUS SATU ITEM ===
function hapusItem(index){
  keranjang.splice(index, 1);
  perbaruiJumlah();
  tampilkanKeranjang();
}

// === KOSONGKAN KERANJANG ===
function kosongkanKeranjang(){
  if(keranjang.length === 0) return;
  if(confirm('Yakin mengosongkan keranjang?')){
    keranjang = [];
    perbaruiJumlah();
    tampilkanKeranjang();
  }
}

// === BUKA FORM DATA PEMESANAN ===
function bukaFormPesanan(){
  tutupKeranjang();
  document.getElementById('latarForm').style.display = 'flex';
  
  let ringkas = "📋 RINGKASAN PESANAN:\n";
  let total = 0;
  keranjang.forEach(p => {
    ringkas += `• ${p.nama} — Rp ${p.harga.toLocaleString('id-ID')}\n`;
    total += p.harga;
  });
  ringkas += `━━━━━━━━━━━━━\nTOTAL: Rp ${total.toLocaleString('id-ID')}`;
  document.getElementById('ringkasPesanan').textContent = ringkas;
}

// === TUTUP FORM PESANAN ===
function tutupForm(){
  document.getElementById('latarForm').style.display = 'none';
}

// ✅ KIRIM KE WHATSAPP + KOSONGKAN KERANJANG SEKETIKA ITU JUGA!
function kirimKeWhatsApp(){
  const nama = document.getElementById('namaPemesan').value.trim();
  const alamat = document.getElementById('alamatPemesan').value.trim();
  const catatan = document.getElementById('catatanPemesan').value.trim();

  if(!nama || !alamat){
    alert('⚠️ Isi Nama dan Alamat lengkap terlebih dahulu!');
    return;
  }

  let total = 0;
  let pesan = "🛒 PESANAN ATLANTIC PERFUME\n";
  pesan += "═══════════════════════\n";
  pesan += "📦 BARANG DIPESAN:\n";
  keranjang.forEach(p => {
    pesan += `• ${p.nama} — Rp ${p.harga.toLocaleString('id-ID')}\n`;
    total += p.harga;
  });
  pesan += "═══════════════════════\n";
  pesan += `💰 TOTAL: Rp ${total.toLocaleString('id-ID')}\n`;
  pesan += "═══════════════════════\n";
  pesan += `👤 NAMA: ${nama}\n`;
  pesan += `📍 ALAMAT: ${alamat}\n`;
  if(catatan) pesan += `📝 CATATAN: ${catatan}\n`;
  pesan += "\n——— Terima Kasih ———";

  // ✅ SEBELUM BUKA WA → KERANJANG DIKOSONGKAN DULU!
  keranjang = [];
  perbaruiJumlah(); // Angka kembali 0
  tutupForm(); // Tutup form
  tampilkanKeranjang(); // Tampilan keranjang diperbarui jadi kosong

  // ✅ BUKA WHATSAPP
  const url = "https://wa.me/" + WA_NOMOR + "?text=" + encodeURIComponent(pesan);
  window.open(url, '_blank');

  // ✅ Halaman TETAP DI TEMPAT, tidak bergeser ke atas
}

// === ISI DATA KE HALAMAN PRODUK ===
function isiHalaman(namaKelompok){
  if(typeof data === 'undefined' || !data[namaKelompok]){
    const tbody = document.getElementById('isiTabel');
    if(tbody) tbody.innerHTML = `<tr><td colspan="4" style="color:red;text-align:center;padding:20px">❌ Data tidak ditemukan!</td></tr>`;
    return;
  }

  const k = data[namaKelompok];
  const judul = document.getElementById('namaKelompok');
  const tbody = document.getElementById('isiTabel');
  
  if(judul) judul.textContent = k.nama;
  if(!tbody) return;

  let html = '';
  k.produk.forEach(p => {
    html += `<tr style="cursor:pointer">
      <td>${p.nama}</td>
      <td>${p.desk}</td>
      <td>Rp ${p.harga.toLocaleString('id-ID')}</td>
      <td><button class="btn-beli" onclick="tambahKeKeranjang('${p.nama.replace(/'/g,"\\'")}', ${p.harga})">+</button></td>
    </tr>`;
  });
  tbody.innerHTML = html;
    }
