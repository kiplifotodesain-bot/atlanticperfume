// ==========================================
//   ⚙️ MESIN KASIR ATLANTIC PERFUME — LENGKAP
//   ✅ KERANJANG + HARGA + DISKON PER PRODUK
//   📌 BELI 2 SAMA → DISKON 5% | BELI 5 SAMA → DISKON 10%
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

// === ATURAN DISKON: PER JENIS PRODUK YANG SAMA ===
// Beli ≥ 2 → Diskon 5% | Beli ≥ 5 → Diskon 10%
function hitungDiskonPerProduk(keranjang) {
  let totalPotongan = 0;
  let rincianDiskon = [];

  keranjang.forEach(item => {
    const jumlah = item.jumlah;
    let persen = 0;
    let keterangan = "";

    if (jumlah >= 5) {
      persen = 10;
      keterangan = `${item.nama}: ${jumlah} bh → Diskon 10%`;
    } else if (jumlah >= 2) {
      persen = 5;
      keterangan = `${item.nama}: ${jumlah} bh → Diskon 5%`;
    }

    if (persen > 0) {
      const subtotal = item.harga * jumlah;
      const potongan = Math.round(subtotal * persen / 100);
      totalPotongan += potongan;
      rincianDiskon.push({ keterangan, potongan });
    }
  });

  return { totalPotongan, rincianDiskon };
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
  let totalHargaAwal = 0;

  keranjang.forEach((item, i) => {
    const subtotal = item.harga * item.jumlah;
    totalHargaAwal += subtotal;
    html += `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #2a3f66">
        <div>
          <div style="font-weight:bold">${item.nama}</div>
          <div style="font-size:13px;color:#ccc">Rp ${item.harga.toLocaleString('id-ID')} × ${item.jumlah}</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:bold">Rp ${subtotal.toLocaleString('id-ID')}</div>
          <button onclick="ubahJumlah(${i},-1)" style="border:none;background:#2a3f66;color:#fff;padding:2px 7px;border-radius:3px;cursor:pointer;margin:0 2px">−</button>
          <button onclick="ubahJumlah(${i},+1)" style="border:none;background:#2a3f66;color:#fff;padding:2px 6px;border-radius:3px;cursor:pointer;margin:0 2px">+</button>
          <button onclick="hapusItem(${i})" style="border:none;background:#ff4444;color:#fff;padding:2px 5px;border-radius:3px;cursor:pointer;margin:0 2px">✕</button>
        </div>
      </div>`;
  });

  // Hitung Diskon
  const { totalPotongan, rincianDiskon } = hitungDiskonPerProduk(keranjang);
  const totalBayar = totalHargaAwal - totalPotongan;

  // Simpan untuk dikirim ke WhatsApp
  window.dataPesanan = { totalHargaAwal, totalPotongan, totalBayar, rincianDiskon };

  // Tampilkan Rincian
  html += `<hr style="margin:12px 0;border:none;border-top:1px dashed #446">`;

  // Tampilkan Harga Awal
  html += `
    <div style="display:flex;justify-content:space-between;padding:4px 0">
      <span>💰 Harga Awal:</span>
      <span>Rp ${totalHargaAwal.toLocaleString('id-ID')}</span>
    </div>`;

  // Tampilkan Diskon per produk
  if (rincianDiskon.length > 0) {
    rincianDiskon.forEach(d => {
      html += `
        <div style="display:flex;justify-content:space-between;padding:3px 0;color:#9f9;font-size:14px">
          <span>🏷️ ${d.keterangan}</span>
          <span>− Rp ${d.potongan.toLocaleString('id-ID')}</span>
        </div>`;
    });
    html += `
      <div style="display:flex;justify-content:space-between;padding:4px 0;color:#9f9;font-weight:bold">
        <span>💸 TOTAL POTONGAN:</span>
        <span>− Rp ${totalPotongan.toLocaleString('id-ID')}</span>
      </div>`;
  } else {
    html += `
      <div style="display:flex;justify-content:space-between;padding:4px 0;color:#aaa">
        <span>ℹ️ Tanpa Diskon</span>
        <span>Rp 0</span>
      </div>`;
  }

  // Tampilkan Total Akhir
  html += `
    <div style="display:flex;justify-content:space-between;padding:10px 0;border-top:2px solid #fff;font-size:17px;color:#ffd700;font-weight:bold;margin-top:4px">
      <span>✅ TOTAL BAYAR:</span>
      <span>Rp ${totalBayar.toLocaleString('id-ID')}</span>
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

  // Hitung ulang untuk pesan WhatsApp
  let totalHargaAwal = 0;
  keranjang.forEach(item => { totalHargaAwal += item.harga * item.jumlah; });
  const { totalPotongan, rincianDiskon } = hitungDiskonPerProduk(keranjang);
  const totalBayar = totalHargaAwal - totalPotongan;

  // Susun Teks Pesanan
  let teks = `🛒 PESANAN ATLANTIC PERFUME\n\n`;
  teks += `👤 Nama: ${nama}\n`;
  teks += `📍 Alamat: ${alamat}\n`;
  if (catatan) teks += `📝 Catatan: ${catatan}\n`;
  teks += `────────────────────\n`;

  keranjang.forEach(item => {
    teks += `• ${item.nama}\n  ${item.jumlah} bh × Rp ${item.harga.toLocaleString('id-ID')}\n`;
  });

  teks += `────────────────────\n`;
  teks += `💰 Harga Awal: Rp ${totalHargaAwal.toLocaleString('id-ID')}\n`;

  if (rincianDiskon.length > 0) {
    rincianDiskon.forEach(d => { teks += `🏷️ ${d.keterangan}\n`; });
    teks += `💸 Potongan: − Rp ${totalPotongan.toLocaleString('id-ID')}\n`;
  }

  teks += `✅ TOTAL BAYAR: Rp ${totalBayar.toLocaleString('id-ID')}\n\n`;
  teks += `Terima kasih atas pesanannya! 🙏`;

  // Nomor WA Kasir
  const nomorWA = '6285141281833';
  const link = `https://wa.me/${nomorWA}?text=${encodeURIComponent(teks)}`;

  // Buka WhatsApp → lalu kosongkan keranjang & kembali ke atas
  window.open(link, '_blank');
  keranjang = [];
  perbaruiAngkaKeranjang();
  tutupFormPesanan();
  tutupKeranjang();
  window.scrollTo(0, 0);
}
