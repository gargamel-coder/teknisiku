/* =========================================================================
   firebase-config.js
   ---------------------------------------------------------------------
   Isi objek di bawah dengan config project Firebase kamu sendiri.
   Cara dapetin nilainya ada di TUTORIAL_FIREBASE.md, bagian "Ambil Firebase
   Config". File ini dipakai bersama oleh index.html, admin.html, dan
   teknisi.html — cukup edit SEKALI di sini, otomatis dipakai di ketiganya.
   ========================================================================= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "GANTI_DENGAN_API_KEY_KAMU",
  authDomain: "GANTI.firebaseapp.com",
  projectId: "GANTI_PROJECT_ID",
  storageBucket: "GANTI.appspot.com",
  messagingSenderId: "GANTI_SENDER_ID",
  appId: "GANTI_APP_ID",
};

// Dibungkus try/catch supaya kalau config belum diisi / salah, halaman tetap
// bisa tampil (pakai data bawaan saja, tanpa fitur Firestore) — bukan blank
// total. Cek Console browser (F12) kalau db bernilai null terus.
export let app = null;
export let db = null;
try{
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}catch(err){
  console.error("[firebase-config] Gagal inisialisasi Firebase — cek firebase-config.js. Detail:", err);
}
