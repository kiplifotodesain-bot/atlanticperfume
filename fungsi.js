// ==========================================
//  FUNGSI KERANJANG — PRODUK TETAP MUNCUL ✅
// ==========================================

let keranjang = [];
const WA_NOMOR = "6289676100177";

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

// === TAMBAH KE KERANJANG ===
function tambahKeKeranjang(nama, harga){
  keranjang.push({nama, harga});
  perbaruiJumlah();
  tampilkanKeranjang();
}

// === PERBARUI ANGKA ICON ===
function perbaruiJumlah(){
  document.getElementById('jumlahItem').textContent = keranjang.length;
}

// === TAMPILAN KERANJANG ===
function tampilkanKeranjang(){
  const el = document.getElementById('isiKeranjang');
  const tombol = document.getElementById('tombolKeranjang');
  if(keranjang.length === 0){
    el.innerHTML = "<p style='text-align:center;color:#666;padding:15px'>Keranjang masih kosong</p>";
    tombol.style.display = 'none';
    return;
  }
  let total = 0, html = "";
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

// === BUKA FORM PESANAN ===
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

// === TUTUP FORM ===
function tutupForm(){
  document.getElementById('latarForm').style.display = 'none';
}

// ✅ KIRIM KE WA + KERANJANG KOSONG OTOMATIS
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
  perbaruiJumlah();
  tutupForm();
  tampilkanKeranjang();

  // ✅ BUKA WHATSAPP
  const url = "https://wa.me/" + WA_NOMOR + "?text=" + encodeURIComponent(pesan);
  window.open(url, '_blank');
}
