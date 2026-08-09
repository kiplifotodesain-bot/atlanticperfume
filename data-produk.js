// ==========================================
//   📦 PUSAT DATA SEMUA PRODUK — 56 PRODUK
// ==========================================

const data = {

  // ==========================================
  // KELOMPOK 1 — SEGAR — Sitrus (8 Produk)
  // ==========================================
  kelompok1: {
    nama: "🍊 SEGAR — Sitrus",
    produk: [
      {kode:"SS001", nama:"Citrus Fresh", desk:"Jeruk segar, lemon, jeruk nipis", harga:248400},
      {kode:"SS002", nama:"Sunshine Zest", desk:"Jeruk manis, mandarin, bergamot", harga:220800},
      {kode:"SS003", nama:"Ocean Citrus", desk:"Jeruk bali, kelapa, segar", harga:264000},
      {kode:"SS004", nama:"Lemon Breeze", desk:"Lemon segar, bunga melati, lembut", harga:235200},
      {kode:"SS005", nama:"Sweet Mandarin", desk:"Jeruk keprok manis, gula, lembut", harga:242000},
      {kode:"SS006", nama:"Bergamot Calm", desk:"Bergamot, teh hijau, menenangkan", harga:254000},
      {kode:"SS007", nama:"Grapefruit Glow", desk:"Jeruk bali merah, segar, bersemangat", harga:248400},
      {kode:"SS008", nama:"Lime Sparkle", desk:"Jeruk nipis, mint, segar berkilau", harga:230000}
    ]
  },

  // ==========================================
  // KELOMPOK 2 — BUNGA — Elegan (8 Produk)
  // ==========================================
  kelompok2: {
    nama: "🌸 BUNGA — Elegan",
    produk: [
      {kode:"BN001", nama:"Gucci Bloom", desk:"Melati, tuberosa, bunga anggrek", harga:220800},
      {kode:"BN002", nama:"Rose Elegance", desk:"Mawar murni, mawar damask", harga:248400},
      {kode:"BN003", nama:"Jasmine Serenity", desk:"Melati putih, melati sambac", harga:235200},
      {kode:"BN004", nama:"Cherry Blossom", desk:"Bunga sakura, buah persik", harga:258000},
      {kode:"BN005", nama:"Lily Grace", desk:"Bunga lili putih, lembut, suci", harga:245000},
      {kode:"BN006", nama:"Orchid Beauty", desk:"Anggrek hitam, vanila, elegan", harga:276000},
      {kode:"BN007", nama:"Peony Joy", desk:"Bunga peoni, mawar, segar", harga:254000},
      {kode:"BN008", nama:"Chanel Garden", desk:"Melati, mawar, iris, abadi", harga:288000}
    ]
  },

  // ==========================================
  // KELOMPOK 3 — KAYU — Mewah (8 Produk)
  // ==========================================
  kelompok3: {
    nama: "🪵 KAYU — Mewah",
    produk: [
      {kode:"KY001", nama:"Santal Luxury", desk:"Kayu cendana, vanila, lembut", harga:276000},
      {kode:"KY002", nama:"Agarwood Royal", desk:"Gaharu, rempah, mewah", harga:345000},
      {kode:"KY003", nama:"Cedarwood Prestige", desk:"Kayu cedar, amber, wangi hutan", harga:264000},
      {kode:"KY004", nama:"Oud Majestic", desk:"Oud murni, kenanga, mendalam", harga:368000},
      {kode:"KY005", nama:"Teak Heritage", desk:"Kayu jati, tembakau, klasik", harga:294000},
      {kode:"KY006", nama:"Ebony Dark", desk:"Kayu hitam, lada, misterius", harga:325000},
      {kode:"KY007", nama:"Pine Forest", desk:"Pinus, cemara, segar hutan", harga:258000},
      {kode:"KY008", nama:"Vetiver Pure", desk:"Akar wangi, kayu, bersih murni", harga:270000}
    ]
  },

  // ==========================================
  // KELOMPOK 4 — MANIS — Legenda (8 Produk)
  // ==========================================
  kelompok4: {
    nama: "🍬 MANIS — Legenda",
    produk: [
      {kode:"MN001", nama:"La Vie Est Belle", desk:"Mawar, irisan, gula merah", harga:248400},
      {kode:"MN002", nama:"Sweet Vanilla", desk:"Vanila madagaskar, krim manis", harga:235200},
      {kode:"MN003", nama:"Amber Honey", desk:"Madu murni, amber, manis hangat", harga:264000},
      {kode:"MN004", nama:"Caramel Dream", desk:"Karamel, gula tebu, susu", harga:242000},
      {kode:"MN005", nama:"Coconut Paradise", desk:"Santan, gula aren, tropis", harga:254000},
      {kode:"MN006", nama:"Almond Blossom", desk:"Bunga almond, susu, lembut", harga:248400},
      {kode:"MN007", nama:"Choco Musk", desk:"Cokelat, kenari, wangi lembut", harga:276000},
      {kode:"MN008", nama:"Candy Rose", desk:"Permen mawar, manis, ceria", harga:230000}
    ]
  },

  // ==========================================
  // KELOMPOK 5 — REMPAH — Kuat (8 Produk)
  // ==========================================
  kelompok5: {
    nama: "🌶️ REMPAH — Kuat",
    produk: [
      {kode:"RP001", nama:"Spice Orient", desk:"Kayu manis, cengkeh, pala", harga:258000},
      {kode:"RP002", nama:"Cardamom Gold", desk:"Kapulaga, jahe, jeruk", harga:270000},
      {kode:"RP003", nama:"Black Pepper Bold", desk:"Lada hitam, jeruk nipis, kuat", harga:248400},
      {kode:"RP004", nama:"Saffron Mystique", desk:"Kunyit, rempah timur, eksotis", harga:320000},
      {kode:"RP005", nama:"Ginger Warmth", desk:"Jahe segar, madu, hangat", harga:254000},
      {kode:"RP006", nama:"Cinnamon Warm", desk:"Kayu manis, vanila, nyaman", harga:262000},
      {kode:"RP007", nama:"Clove Spirit", desk:"Cengkeh, tembakau, tegas", harga:276000},
      {kode:"RP008", nama:"Nutmeg Rich", desk:"Pala, rempah, kaya rasa", harga:285000}
    ]
  },

  // ==========================================
  // KELOMPOK 6 — SEGAR — Laut (8 Produk)
  // ==========================================
  kelompok6: {
    nama: "🌊 SEGAR — Laut",
    produk: [
      {kode:"SL001", nama:"Atlantic Breeze", desk:"Air laut, garam, segar dingin", harga:248400},
      {kode:"SL002", nama:"Sea Salt Wave", desk:"Garam laut, melati, bersih", harga:235200},
      {kode:"SL003", nama:"Coastal Fresh", desk:"Laut, jeruk nipis, angin segar", harga:254000},
      {kode:"SL004", nama:"Deep Ocean", desk:"Air laut, kayu putih, mendalam", harga:268000},
      {kode:"SL005", nama:"Coral Reef", desk:"Alga laut, melati, segar lembut", harga:245000},
      {kode:"SL006", nama:"Blue Lagoon", desk:"Air jernih, bunga teratai, tenang", harga:260000},
      {kode:"SL007", nama:"Morning Tide", desk:"Sembah laut, segar pagi hari", harga:242000},
      {kode:"SL008", nama:"Whale Bay", desk:"Garam, kayu cendana, luas", harga:276000}
    ]
  },

  // ==========================================
  // KELOMPOK 7 — TERLARIS (8 Produk)
  // ==========================================
  kelompok7: {
    nama: "🔥 TERLARIS",
    produk: [
      {kode:"LV334", nama:"La Vie Est Belle", desk:"Mawar, irisan, gula merah", harga:248400},
      {kode:"LV463", nama:"Gucci Bloom", desk:"Melati, tuberosa, anggrek", harga:220800},
      {kode:"LV070", nama:"Chance Fresh", desk:"Sitrus, melati, segar dinamis", harga:235200},
      {kode:"LV112", nama:"Coco Elegance", desk:"Bunga melati, nilam, elegan", harga:264000},
      {kode:"LV555", nama:"No.5 Classic", desk:"Mawar, melati, aldehida, abadi", harga:294000},
      {kode:"LV777", nama:"Alien Gold", desk:"Ambar, vanila, cendana, bercahaya", harga:285000},
      {kode:"LV888", nama:"J'adore Dior", desk:"Anggur, melati, mawar, emas", harga:312000},
      {kode:"LV999", nama:"Samsara Pure", desk:"Sandalwood, iris, mawar, abadi", harga:276000}
    ]
  }
};
      
