(function(){
/* ===== 1. Terminal hero: 5 contoh kode berjalan otomatis, berulang ===== */
const $=id=>document.getElementById(id), sleep=ms=>new Promise(r=>setTimeout(r,ms));
const K=t=>`<span class='text-[#9bb8ff]'>${t}</span>`,F=t=>`<span class='text-[#8fd8ff]'>${t}</span>`,S=t=>`<span class='text-[#e9c9a4]'>${t}</span>`,N=t=>`<span class='text-[#f0b48f]'>${t}</span>`,C=t=>`<span class='text-gray-500'>${t}</span>`,G=t=>`<span class='text-[#8fd8ff]'>${t}</span>`;
const L=(n,h,c='')=>`<div class='${c}' style='padding-left:${n}rem;opacity:0;transition:opacity .35s'>${h}</div>`;
const CH={g:'bg-[#8fd8ff]/10 text-[#8fd8ff]',b:'bg-[#4f8cff]/15 text-[#8fd8ff]',x:'bg-white/10 text-gray-300'};
const EX=[
 {f:'api/login.py',p:'buatkan fungsi login dengan JWT dan validasi password',l:[L(0,K('def')+' '+F('login')+'(email, password):'),L(1,'user = db.users.find(email=email)'),L(1,K('if not')+' user '+K('or not')+' verify(password, user.hash):'),L(2,K('raise')+' AuthError('+S(`"Email atau password salah"`)+')'),L(1,K('return')+' issue_jwt(user.id, ttl='+N('3600')+')')],c:[['✓ 3 unit test dibuat','g'],['⚡ 98 ms · 412 token','b'],['Siap commit','x']]},
 {f:'routes/produk.js',p:'buat endpoint GET /produk dengan paginasi',l:[L(0,'app.'+F('get')+'('+S(`'/produk'`)+', '+K('async')+' (req, res) => {'),L(1,K('const')+' { page = '+N('1')+', limit = '+N('10')+' } = req.query;'),L(1,K('const')+' rows = '+K('await')+' Produk.paginate(page, limit);'),L(1,'res.json({ page: +page, data: rows });'),L(0,'});')],c:[['✓ Validasi query ditambahkan','g'],['⚡ 84 ms · 366 token','b'],['Express · Node 20','x']]},
 {f:'ProductList.jsx',p:`perbaiki error: Cannot read properties of undefined (reading 'map')`,l:[L(0,C('// Penyebab: items bisa undefined sebelum data dimuat')),L(0,'- items.map(i => i.nama)','text-red-400/90'),L(0,'+ (items ?? []).map(i => i.nama)','text-[#8fd8ff]'),L(0,C('// 1 klik: terapkan perbaikan ke file ini'))],c:[['✓ Akar masalah ditemukan','g'],['⚡ 71 ms · 298 token','b'],['Terapkan perbaikan','x']]},
 {f:'tests/diskon.test.js',p:'buatkan unit test untuk diskon()',l:[L(0,F('describe')+'('+S(`'diskon'`)+', () => {'),L(1,F('test')+'('+S(`'member 10%'`)+', () => expect(diskon('+N('100')+','+S(`'member'`)+')).toBe('+N('90')+'));'),L(1,F('test')+'('+S(`'harga negatif'`)+', () => expect(() => diskon('+N('-1')+')).toThrow());'),L(1,F('test')+'('+S(`'tanpa kode'`)+', () => expect(diskon('+N('100')+')).toBe('+N('100')+'));'),L(0,'});')],c:[['✓ 3 test lulus','g'],['Jest','x'],['Cakupan 100%','b']]},
 {f:'terminal · deploy',p:'deploy ke cloud dan buat preview URL',l:[L(0,G('✓')+' Build selesai (4,2 dtk)'),L(0,G('✓')+' Test lulus (12/12)'),L(0,G('✓')+' Upload ke Cloud Hosting'),L(0,G('●')+' Live: '+F('https://proyek-kamu.nexa.app'))],c:[['✓ Preview URL siap','g'],['Rollback 1 klik','x']]}
];
const out=$('result'),typed=$('typed'),file=$('tfile');let n=0;
(async function run(){for(;;){
 const e=EX[n++%EX.length],t='> '+(window.NexaI18n?.tr(e.p)||e.p);
 file.textContent=e.f+' — NexaCode AI';out.style.opacity=0;out.innerHTML='';typed.textContent='';typed.classList.add('cursor');
 await sleep(500);
 for(let i=1;i<=t.length;i++){typed.textContent=t.slice(0,i);await sleep(26+Math.random()*30);}
 typed.classList.remove('cursor');await sleep(450);
 out.innerHTML=e.l.join('')+`<div class='mt-4 flex flex-wrap gap-2 text-[11px]' style='opacity:0;transition:opacity .35s'>${e.c.map(([x,k])=>`<span class='px-2 py-1 rounded ${CH[k]}'>${x}</span>`).join('')}</div>`;
 out.style.opacity=1;
 for(const d of out.children){await sleep(230);d.style.opacity=1;}
 await sleep(3300);
 for(let i=t.length;i>=0;i-=3){typed.textContent=t.slice(0,i);await sleep(8);}
 out.style.opacity=0;await sleep(500);
}})();

/* ===== 2. Kartu terminal miring mengikuti kursor ===== */
const term=$('term');
if(term&&matchMedia('(hover:hover)').matches){term.style.transition='transform .15s';
 term.addEventListener('mousemove',e=>{const r=term.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;term.style.transform=`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`;});
 term.addEventListener('mouseleave',()=>{term.style.transform='';});}

/* ===== 3. Sorot cahaya kartu + progress scroll ===== */
document.addEventListener('mousemove',e=>{const c=e.target.closest&&e.target.closest('.card');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');}});
const bar=$('sp');addEventListener('scroll',()=>{bar.style.width=(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)*100)+'%';},{passive:true});

/* ===== 5. Carousel ulasan: dua baris bergerak berlawanan ===== */
const R=[['Rizky A.','Mahasiswa Informatika','Mentor Mode menjelaskan rekursi langkah demi langkah sampai saya benar-benar paham. Skripsi saya selesai dua minggu lebih cepat dari rencana.'],['Dinda P.','Backend Engineer','Error Fixer menemukan bug race condition yang sudah tiga jam saya cari. Cukup satu klik, masalahnya langsung ketemu.'],['Bayu S.','Founder Startup','Deploy langsung dari editor tanpa perlu menyiapkan server. Sangat membantu untuk tim kecil seperti kami.'],['Salsa N.','Mahasiswa Sistem Informasi','Chat dengan bahasa sehari-hari sangat membantu. Penjelasannya jelas, runtut, dan mudah dipahami.'],['Fajar M.','Frontend Developer','Autocomplete-nya memahami struktur proyek saya. Cukup tekan Tab, lalu pekerjaan berlanjut tanpa terputus.'],['Putri W.','Data Analyst','Unit test PyTest yang dihasilkan rapi dan mencakup edge case. Cakupan pengujian tim kami meningkat pesat.'],['Andi K.','Dosen Pemrograman','Saya merekomendasikannya kepada mahasiswa karena alat ini menjelaskan alasan di balik kode, bukan sekadar memberi jawaban.'],['Maya L.','DevOps Engineer','Pipeline CI/CD dan preview URL pada setiap commit menghemat banyak waktu proses review.'],['Teguh R.','Freelancer','Harga Student Pro sangat terjangkau, tetapi fiturnya sekelas alat profesional.'],['Citra D.','Mahasiswa Teknik Komputer','Offline Mode sangat menolong ketika internet di kos terputus menjelang tenggat tugas.']];
const card=r=>`<figure class='card glass rounded-2xl p-6 w-[300px] sm:w-[340px] shrink-0'><div class='text-[#8fd8ff] text-sm tracking-widest'>★★★★★</div><blockquote class='text-gray-200 text-sm leading-relaxed mt-3'>“${r[2]}”</blockquote><figcaption class='mt-4 flex items-center gap-3'><span class='w-9 h-9 rounded-full bg-gradient-to-br from-[#4f8cff] to-[#8fd8ff] text-black font-semibold text-sm flex items-center justify-center'>${r[0][0]}</span><span class='text-xs text-gray-400'><b class='text-white block text-sm'>${r[0]}</b>${r[1]}</span></figcaption></figure>`;
const row=(a,rev,mt)=>`<div class='marq-wrap ${mt}'><div class='marq ${rev?'rev':''}'>${a.concat(a).map(card).join('')}</div></div>`;
const h2=[...document.querySelectorAll('h2')].find(h=>h.textContent.includes('Dipercaya'));
if(h2){const w=h2.parentElement;[...w.children].forEach(c=>{if(c!==h2)c.remove();});
 w.insertAdjacentHTML('beforeend',row(R.slice(0,5),false,'mt-10')+row(R.slice(5),true,'mt-4'));}
})();
