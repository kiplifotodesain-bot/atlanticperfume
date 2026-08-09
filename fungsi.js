let keranjang = [];
function bukaMenu(){document.getElementById('menuKotak').style.right='0';document.getElementById('menuLatar').style.display='block'}
function tutupMenu(){document.getElementById('menuKotak').style.right='-300px';document.getElementById('menuLatar').style.display='none'}
function bukaKeranjang(){hitungTotal();document.getElementById('latarKeranjang').style.display='flex'}
function tutupKeranjang(){document.getElementById('latarKeranjang').style.display='none'}
function tambahKeKeranjang(nama,harga){
  keranjang.push({nama,harga});
  document.getElementById('jumlahItem').textContent=keranjang.length;
  tampilKeranjang();
}
function tampilKeranjang(){
  let isi='';
  keranjang.forEach((item,i)=>{isi+=`<div style="padding:6px 0;border-bottom:1px solid #eee">${i+1}. ${item.nama} — Rp ${item.harga.toLocaleString('id-ID')}</div>`});
  document.getElementById('isiKeranjang').innerHTML=isi;
  document.getElementById('tombolKeranjang').style.display=keranjang.length>0?'flex':'none';
}
function hitungTotal(){
  let total=keranjang.reduce((sum,i)=>sum+i.harga,0);
  document.getElementById('totalKeranjang').innerHTML=`<strong>Total: Rp ${total.toLocaleString('id-ID')}</strong>`;
}
function kosongkanKeranjang(){
  if(confirm('Yakin mengosongkan keranjang?')){
    keranjang=[];
    document.getElementById('jumlahItem').textContent='0';
    tampilKeranjang();
    document.getElementById('totalKeranjang').innerHTML='';
  }
}
function bukaFormPesanan(){
  tutupKeranjang();
  document.getElementById('latarForm').style.display='flex';
  let ringkas='📋 Rincian Pesanan:\n';
  keranjang.forEach((item,i)=>{ringkas+=`${i+1}. ${item.nama} — Rp ${item.harga.toLocaleString('id-ID')}\n`});
  ringkas+='\nTotal: Rp '+keranjang.reduce((s,i)=>s+i.harga,0).toLocaleString('id-ID');
  document.getElementById('ringkasPesanan').textContent=ringkas;
}
function tutupForm(){document.getElementById('latarForm').style.display='none'}
function kirimKeWhatsApp(){
  let nama=document.getElementById('namaPemesan').value.trim();
  let alamat=document.getElementById('alamatPemesan').value.trim();
  let catatan=document.getElementById('catatanPemesan').value.trim();
  if(!nama||!alamat){alert('Lengkapi Nama dan Alamat!');return}
  let rincian='📋 PESANAN ATLANTIC PERFUME%0A%0ANama: '+nama+'%0AAlamat: '+alamat+'%0A';
  if(catatan)rincian+='Catatan: '+catatan+'%0A';
  rincian+='%0A--- RINCIAN BARANG ---%0A';
  let total=0;
  keranjang.forEach((item,i)=>{rincian+=`${i+1}. ${item.nama} — Rp ${item.harga.toLocaleString('id-ID')}%0A`;total+=item.harga});
  rincian+=`%0A✅ TOTAL: Rp ${total.toLocaleString('id-ID')}`;
  window.open('https://wa.me/6289676100177?text='+rincian,'_blank');
}
