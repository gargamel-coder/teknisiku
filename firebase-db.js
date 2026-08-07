/* =========================================================================
   firebase-db.js
   ---------------------------------------------------------------------
   Lapisan tipis di atas Firestore, dipakai bersama oleh index.html,
   admin.html, dan teknisi.html. Tujuannya: setiap file cukup panggil
   fungsi-fungsi generik di bawah ini (fetchAll, setById, dst) tanpa harus
   tahu detail import Firestore SDK-nya masing-masing.

   Koleksi (nama "tabel") yang dipakai di Firestore:
     - custom_technicians   → teknisi yang ditambahkan lewat admin.html
     - orders               → pesanan servis dari index.html
     - pending_reviews      → review konsumen, menunggu moderasi admin
     - featured_listings    → "iklan"/boost teknisi dari admin.html
     - team_members         → anggota tim tiap teknisi (teknisi.html)
     - visits               → log kunjungan (analitik)
     - searches             → log pencarian kota (analitik)
     - wa_clicks            → log klik "Hubungi via WhatsApp" (analitik)
   ========================================================================= */
import { db } from "./firebase-config.js";
import {
  collection, doc, getDocs, setDoc, updateDoc, deleteDoc, addDoc,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Ambil semua dokumen dalam satu koleksi, sebagai array of objects
// (properti `id` selalu ikut disertakan).
export async function fetchAll(collectionName){
  if (!db) return []; // firebase-config.js belum/gagal disetup — degradasi halus
  try{
    const snap = await getDocs(collection(db, collectionName));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }catch(err){
    console.error(`[firebase-db] fetchAll("${collectionName}") gagal:`, err);
    return [];
  }
}

// Tulis/timpa satu dokumen dengan id tertentu (dipakai saat kita sudah
// punya id sendiri, misalnya ORD-xxxx atau Date.now()).
export async function setById(collectionName, id, data){
  if (!db) return;
  try{
    await setDoc(doc(db, collectionName, String(id)), data);
  }catch(err){
    console.error(`[firebase-db] setById("${collectionName}", "${id}") gagal:`, err);
  }
}

// Update sebagian field saja pada satu dokumen (id harus sudah ada).
export async function updateById(collectionName, id, patch){
  if (!db) return;
  try{
    await updateDoc(doc(db, collectionName, String(id)), patch);
  }catch(err){
    console.error(`[firebase-db] updateById("${collectionName}", "${id}") gagal:`, err);
  }
}

// Hapus satu dokumen.
export async function removeById(collectionName, id){
  if (!db) return;
  try{
    await deleteDoc(doc(db, collectionName, String(id)));
  }catch(err){
    console.error(`[firebase-db] removeById("${collectionName}", "${id}") gagal:`, err);
  }
}

// Tambah dokumen baru dengan id yang di-generate otomatis oleh Firestore.
// Cocok untuk log analitik (visits/searches/wa_clicks) yang tidak butuh id
// custom. Fire-and-forget: dipanggil tanpa perlu di-`await` oleh caller.
export async function addLog(collectionName, data){
  if (!db) return;
  try{
    await addDoc(collection(db, collectionName), data);
  }catch(err){
    console.error(`[firebase-db] addLog("${collectionName}") gagal:`, err);
  }
}
