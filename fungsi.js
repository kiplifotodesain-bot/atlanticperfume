// ==========================================
//   ⚙️ MESIN KASIR ATLANTIC PERFUME — LENGKAP
//   ✅ KERANJANG + HITUNG HARGA + DISKON OTOMATIS
// ==========================================

let keranjang = [];

// === BUKA/TUTUP MENU ===
function bukaMenu() { document.getElementById('menuKotak').style.right = '0'; }
function tutupMenu() { document.getElementById('menuKotak').style.right = '-300px'; }

// === BUKA/TUTUP KERANJANG ===
function bukaKeranjang() { document.getElementById('latarKeranjang').style.display = 'flex'; renderKeranjang(); }
function tutupKeranjang() { document.getElementById('latarKeranjang').style.display = 'none'; }

// === BUKA/TUTUP FORM PESANAN ===
function bukaFormPesanan() { tutupKeranjang(); document.getElementById('latarForm').style.display = 'flex'; }
function tutupFormPesanan() { document.getElementById('latarForm').style.display = 'none'; }

// === TAMBAH PRODUK KE KERANJANG ===
function tambahKeKeranjang(kode, nama, harga) {
  const ada = keranjang.find(item => item.kode === kode);
  if (ada) {
    ada.jumlah++;
  } else {
    keranjang.push({ kode, nama, harga, jumlah: 1 });
  }
  perbaruiAngkaKeranjang();
  alert(`✅ Ditambahkan: ${nama}`);
}

// === UBAH JUMLAH DI KERANJANG ===
function ubahJumlah(index, selisih) {
  keranjang[index].jumlah += selisih;
  if (keranjang[index].jumlah <= 0) keranjang.splice(index, 1);
  perbaruiAngkaKeranjang();
  renderKeranjang();
}

// === HAPUS SATU ITEM ===
function hapusItem(index) {
  keranjang.splice(index, 1);
  perbaruiAngkaKeranjang();
  renderKeranjang();
}

// === KOSONGKAN SEMUA KERANJANG ===
function kosongkanKeranjang() {
  if (confirm('Yakin mengosongkan keranjang?')) {
    keranjang = [];
    perbaruiAngkaKeranjang();
    renderKeranjang();
  }
}

// === PERBARUI ANGKA DI ICON KERANJANG ===
function perbaruiAngkaKeranjang() {
  const el = document.getElementById('angkaKeranjang');
  if (el) el.textContent = keranjang.reduce((jml, item) => jml + item.jumlah, 0);
}

// === ATURAN DISKON OTOMATIS ===
function hitungDiskon(jumlahItem, totalHarga) {
  let persenDiskon = 0;
  let keterangan = "Tanpa Diskon";

  if (jumlahItem >= 20) {
    persenDiskon = 15;
    keterangan = "🎉 Beli 20+ → Diskon 15%";
  } else if (jumlahItem >= 10) {
    persenDiskon = 10;
    keterangan = "🎁 Beli 10+ → Diskon 10%";
  } else if (jumlahItem >= 5) {
    persenDiskon = 5;
    keterangan = "✨ Beli 5+ → Diskon 5%";
  }

  return { persenDiskon, keterangan };
}

