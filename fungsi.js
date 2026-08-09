// === DAFTAR HARGA SEMUA PRODUK ===
// Tambah produk baru cukup tambah baris disini saja!
const daftarHarga = {
 'A 0501': 145000,
 'A 0502': 138000,
 'A 0503': 132000,
 'A 0504': 136000,
 'A 0505': 148000,
 'A 0601': 152000,
 'A 0602': 129000,
 'A 0603': 125000,
 'A 0604': 130000,
 'A 0605': 142000,
 'B 0501': 146000,
 'B 0502': 123000,
 'B 0503': 139000,
 'B 0504': 134000,
 'B 0505': 128000,
 'B 0601': 135000,
 'B 0602': 140000,
 'B 0603': 144000,
 'B 0604': 137000,
 'B 0605': 131000
 // Tambah produk baru disini: 'KODE': HARGA,
};

// === KERANJANG & FUNGSI ===
let keranjang = JSON.parse(localStorage.getItem('keranjangAtlantic') || '[]');

function hitungTotal(){
 let total = 0;
 keranjang.forEach(item => { total += daftarHarga[item.kode] || 0; });
 return total;
}
function formatRupiah(angka){ return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
function perbaruiJumlah(){ const el=document.getElementById('jumlahKeranjang'); if(el)el.textContent=keranjang.length; }
function tambahKeranjang(kode,nama){ keranjang.push({kode,nama}); simpanKeranjang(); perbaruiJumlah(); alert('✅ Ditambahkan:\n'+kode+' — '+nama); }
function hapusItem(index){ keranjang.splice(index,1); simpanKeranjang(); tampilkanKeranjang(); perbaruiJumlah(); }
function kosongkanKeranjang(){ if(confirm('Kosongkan semua pesanan?')){ keranjang=[]; simpanKeranjang(); tampilkanKeranjang(); perbaruiJumlah(); }}
function simpanKeranjang(){ localStorage.setItem('keranjangAtlantic', JSON.stringify(keranjang)); }
function bukaKeranjang(){ tampilkanKeranjang(); document.getElementById('latarKeranjang').classList.add('buka'); document.body.style.overflow='hidden'; }
function tutupKeranjang(){ document.getElementById('latarKeranjang').classList.remove('buka'); document.body.style.overflow=''; }
function tutupForm(){ document.getElementById('latarForm').classList.remove('buka'); document.body.style.overflow=''; }
function bukaMenu(){ document.getElementById('menuKotak').classList.add('buka'); document.getElementById('menuLatar').classList.add('buka'); document.body.style.overflow='hidden'; }
function tutupMenu(){ document.getElementById('menuKotak').classList.remove('buka'); document.getElementById('menuLatar').classList.remove('buka'); document.body.style.overflow=''; }

function tampilkanKeranjang(){
 const el=document.getElementById('isiKeranjang'), tombol=document.getElementById('tombolKeranjang'), blokTotal=document.getElementById('totalKeranjang');
 if(keranjang.length===0){ el.innerHTML='<div class="keranjang-kosong">Keranjang masih kosong</div>'; tombol.style.display='none'; blokTotal.style.display='none'; return; }
 tombol.style.display='flex'; blokTotal.style.display='block'; blokTotal.textContent='Total: '+formatRupiah(hitungTotal());
 el.innerHTML=keranjang.map((item,i)=>`<div class="keranjang-item"><div class="keranjang-nama"><strong>${item.kode}</strong><br>${item.nama}</div><div style="text-align:right"><div>${formatRupiah(daftarHarga[item.kode]||0)}</div><span class="keranjang-hapus" onclick="hapusItem(${i})">hapus</span></div></div>`).join('');
}

function bukaFormPesanan(){
 if(keranjang.length===0) return; tutupKeranjang();
 const ringkas=document.getElementById('ringkasPesanan'); let isi='<p style="font-weight:bold;color:#f8d777;margin-bottom:8px;">📋 RINGKASAN PESANAN:</p>';
 keranjang.forEach((item,i)=>{isi+=`<p>${i+1}. ${item.kode} — ${item.nama}<span style="float:right">${formatRupiah(daftarHarga[item.kode]||0)}</span></p>`;});
 isi+=`<p class="form-total">TOTAL BAYAR: <span style="float:right">${formatRupiah(hitungTotal())}</span></p>`;
 ringkas.innerHTML=isi; document.getElementById('latarForm').classList.add('buka'); document.body.style.overflow='hidden';
}

function kirimPesananWA(){
 const nama=document.getElementById('namaPemesan').value.trim(), alamat=document.getElementById('alamatPemesan').value.trim(), keterangan=document.getElementById('keteranganPemesan').value.trim();
 if(!nama){alert('⚠️ Isi Nama Pemesan!');return;} if(!alamat){alert('⚠️ Isi Alamat Lengkap!');return;}
 let teks='Halo Atlantic Perfume!%0A%0A📋 DATA PEMESANAN:%0A%0A';
 teks+=`👤 Nama Pemesan: ${nama}%0A📍 Alamat Lengkap: ${alamat}%0A`;
 if(keterangan) teks+=`📝 Keterangan: ${keterangan}%0A`;
 teks+='%0A🛒 DAFTAR BARANG:%0A%0A';
 keranjang.forEach((item,i)=>{teks+=`${i+1}. ${item.kode} — ${item.nama} = ${formatRupiah(daftarHarga[item.kode]||0)}%0A`;});
 teks+=`%0A💰 TOTAL PEMBAYARAN: ${formatRupiah(hitungTotal())}%0A—%0ASaya ingin memesan produk di atas. Terima kasih!`;
 window.open(`https://wa.me/6289676100177?text=${encodeURIComponent(teks)}`,'_blank');
}

perbaruiJumlah();
                   
