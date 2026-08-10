function tampilkanProduk(daftar) {
  const wadah = document.getElementById('isiTabel');
  if (!wadah) return;
  
  let html = '';
  daftar.forEach(p => {
    html += '<tr class="baris-produk" onclick="bukaAroma(\''+p.nama+'\',\''+p.atas+'\',\''+p.tengah+'\',\''+p.bawah+'\')">';
    html += '<td>' + p.kode + '</td>';
    html += '<td>' + p.nama + '</td>';
    html += '<td>' + p.harga.toLocaleString('id-ID') + '</td>';
    html += '<td style="text-align:center" onclick="event.stopPropagation()"><button class="btn-beli">+</button></td>';
    html += '</tr>';
  });
  wadah.innerHTML = html;
}

function bukaAroma(nama, atas, tengah, bawah) {
  const namaEl = document.getElementById('namaProdukModal');
  const atasEl = document.getElementById('aromaAtas');
  const tengahEl = document.getElementById('aromaTengah');
  const bawahEl = document.getElementById('aromaBawah');
  const modalEl = document.getElementById('modalAroma');
  
  if(namaEl) namaEl.textContent = nama;
  if(atasEl) atasEl.textContent = atas;
  if(tengahEl) tengahEl.textContent = tengah;
  if(bawahEl) bawahEl.textContent = bawah;
  if(modalEl) modalEl.style.display = 'flex';
}

function tutupAroma() {
  const modalEl = document.getElementById('modalAroma');
  if(modalEl) modalEl.style.display = 'none';
}

window.onload = function() {
  if (typeof dataProduk !== 'undefined') {
    tampilkanProduk(dataProduk);
  }
};
