// ==============================================
// SISTEM BAHASA + KERANJANG BELANJA — LENGKAP
// ==============================================

// ==============================================
// BAGIAN 1: SISTEM BAHASA
// ==============================================

const teks = {
  id: {
    selamat: "Selamat Datang di Atlantic Perfume",
    tentang: "Wewangian kami terbuat dari bahan murni berkualitas tinggi dan bebas alkohol. Inilah mengapa harganya sedikit lebih tinggi, namun tetap bersahabat — karena kualitas terbaik layak Anda miliki.",
    penutup: "Temukan wangi yang mencerminkan dirimu.<br>Setiap tetes, sebuah cerita.",
    beranda: "🏠 BERANDA",
    segar: "🍊 SEGAR — Sitrus",
    bunga: "🌸 BUNGA — Elegan",
    kayu: "🪵 KAYU — Mewah",
    manis: "🍬 MANIS — Legenda",
    rempah: "🌶️ REMPAH — Kuat",
    laut: "🌊 SEGAR — Laut",
    populer: "🔥 TERLARIS",
    info: "ℹ️ INFO TOKO",
    info2: "ℹ️ INFORMASI TOKO"
  },
  en: {
    selamat: "Welcome to Atlantic Perfume",
    tentang: "Our fragrances are crafted from pure premium ingredients and are alcohol-free. That is why our prices are slightly higher, yet still fair — because the finest quality deserves you.",
    penutup: "Find the scent that reflects you.<br>Every drop tells a story.",
    beranda: "🏠 HOME",
    segar: "🍊 FRESH — Citrus",
    bunga: "🌸 FLORAL — Elegant",
    kayu: "🪵 WOODY — Luxurious",
    manis: "🍬 SWEET — Legendary",
    rempah: "🌶️ SPICY — Strong",
    laut: "🌊 FRESH — Marine",
    populer: "🔥 BEST SELLERS",
    info: "ℹ️ STORE INFO",
    info2: "ℹ️ STORE INFORMATION"
  }
};

let bahasaSekarang = 'id';

function ubahBahasa(kode) {
  bahasaSekarang = kode;
  localStorage.setItem('bahasa', kode);

  const btnId = document.getElementById('btn-id');
  const btnEn = document.getElementById('btn-en');
  if (btnId) {
    btnId.style.background = kode === 'id' ? '#ffd70040' : 'transparent';
    btnId.style.color = kode === 'id' ? '#fff' : '#ccc';
  }
  if (btnEn) {
    btnEn.style.background = kode === 'en' ? '#ffd70040' : 'transparent';
    btnEn.style.color = kode === 'en' ? '#fff' : '#ccc';
  }

  const elSelamat = document.querySelector('.teks-selamat');
  const elSlogan = document.querySelector('.slogan p');
  const elPenutup = document.querySelector('.penutup');

  if (elSelamat) elSelamat.textContent = teks[kode].selamat;
  if (elSlogan) elSlogan.textContent = teks[kode].tentang;
  if (elPenutup) elPenutup.innerHTML = teks[kode].penutup.replace(/\n/g, '<br>');

  const menuItems = document.querySelectorAll('.menu-item');
  if (menuItems.length >= 9) {
    menuItems[0].innerHTML = teks[kode].beranda;
    menuItems[1].innerHTML = teks[kode].segar;
    menuItems[2].innerHTML = teks[kode].bunga;
    menuItems[3].innerHTML = teks[kode].kayu;
    menuItems[4].innerHTML = teks[kode].manis;
    menuItems[5].innerHTML = teks[kode].rempah;
    menuItems[6].innerHTML = teks[kode].laut;
    menuItems[7].innerHTML = teks[kode].populer;
    menuItems[8].innerHTML = teks[kode].info;
  }

  const kategori = document.querySelectorAll('.daftar-kategori .kategori');
  if (kategori.length >= 8) {
    kategori[0].innerHTML = teks[kode].segar;
    kategori[1].innerHTML = teks[kode].bunga;
    kategori[2].innerHTML = teks[kode].kayu;
    kategori[3].innerHTML = teks[kode].manis;
    kategori[4].innerHTML = teks[kode].rempah;
    kategori[5].innerHTML = teks[kode].laut;
    kategori[6].innerHTML = teks[kode].populer;
    kategori[7].innerHTML = teks[kode].info2;
  }
}

// ==============================================
// BAGIAN 2: KERANJANG BELANJA + DISKON
// ==============================================

let keranjang = [];

function bukaMenu() { document.getElementById('menuKotak').style.right = '0'; document.getElementById('menuLatar').style.display = 'block'; }
function tutupMenu() { document.getElementById('menuKotak').style.right = '-300px'; document.getElementById('menuLatar').style.display = 'none'; }

function bukaKeranjang() { const el = document.getElementById('latarKeranjang'); if(el) el.style.display = 'flex'; renderKeranjang(); }
function tutupKeranjang() { const el = document.getElementById('latarKeranjang'); if(el) el.style.display = 'none'; }

