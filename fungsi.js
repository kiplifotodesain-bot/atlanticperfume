// === FUNGSI KERANJANG BELANJA — ATLANTIC PERFUME ===

let keranjang = [];
// Nomor tujuan: Keranjang → Admin Kasir | Info → Toko
const NOMOR_ADMIN_KASIR = "6285141281833";  // Untuk pesanan dari keranjang
const NOMOR_TOKO        = "6289676100177";  // Untuk halaman Info Toko

// Buka & Tutup Menu
function bukaMenu(){
  document.getElementById('menuKotak').style.right = '0';
  document.getElementById('menuLatar').style.display = 'block';
}
function tutupMenu(){
  document.getElementById('menuKotak').style.right = '-300px';
  document.getElementById('menuLatar').style.display = 'none';
}

// Buka & Tutup Keranjang
function bukaKeranjang(){
  document.getElementById('latarKeranjang').style.display = 'flex';
  renderKeranjang();
}
function tutupKeranjang(){
  document.getElementById('latarKeranjang').style.display = 'none';
}

// Buka & Tutup Form Data Pemesan
function bukaFormPesanan(){
  tutupKeranjang();
  document.getElementById('latarForm').style.display = 'flex';
  document.getElementById('ringkasPesanan').textContent = ringkasPesananTeks();
}
function tutupForm(){
  document.getElementById('latarForm').style.display = 'none';
}

// Tambah Produk ke Keranjang
function tambahKeKeranjang(nama, harga){
  keranjang.push({nama, harga});
  perbaruiJumlah();
  alert(`✅ Anda menambahkan item:\n${nama}\n\nTekan Oke jika setuju.`);
}

// Hapus 1 Barang
function hapusItem(index){
  keranjang.splice(index, 1);
  perbaruiJumlah();
  renderKeranjang();
}

// Kosongkan Semua
function kosongkanKeranjang(){
  if(confirm('Yakin mengosongkan keranjang?')){
    keranjang = [];
    perbaruiJumlah();
    renderKeranjang();
  }
}

// Perbarui Angka di Ikon Keranjang
function perbaruiJumlah(){
  document.getElementById('jumlahItem').textContent = keranjang.length;
}

// Hitung Total Harga
function hitungTotal(){
  return keranjang.reduce((jumlah, item) => jumlah + item.harga, 0);
}

// Tampilkan Isi Keranjang
function renderKeranjang(){
  const elIsi = document.getElementById('isiKeranjang');
  const elTotal = document.getElementById('totalKeranjang');
  const elTombol = document.getElementById('tombolKeranjang');

  if(keranjang.length === 0){
    elIsi.innerHTML = '<p style="color:#666;text-align:center;padding:20px">Keranjang masih kosong</p>';
    elTotal.textContent = '';
    elTombol.style.display = 'none';
    return;
  }

  let html = '';
  keranjang.forEach((item, i) => {
    html += `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #eee">
      <div>
        <div style="font-weight:bold">${item.nama}</div>
        <div style="color:#555">Rp ${item.harga.toLocaleString('id-ID')}</div>
      </div>
      <button onclick="hapusItem(${i})" style="background:#ff4444;color:#fff;border:none;border-radius:4px;padding:4px 8px;cursor:pointer">✕</button>
    </div>`;
  });

  elIsi.innerHTML = html;
  const total = hitungTotal();
  elTotal.innerHTML = `TOTAL: Rp ${total.toLocaleString('id-ID')}`;
  elTombol.style.display = 'flex';
}

// Susun Ringkasan Pesanan untuk Form
function ringkasPesananTeks(){
  let teks = '📋 RINGKASAN PESANAN:\n';
  keranjang.forEach((item, i) => {
    teks += `${i+1}. ${item.nama} — Rp ${item.harga.toLocaleString('id-ID')}\n`;
  });
  teks += `━━━━━━━━━━━━━━━\nTOTAL: Rp ${hitungTotal().toLocaleString('id-ID')}`;
  return teks;
}

// Kirim Pesanan ke ADMIN KASIR — dari Keranjang
function kirimKeWhatsApp(){
  const nama = document.getElementById('namaPemesan').value.trim();
  const alamat = document.getElementById('alamatPemesan').value.trim();
  const catatan = document.getElementById('catatanPemesan').value.trim();

  if(!nama){ alert('⚠️ Silakan tulis Nama Pemesan!'); return; }
  if(!alamat){ alert('⚠️ Silakan tulis Alamat Lengkap!'); return; }

  let pesan = '🔔 PESANAN BARU — ATLANTIC PERFUME\n';
  pesan += '═══════════════════════════\n';
  pesan += ringkasPesananTeks() + '\n';
  pesan += '═══════════════════════════\n';
  pesan += `👤 Nama: ${nama}\n`;
  pesan += `📍 Alamat: ${alamat}\n`;
  if(catatan) pesan += `📝 Catatan: ${catatan}\n`;
  pesan += '═══════════════════════════\n';
  pesan += 'Terima kasih atas pesanan Anda. Kami akan segera memprosesnya! 🙏';

  // ⚠️ PESANAN DIKIRIM KE NOMOR ADMIN KASIR
  const url = `https://wa.me/${NOMOR_ADMIN_KASIR}?text=${encodeURIComponent(pesan)}`;
  window.open(url, '_blank');
}
  
