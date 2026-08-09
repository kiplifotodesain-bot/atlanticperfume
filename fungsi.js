// ==========================================
//   ⚙️ MESIN PENGISI + MENU SUDAH DIPERBAIKI!
// ==========================================

let keranjang = [];

// ✅ FUNGSI MENU — SUDAH DIPERBAIKI
function bukaMenu() {
  document.getElementById('menuKotak').style.right = '0';
  document.getElementById('menuLatar').style.display = 'block';
}
function tutupMenu() {
  document.getElementById('menuKotak').style.right = '-300px';
  document.getElementById('menuLatar').style.display = 'none';
}

// Buka/tutup keranjang
function bukaKeranjang() { document.getElementById('latarKeranjang').style.display = 'flex'; renderKeranjang(); }
function tutupKeranjang() { document.getElementById('latarKeranjang').style.display = 'none'; }

// Buka/tutup form
function bukaFormPesanan() { tutupKeranjang(); document.getElementById('latarForm').style.display = 'flex'; ringkasPesanan(); }
function tutupForm() { document.getElementById('latarForm').style.display = 'none'; bukaKeranjang(); }

// Isi tabel produk + tampilkan Harga
function isiHalaman(id) {
  const halaman = data[id];
  if (!halaman) return;
  document.querySelector('.judul-halaman').textContent = halaman.nama;
  const tbody = document.getElementById('daftarProduk');
  tbody.innerHTML = '';
  halaman.produk.forEach(p => {
    tbody.innerHTML += `
      <tr style="border-bottom:1px solid #ffffff15">
        <td style="padding:10px 8px">
          <div style="font-weight:bold">${p.nama}</div>
          <div style="font-size:12px;color:#ccc">${p.kode}</div>
        </td>
        <td style="padding:10px 8px;font-size:14px">${p.desk}</td>
        <td style="padding:10px 8px;text-align:center;font-weight:bold;color:#ffd700">Rp ${p.harga.toLocaleString('id-ID')}</td>
        <td style="padding:10px 4px;text-align:center">
          <button onclick="tambahKeKeranjang('${p.kode}','${p.nama}',${p.harga})" style="background:none;border:none;font-size:18px;cursor:pointer">🛒</button>
        </td>
      </tr>`;
  });
}

// Tambah ke keranjang
function tambahKeKeranjang(kode, nama, harga) {
  keranjang.push({kode, nama, harga});
  renderKeranjang();
  bukaKeranjang();
}

// Tampilkan keranjang
function renderKeranjang() {
  const list = document.getElementById('isiKeranjang');
  const totalEl = document.getElementById('totalKeranjang');
  const tombolEl = document.getElementById('tombolKeranjang');
  document.getElementById('jumlahItem').textContent = keranjang.length;

  if (keranjang.length === 0) {
    list.innerHTML = '<p style="text-align:center;color:#666;margin:10px 0">Keranjang masih kosong</p>';
    totalEl.style.display = 'none';
    tombolEl.style.display = 'none';
    return;
  }

  let total = 0;
  list.innerHTML = keranjang.map((p, i) => {
    total += p.harga;
    return `<div style="padding:8px 0;border-bottom:1px solid #eee">${i+1}. ${p.nama}<br><span style="color:#0f2040;font-weight:bold">Rp ${p.harga.toLocaleString('id-ID')}</span></div>`;
  }).join('');

  totalEl.textContent = `TOTAL: Rp ${total.toLocaleString('id-ID')}`;
  totalEl.style.display = 'block';
  tombolEl.style.display = 'flex';
}

// Kosongkan keranjang
function kosongkanKeranjang() {
  keranjang = [];
  renderKeranjang();
}

// Ringkas pesanan
function ringkasPesanan() {
  let teks = '📦 RINCIAN PESANAN:\n';
  let total = 0;
  keranjang.forEach((p, i) => {
    teks += `${i+1}. ${p.nama} — Rp ${p.harga.toLocaleString('id-ID')}\n`;
    total += p.harga;
  });
  teks += `────────────────────\n💰 TOTAL: Rp ${total.toLocaleString('id-ID')}`;
  document.getElementById('ringkasPesanan').textContent = teks;
}

// Kirim ke WhatsApp
function kirimKeWhatsApp() {
  const nama = document.getElementById('namaPemesan').value.trim();
  const alamat = document.getElementById('alamatPemesan').value.trim();
  const catatan = document.getElementById('catatanPemesan').value.trim();

  if (!nama || !alamat) {
    alert('⚠️ Lengkapi Nama dan Alamat Pemesan!');
    return;
  }

  let teks = '📦 PESANAN ATLANTIC PERFUME\n';
  teks += `────────────────────\n`;
  teks += `👤 Nama: ${nama}\n`;
  teks += `📍 Alamat: ${alamat}\n`;
  if (catatan) teks += `📝 Catatan: ${catatan}\n`;
  teks += `────────────────────\n`;

  let total = 0;
  keranjang.forEach((p, i) => {
    teks += `${i+1}. ${p.nama}\n   Rp ${p.harga.toLocaleString('id-ID')}\n`;
    total += p.harga;
  });

  teks += `────────────────────\n💰 TOTAL: Rp ${total.toLocaleString('id-ID')}`;

  const url = 'https://wa.me/6289676100177?text=' + encodeURIComponent(teks);
  window.open(url, '_blank');
}