// === TAMPILAN KERANJANG DENGAN DISKON ===
function renderKeranjang() {
  const isi = document.getElementById('isiKeranjang');
  const tombolEl = document.getElementById('tombolKeranjang');

  if (keranjang.length === 0) {
    isi.innerHTML = "<p style='color:#aaa;text-align:center;padding:20px'>Keranjang masih kosong</p>";
    tombolEl.style.display = 'none';
    return;
  }

  let html = "";
  let total = 0;
  let jumlahItem = keranjang.length;

  keranjang.forEach((item, i) => {
    total += item.harga * item.jumlah;
    html += `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #2a3f66">
        <div>
          <div style="font-weight:bold">${item.nama}</div>
          <div style="font-size:13px;color:#ccc">Rp ${item.harga.toLocaleString('id-ID')} × ${item.jumlah}</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:bold">Rp ${(item.harga * item.jumlah).toLocaleString('id-ID')}</div>
          <button onclick="ubahJumlah(${i},-1)" style="border:none;background:#2a3f66;color:#fff;padding:2px 7px;border-radius:3px;cursor:pointer;margin:0 2px">−</button>
          <button onclick="ubahJumlah(${i},+1)" style="border:none;background:#2a3f66;color:#fff;padding:2px 6px;border-radius:3px;cursor:pointer;margin:0 2px">+</button>
          <button onclick="hapusItem(${i})" style="border:none;background:#ff4444;color:#fff;padding:2px 5px;border-radius:3px;cursor:pointer;margin:0 2px">✕</button>
        </div>
      </div>`;
  });

  // Hitung Diskon
  const diskonInfo = hitungDiskon(jumlahItem, total);
  const potongan = Math.round(total * diskonInfo.persenDiskon / 100);
  const totalAkhir = total - potongan;

  // Simpan total untuk dipakai saat kirim pesan
  window.totalAkhirPesanan = totalAkhir;

  // Tampilkan Rincian
  html += `
    <hr style="margin:12px 0;border:none;border-top:1px dashed #446">
    <div style="display:flex;justify-content:space-between;padding:4px 0">
      <span>💰 Harga Awal:</span>
      <span>Rp ${total.toLocaleString('id-ID')}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:4px 0;color:#9f9;font-weight:bold">
      <span>🏷️ ${diskonInfo.keterangan}:</span>
      <span>− Rp ${potongan.toLocaleString('id-ID')}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:10px 0;border-top:2px solid #fff;font-size:17px;color:#ffd700;font-weight:bold;margin-top:4px">
      <span>✅ TOTAL BAYAR:</span>
      <span>Rp ${totalAkhir.toLocaleString('id-ID')}</span>
    </div>`;

  isi.innerHTML = html;
  tombolEl.style.display = 'flex';
}

// === KIRIM PESANAN KE WHATSAPP ===
function kirimPesanan() {
  const nama = document.getElementById('namaPemesan').value.trim();
  const alamat = document.getElementById('alamatPemesan').value.trim();
  const catatan = document.getElementById('keteranganPesanan').value.trim();

  if (!nama || !alamat) {
    alert('⚠️ Silakan isi Nama dan Alamat lengkap!');
    return;
  }

  if (keranjang.length === 0) {
    alert('⚠️ Keranjang masih kosong!');
    return;
  }

  let teks = `🛒 PESANAN ATLANTIC PERFUME\n\n`;
  teks += `👤 Nama: ${nama}\n`;
  teks += `📍 Alamat: ${alamat}\n`;
  if (catatan) teks += `📝 Catatan: ${catatan}\n`;
  teks += `────────────────────\n`;

  keranjang.forEach(item => {
    teks += `• ${item.nama} — ${item.jumlah} bh × Rp ${item.harga.toLocaleString('id-ID')}\n`;
  });

  const total = keranjang.reduce((jml, item) => jml + (item.harga * item.jumlah), 0);
  const jumlahItem = keranjang.length;
  const diskonInfo = hitungDiskon(jumlahItem, total);
  const potongan = Math.round(total * diskonInfo.persenDiskon / 100);
  const totalAkhir = total - potongan;

  teks += `────────────────────\n`;
  teks += `💰 Harga Awal: Rp ${total.toLocaleString('id-ID')}\n`;
  if (potongan > 0) teks += `🏷️ Diskon: − Rp ${potongan.toLocaleString('id-ID')} (${diskonInfo.persenDiskon}%)\n`;
  teks += `✅ TOTAL BAYAR: Rp ${totalAkhir.toLocaleString('id-ID')}\n\n`;
  teks += `Terima kasih atas pesanannya! 🙏`;

  // Nomor WA Kasir (admin)
  const nomorWA = '6285141281833';
  const link = `https://wa.me/${nomorWA}?text=${encodeURIComponent(teks)}`;

  // Buka WhatsApp, lalu kosongkan keranjang & kembalikan ke atas
  window.open(link, '_blank');
  keranjang = [];
  perbaruiAngkaKeranjang();
  tutupFormPesanan();
  window.scrollTo(0, 0);
}
