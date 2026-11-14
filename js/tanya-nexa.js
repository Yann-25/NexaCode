(function(){
const A={error:'Pesan merah itu bukan vonis, hanya surat dari komputer yang kebingungan. Bacalah baris pertamanya, di sanalah ia biasanya menunjuk jalan pulang.',deadline:'Tenggat memang terasa seperti jurang, tetapi ia hanya garis di kalender. Pecah jadi tiga langkah kecil, kerjakan satu, lalu tarik napas.',begadang:'Kode ditulis dengan pikiran jernih selalu lebih rapi daripada kode yang ditulis pukul tiga pagi. Simpan pekerjaanmu. Besok, kamu dan bug itu akan berdamai.',skripsi:'Skripsi bukan lomba lari, melainkan menanam pohon. Tulis satu bagian hari ini, dan biarkan sisanya tumbuh.',bingung:'Bingung itu tanda otakmu sedang membuka pintu baru. Ceritakan dari mana kamu mulai, dan kita telusuri bersama, satu baris demi satu baris.'};
const D='Aku belum mengenal kata itu, tetapi aku mengerti rasanya. Ceritakan lebih banyak, kita cari jalannya bersama.';
const i=document.getElementById('nxIn'),t=document.getElementById('nxTxt');let tm;
function go(){const q=i.value.toLowerCase();const k=Object.keys(A).find(x=>q.includes(x));const base=k?A[k]:D,r=window.NexaI18n?.tr(base)||base;clearInterval(tm);let n=0;t.textContent='';tm=setInterval(()=>{t.textContent=r.slice(0,++n);if(n>=r.length)clearInterval(tm);},18);}
document.getElementById('nxGo').onclick=go;i.addEventListener('keydown',e=>{if(e.key==='Enter')go();});
})();
