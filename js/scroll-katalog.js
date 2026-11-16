/* ===== Katalog, timeline, manifesto, dan animasi scroll ===== */
(function(){
const $=id=>document.getElementById(id);
const CAT=[
['01','Mentor Mode','Guru yang tidak pernah kehabisan sabar.','Setiap baris kode datang bersama ceritanya: mengapa ditulis seperti itu, apa yang terjadi di baliknya, dan bagaimana cara lain menuliskannya. Kamu tidak hanya selesai, kamu mengerti. Saat dosen bertanya, kamu bisa menjawab dengan kata-katamu sendiri.',['Penjelasan baris demi baris','Analisis Big-O','Kuis latihan']],
['02','Inline Autocomplete','Seolah ia sudah tahu kalimat yang akan kamu ketik.','Saran muncul dalam waktu kurang dari 120 milidetik, mengikuti gaya dan struktur proyekmu. Tekan Tab, dan pikiranmu terus mengalir tanpa terputus oleh pencarian dokumentasi.',['Saran multi-baris','Sadar konteks repositori','40+ bahasa']],
['03','Instan Error Fixer','Dari merah menjadi hijau, cukup satu klik.','Ia membaca jejak error, menelusuri akar masalahnya, lalu menawarkan perbaikan yang bisa kamu setujui atau tolak lewat diff. Bukan sihir, melainkan kerja teliti yang dilakukan dalam hitungan detik.',['1 klik','Analisis stack trace','Diff yang transparan']],
['04','Cloud Sync dan CI/CD','Dari laptopmu ke dunia, tanpa drama server.','Buat branch, buka pull request, jalankan pipeline, dan lihat proyekmu hidup lewat preview URL di setiap commit. Salah langkah? Rollback dengan satu klik, lalu lanjutkan hidup.',['Preview URL','Rollback instan','GitHub dan GitLab']],
['05','Unit Test Otomatis','Tidur tenang karena semuanya sudah dicek.','Test Jest dan PyTest dibuat lengkap dengan kasus batas: input kosong, angka negatif, data aneh. Celah yang biasanya baru ketahuan saat presentasi kini terlihat sejak awal.',['Jest','PyTest','Edge case']],
['06','Zero Data Retention','Kodemu tetap milikmu. Titik.','Tidak ada kode atau prompt yang disimpan, dan tidak ada yang dipakai untuk melatih model. Semua dikirim lewat TLS 1.3, dan berkas sensitif bisa kamu kecualikan kapan saja.',['TLS 1.3','Tanpa penyimpanan','Kecualikan berkas']]];
$('katalogList').innerHTML=CAT.map(c=>`<article class='entry rv grid md:grid-cols-[150px_1fr] gap-4 md:gap-10 py-10 border-t border-white/10'><div class='num text-7xl sm:text-8xl'>${c[0]}</div><div><h3 class='font-serif text-2xl sm:text-3xl text-white'>${c[1]}</h3><p class='text-[#8fd8ff] mt-1'>“${c[2]}”</p><p class='mt-4 text-gray-300 leading-relaxed max-w-2xl'>${c[3]}</p><div class='mt-4 flex flex-wrap gap-2 text-xs text-gray-300'>${c[4].map(t=>`<span class='px-3 py-1 rounded-full bg-white/10'>${t}</span>`).join('')}</div></div></article>`).join('');
const TL=[['19.00','Tugas datang','Dosen memberi tugas: bangun API toko online. Tenggat besok pagi. Kamu menarik napas, membuka VS Code, dan mengetik satu kalimat saja.'],['20.30','Kode pertama lahir','Dengan bahasa sehari-harimu, kamu menjelaskan apa yang kamu mau. Kerangka proyek muncul rapi, lengkap dengan penjelasan di setiap bagian.'],['22.15','Layar memerah','Biasanya, inilah awal malam yang panjang. Kali ini kamu menekan satu tombol, dan akar masalahnya ketemu sebelum kopimu sempat dingin.'],['23.40','Memahami, bukan menyalin','Mentor Mode menjelaskan mengapa error itu terjadi. Kamu mengangguk pelan. Untuk pertama kalinya, kamu benar-benar paham.'],['01.00','Semua hijau','Unit test dibuat otomatis dan seluruhnya lulus. Tidak ada kejutan menunggu di pagi hari.'],['01.30','Deploy, lalu tidur','Preview URL terkirim ke dosen. Laptop ditutup. Malam ini, kamu tidur nyenyak.']];
$('tlList').innerHTML=TL.map(t=>`<div class='rv relative pb-12'><span class='absolute -left-10 top-1 w-4 h-4 rounded-full bg-[#050d1c] border-2 border-[#8fd8ff]'></span><div class='text-[#8fd8ff] font-mono text-sm'>${t[0]}</div><h3 class='font-serif text-2xl text-white mt-1'>${t[1]}</h3><p class='text-gray-400 mt-2 leading-relaxed'>${t[2]}</p></div>`).join('');
const man=$('manifesto');
const manifestoId=man.textContent.trim();
const manifestoEn='Good code begins with a clear mind. We believe every beginner deserves a patient mentor, every student deserves accessible tools, and every evening deserves a restful ending.';
let words=[];
const tl=$('tl'),bar=$('tlbar');
function renderManifesto(){
 const copy=window.NexaI18n?.language()==='en'?manifestoEn:manifestoId;
 man.innerHTML=copy.split(' ').map(w=>`<span class='word'>${w}</span>`).join(' ');
 words=[...man.children];
 onScroll();
}

function onScroll(){
 const r=man.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight*.85-r.top)/(r.height+innerHeight*.35)));
 const n=Math.round(p*words.length);words.forEach((w,i)=>w.classList.toggle('lit',i<n));
 const t=tl.getBoundingClientRect(),q=Math.min(1,Math.max(0,(innerHeight*.65-t.top)/t.height));bar.style.transform='scaleY('+q+')';}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);renderManifesto();document.addEventListener('nexa:langchange',renderManifesto);
/* Reveal saat masuk layar: elemen lama ikut dianimasikan dengan jeda bertahap */
const sel='#beranda h1,#beranda p,#beranda .inline-flex,section h2,.card,#faqList>div,#harga .grid>div,footer .grid>div';
document.querySelectorAll(sel).forEach(el=>{if(el.closest('.marq')||el.closest('#term'))return;el.classList.add('rv');const i=[...el.parentElement.children].indexOf(el);el.style.setProperty('--d',(i%4)*90+'ms');});
const io=new IntersectionObserver(es=>es.forEach(e=>{e.target.classList.toggle('in',e.isIntersecting);}),{threshold:.06,rootMargin:'0px 0px -5% 0px'});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
})();
