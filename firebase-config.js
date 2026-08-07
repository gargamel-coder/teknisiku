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
  apiKey: "AIzaSyD7R1wZETC86EYYTVPraFtjey5uW9t45qk",
  authDomain: "teknisiku-27450.firebaseapp.com",
  projectId: "teknisiku-27450",
  storageBucket: "teknisiku-27450.firebasestorage.app",
  messagingSenderId: "983640084714",
  appId: "1:983640084714:web:8e7acfab0f4c0010bf4793",
  measurementId: "G-FF3LQYLG2P"
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