function bukaFormPesanan() { tutupKeranjang(); const el = document.getElementById('latarForm'); if(el) el.style.display = 'flex'; }
function tutupFormPesanan() { const el = document.getElementById('latarForm'); if(el) el.style.display = 'none'; }

function tambahKeKeranjang(kode, nama, harga) {
  const ada = keranjang.find(item => item.kode === kode);
  if (ada) { ada.jumlah++; }
  else { keranjang.push({ kode, nama, harga, jumlah: 1 }); }
  perbaruiAngkaKeranjang();
  alert(`✅ Ditambahkan: ${nama}`);
}

function ubahJumlah(index, selisih) {
  keranjang[index].jumlah += selisih;
  if (keranjang[index].jumlah <= 0) keranjang.splice(index, 1);
  perbaruiAngkaKeranjang();
  renderKeranjang();
}

function hapusItem(index) {
  keranjang.splice(index, 1);
  perbaruiAngkaKeranjang();
  renderKeranjang();
}

function kosongkanKeranjang() {
  if (confirm('Yakin mengosongkan keranjang?')) {
    keranjang = [];
    perbaruiAngkaKeranjang();
    renderKeranjang();
  }
}

function perbaruiAngkaKeranjang() {
  const el = document.getElementById('angkaKeranjang');
  if (el) el.textContent = keranjang.reduce((jml, item) => jml + item.jumlah, 0);
}

function hitungDiskonPerProduk(keranjang) {
  let totalPotongan = 0;
  let rincianDiskon = [];
  keranjang.forEach(item => {
    const jumlah = item.jumlah;
    let persen = 0, keterangan = "";
    if (jumlah >= 5) { persen = 10; keterangan = `${item.nama}: ${jumlah} bh → Diskon 10%`; }
    else if (jumlah >= 2) { persen = 5; keterangan = `${item.nama}: ${jumlah} bh → Diskon 5%`; }
    if (persen > 0) {
      const subtotal = item.harga * jumlah;
      const potongan = Math.round(subtotal * persen / 100);
      totalPotongan += potongan;
      rincianDiskon.push({ keterangan, potongan });
    }
  });
  return { totalPotongan, rincianDiskon };
}

function renderKeranjang() {
  const isi = document.getElementById('isiKeranjang');
  const tombolEl = document.getElementById('tombolKeranjang');
  if (!isi) return;

  if (keranjang.length === 0) {
    isi.innerHTML = "<p style='color:#aaa;text-align:center;padding:20px'>Keranjang masih kosong</p>";
    if (tombolEl) tombolEl.style.display = 'none';
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

  const { totalPotongan, rincianDiskon } = hitungDiskonPerProduk(keranjang);
  const totalBayar = totalHargaAwal - totalPotongan;
  window.dataPesanan = { totalHargaAwal, totalPotongan, totalBayar, rincianDiskon };

  html += `<hr style="margin:12px 0;border:none;border-top:1px dashed #446">`;
  html += `
    <div style="display:flex;justify-content:space-between;padding:4px 0">
      <span>💰 Harga Awal:</span>
      <span>Rp ${totalHargaAwal.toLocaleString('id-ID')}</span>
    </div>`;

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

  html += `
    <div style="display:flex;justify-content:space-between;padding:10px 0;border-top:2px solid #fff;font-size:17px;color:#ffd700;font-weight:bold;margin-top:4px">
      <span>✅ TOTAL BAYAR:</span>
      <span>Rp ${totalBayar.toLocaleString('id-ID')}</span>
    </div>`;

  isi.innerHTML = html;
  if (tombolEl) tombolEl.style.display = 'flex';
}

function kirimPesanan() {
  const nama = document.getElementById('namaPemesan')?.value.trim();
  const alamat = document.getElementById('alamatPemesan')?.value.trim();
  const catatan = document.getElementById('keteranganPesanan')?.value.trim();

  if (!nama || !alamat) { alert('⚠️ Silakan isi Nama dan Alamat lengkap!'); return; }
  if (keranjang.length === 0) { alert('⚠️ Keranjang masih kosong!'); return; }

  let totalHargaAwal = 0;
  keranjang.forEach(item => { totalHargaAwal += item.harga * item.jumlah; });
  const { totalPotongan, rincianDiskon } = hitungDiskonPerProduk(keranjang);
  const totalBayar = totalHargaAwal - totalPotongan;

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

  const nomorWA = '6285141281833';
  const link = `https://wa.me/${nomorWA}?text=${encodeURIComponent(teks)}`;

  window.open(link, '_blank');
  keranjang = [];
  perbaruiAngkaKeranjang();
  tutupFormPesanan();
  tutupKeranjang();
  window.scrollTo(0, 0);
}

// ==============================================
// SAAT HALAMAN DIBUKA
// ==============================================

window.onload = function () {
  const tersimpan = localStorage.getItem('bahasa');
  if (tersimpan) ubahBahasa(tersimpan);
};
                         
