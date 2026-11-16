(function(){
/* ---------- helpers & data ---------- */
const $=id=>document.getElementById(id), rp=n=>'Rp '+n.toLocaleString('id-ID');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const IN='w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#8fd8ff]';
const BTN='px-6 py-3 rounded-full bg-gradient-to-r from-[#4f8cff] to-[#8fd8ff] text-black font-semibold text-sm hover:scale-[1.03] transition';
const PLANS={'Mulai Gratis':{n:'Free',p:0},'Pilih Student Pro':{n:'Student Pro',p:29000,ktm:1},'Pilih Developer Plus':{n:'Developer Plus',p:99000},'Pilih Pro Suite':{n:'Pro Suite',p:149000}};
const METHODS=[['qris','QRIS','Semua e-wallet dan m-banking'],['va','Virtual Account','BCA, Mandiri, BNI, BRI'],['ew','E-Wallet','GoPay, OVO, ShopeePay, DANA'],['card','Kartu Kredit/Debit','Visa, Mastercard, JCB']];
const M=$('ckModal'), B=$('ckBody'), H=$('ckHead');
let S, timer;
const gen=()=>Math.random().toString(36).slice(2,6).toUpperCase();
const base=()=>S.plan.p*S.months*(S.months===12?0.8:1);
const disc=()=>S.promo==='NEXA10'?Math.round(base()*0.1):0;
const total=()=>Math.round(base())-disc();
const err=t=>{const e=$('ckErr');if(e)e.textContent=t;};
const opts=(arr,cur)=>arr.map(o=>`<option ${o===cur?'selected':''}>${o}</option>`).join('');

function sum(){return `<div class='flex justify-between text-gray-300'><span>${S.plan.n} · ${S.months===12?'12 bulan':'1 bulan'}</span><span>${rp(Math.round(base()))}</span></div>${disc()?`<div class='flex justify-between text-[#8fd8ff]'><span>Promo NEXA10</span><span>−${rp(disc())}</span></div>`:''}<div class='flex justify-between text-white font-semibold mt-2 pt-2 border-t border-white/10'><span>Total (termasuk pajak)</span><span>${rp(total())}</span></div>`;}

/* QRIS tiruan (pola acak, hanya ilustrasi) */
function qr(){let s=7;const r=()=>(s=(s*9301+49297)%233280)/233280;let c='';
 for(let y=0;y<25;y++)for(let x=0;x<25;x++){let on;
  if((x<7||x>17)&&(y<7||y>17)&&!(x>17&&y>17)){const a=x>17?x-18:x,b=y>17?y-18:y;on=a==0||a==6||b==0||b==6||(a>=2&&a<=4&&b>=2&&b<=4);}
  else on=r()>0.5;
  if(on)c+=`<rect x='${x}' y='${y}' width='1' height='1'/>`;}
 return `<svg viewBox='0 0 25 25' class='w-full' fill='#050d1c' shape-rendering='crispEdges'>${c}</svg>`;}

/* ---------- tampilan tiap langkah ---------- */
const VIEWS={
 form:()=>`<h3 class='font-serif text-2xl text-white'>Paket ${S.plan.n} <span class='text-gray-400 text-sm font-sans'>${S.plan.p?rp(S.plan.p)+'/bln':'Gratis'}</span></h3>
 <div class='mt-5 space-y-3'><input id='fName' class='${IN}' placeholder='Nama lengkap' value='${esc(S.name)}' autocomplete='name'>
 <input id='fEmail' type='email' class='${IN}' placeholder='Email aktif' value='${esc(S.email)}' autocomplete='email'>
 ${S.plan.ktm?`<input id='fCampus' class='${IN}' placeholder='Nama kampus dan NIM' value='${esc(S.campus)}'><label class='block text-xs text-gray-400'>Foto KTM aktif ${S.ktm?'<span class=text-[#8fd8ff]>✓ '+esc(S.ktm)+'</span>':''}<input id='fKtm' type='file' accept='image/*' class='${IN} mt-1 text-xs'></label>`:''}</div>
 <p id='ckErr' class='text-xs text-red-400 mt-3 min-h-[1rem]'></p>
 <div class='mt-3 flex justify-end'><button data-act='toNext' class='${BTN}'>${S.plan.p?'Lanjut ke pembayaran':'Buat akun gratis'}</button></div>`,

 method:()=>`<h3 class='font-serif text-2xl text-white'>Pilih metode pembayaran</h3>
 <div class='mt-4 space-y-2'>${METHODS.map(([k,t,d])=>`<label class='flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer ${S.method===k?'border-[#8fd8ff] bg-[#8fd8ff]/5':'border-white/15'}'><input type='radio' name='m' value='${k}' ${S.method===k?'checked':''} class='accent-[#8fd8ff]'><span><b class='text-white text-sm block'>${t}</b><span class='text-xs text-gray-400'>${d}</span></span></label>`).join('')}</div>
 ${S.method==='va'?`<select id='fBank' class='${IN} ck-select mt-3' aria-label='Pilih bank'>${opts(['BCA','Mandiri','BNI','BRI'],S.bank)}</select>`:''}
 ${S.method==='ew'?`<select id='fWallet' class='${IN} ck-select mt-3' aria-label='Pilih e-wallet'>${opts(['GoPay','OVO','ShopeePay','DANA'],S.wallet)}</select>`:''}
 ${S.method==='card'?`<div class='mt-3 space-y-2'><input id='fCard' inputmode='numeric' class='${IN}' placeholder='Nomor kartu 16 digit'><div class='grid grid-cols-2 gap-2'><input id='fExp' inputmode='numeric' class='${IN}' placeholder='MM/YY'><input id='fCvv' inputmode='numeric' maxlength='3' class='${IN}' placeholder='CVV'></div></div>`:''}
 <div class='mt-4 grid grid-cols-2 gap-3'><select id='fPeriod' class='${IN} ck-select' aria-label='Periode langganan'><option value='1'>Bulanan</option><option value='12' ${S.months===12?'selected':''}>Tahunan (hemat 20%)</option></select>
 <div class='flex gap-2'><input id='fPromo' class='${IN}' placeholder='Kode promo' value='${esc(S.promo)}'><button data-act='promo' class='px-4 rounded-xl border border-white/20 text-sm text-white hover:bg-white/10'>Pakai</button></div></div>
 
 <div id='ckSum' class='mt-4 glass rounded-xl p-4 text-sm'>${sum()}</div>
 <p id='ckErr' class='text-xs text-red-400 mt-3 min-h-[1rem]'></p>
 <div class='mt-2 flex justify-between items-center'><button data-act='back' class='text-sm text-gray-400 hover:text-white'>Kembali</button><button data-act='pay' class='${BTN}'>Bayar ${rp(total())}</button></div>`,

 pay:()=>{const m=S.method;let box='';
  if(m==='qris')box=`<div class='bg-white rounded-2xl p-3 w-52 mx-auto'>${qr()}</div><p class='text-center text-xs text-gray-400 mt-3'>Scan dengan aplikasi e-wallet atau m-banking apa pun</p>`;
  else if(m==='va')box=`<p class='text-xs text-gray-400'>Nomor Virtual Account ${S.bank}</p><div class='flex items-center justify-between glass rounded-xl p-4 mt-1'><span class='font-mono text-lg text-white tracking-wider'>${S.va}</span><button data-act='copy' class='text-xs text-[#8fd8ff]'>Salin</button></div><ol class='list-decimal pl-5 mt-4 text-xs text-gray-300 space-y-1'><li>Buka m-banking ${S.bank}, pilih Transfer › Virtual Account</li><li>Masukkan nomor di atas</li><li>Pastikan nominal ${rp(total())}, lalu konfirmasi</li></ol>`;
  else if(m==='ew')box=`<p class='text-sm text-gray-300'>Permintaan pembayaran dikirim ke aplikasi <b class='text-white'>${S.wallet}</b> kamu.</p><ol class='list-decimal pl-5 mt-3 text-xs text-gray-300 space-y-1'><li>Buka aplikasi ${S.wallet}</li><li>Ketuk notifikasi “NexaCode AI”</li><li>Konfirmasi dengan PIN</li></ol>`;
  else box=`<p class='text-sm text-gray-300'>Bank penerbit mengirim kode OTP ke ponselmu. Masukkan 6 digit (demo: angka bebas).</p><input id='fOtp' maxlength='6' inputmode='numeric' class='${IN} mt-3 text-center tracking-[.5em]' placeholder='••••••'>`;
  return `<h3 class='font-serif text-2xl text-white'>Selesaikan pembayaran</h3><p class='text-sm text-gray-400 mt-1'>Order ${S.order} · <b class='text-white'>${rp(total())}</b></p><div class='mt-5'>${box}</div><p class='mt-4 text-xs text-gray-400'>Bayar dalam <b id='cd' class='text-[#8fd8ff]'>15:00</b></p><p id='ckErr' class='text-xs text-red-400 mt-2 min-h-[1rem]'></p><div class='mt-2 flex justify-between items-center'><button data-act='back' class='text-sm text-gray-400 hover:text-white'>Ganti metode</button><button data-act='paid' class='${BTN}'>${m==='card'?'Verifikasi OTP':'Saya sudah bayar'}</button></div>`;},

 done:()=>`<div class='text-center'><div class='w-16 h-16 mx-auto rounded-full bg-[#8fd8ff]/15 text-[#8fd8ff] flex items-center justify-center text-3xl'>✓</div><h3 class='font-serif text-2xl text-white mt-4'>${S.plan.p?'Pembayaran berhasil!':'Akun berhasil dibuat!'}</h3><p class='text-sm text-gray-400 mt-1'>Selamat datang, ${esc(S.name.split(' ')[0])}. Struk dan lisensi dikirim ke ${esc(S.email)}.</p></div>
 <div class='glass rounded-xl p-4 mt-5 text-sm space-y-1.5'><div class='flex justify-between'><span class='text-gray-400'>Order ID</span><span class='text-white font-mono'>${S.order}</span></div><div class='flex justify-between'><span class='text-gray-400'>Paket</span><span class='text-white'>${S.plan.n}</span></div><div class='flex justify-between'><span class='text-gray-400'>Total dibayar</span><span class='text-white'>${rp(total())}</span></div><div class='flex justify-between'><span class='text-gray-400'>Kunci lisensi</span><span class='text-[#8fd8ff] font-mono'>${S.lic}</span></div></div>
 ${S.plan.ktm?`<p class='text-xs text-yellow-300/90 mt-3'>KTM sedang diverifikasi (maks. 24 jam). Paket tetap aktif penuh selama proses.</p>`:''}
 <ol class='list-decimal pl-5 mt-4 text-xs text-gray-300 space-y-1'><li>Install NexaCode AI dari VS Code Marketplace</li><li>Login dengan email ${esc(S.email)}</li><li>Tekan Ctrl+I dan mulai ngoding dengan bahasamu sendiri</li></ol>
 <div class='mt-5 flex flex-wrap justify-center gap-3'><a href='https://marketplace.visualstudio.com/search?term=NexaCode%20AI' target='_blank' rel='noopener' class='${BTN}'>Install di VS Code</a><button data-act='close' class='px-6 py-3 rounded-full border border-white/20 text-sm text-white hover:bg-white/10'>Tutup</button></div>`
};

/* ---------- render & alur ---------- */
function render(){clearInterval(timer);
 const paid=S.plan.p>0, labels=paid?['Data diri','Metode','Bayar','Selesai']:['Data diri','Selesai'], key=(paid?['form','method','pay','done']:['form','done'])[S.step];
 H.innerHTML=labels.map((l,i)=>`<div class='flex-1 text-center text-[11px] ${i<=S.step?'text-[#8fd8ff]':'text-gray-500'}'><div class='h-1 rounded-full mb-2 ${i<=S.step?'bg-[#8fd8ff]':'bg-white/10'}'></div>${l}</div>`).join('');
 B.innerHTML=VIEWS[key]();
 if(key==='pay')timer=setInterval(()=>{const t=Math.max(0,S.exp-Date.now()),c=$('cd');if(c)c.textContent=Math.floor(t/60000)+':'+String(Math.floor(t/1000)%60).padStart(2,'0');},1000);}
function open(p){S={plan:p,months:1,step:0,method:'',promo:'',name:'',email:'',campus:'',ktm:'',bank:'BCA',wallet:'GoPay'};render();M.classList.remove('hidden');M.classList.add('flex');}
function close(){clearInterval(timer);M.classList.add('hidden');M.classList.remove('flex');}
function finish(){B.innerHTML=`<div class='py-16 text-center'><div class='w-10 h-10 mx-auto rounded-full border-2 border-white/20 border-t-[#8fd8ff] animate-spin'></div><p class='mt-4 text-sm text-gray-300'>Memverifikasi pembayaran…</p></div>`;setTimeout(()=>{S.step=S.plan.p?3:1;S.lic=[gen(),gen(),gen(),gen()].join('-');render();},2000);}

const ACT={
 close,
 back(){S.step=Math.max(0,S.step-1);render();},
 copy(){try{navigator.clipboard.writeText(S.va);}catch(e){}},
 promo(){const v=$('fPromo').value.trim().toUpperCase();if(v===''||v==='NEXA10'){S.promo=v;$('ckSum').innerHTML=sum();err('');}else err('Kode promo tidak valid.');},
 toNext(){const n=$('fName').value.trim(),e=$('fEmail').value.trim();
  if(n.length<2)return err('Isi nama lengkap kamu.');
  if(!e.includes('@')||!e.split('@')[1].includes('.'))return err('Format email belum benar.');
  S.name=n;S.email=e;
  if(S.plan.ktm){const c=$('fCampus').value.trim(),f=$('fKtm').files[0];if(c.length<4)return err('Isi nama kampus dan NIM.');if(!f&&!S.ktm)return err('Unggah foto KTM aktif untuk harga mahasiswa.');S.campus=c;if(f)S.ktm=f.name;}
  S.order='NXC-'+Date.now().toString(36).toUpperCase();
  if(S.plan.p){S.step=1;render();}else finish();},
 pay(){if(!S.method)return err('Pilih metode pembayaran dulu.');
  if(S.method==='card'){const n=$('fCard').value.replace(/[^0-9]/g,''),x=$('fExp').value,v=$('fCvv').value;
   if(n.length!==16)return err('Nomor kartu harus 16 digit.');if(x.length!==5)return err('Masa berlaku format MM/YY.');if(v.length!==3)return err('CVV harus 3 digit.');}
  S.va=({BCA:'39',Mandiri:'88',BNI:'98',BRI:'26'}[S.bank]||'39')+String(Date.now()).slice(-11);
  S.exp=Date.now()+15*60000;S.step=2;render();},
 paid(){if(Date.now()>S.exp)return err('Waktu pembayaran habis. Ganti metode untuk membuat tagihan baru.');
  if(S.method==='card'&&$('fOtp').value.length!==6)return err('Masukkan 6 digit kode OTP.');
  finish();}
};
M.addEventListener('click',e=>{const t=e.target.closest('[data-act]');if(t&&ACT[t.dataset.act])ACT[t.dataset.act]();else if(e.target===M)close();});
M.addEventListener('change',e=>{const t=e.target;
 if(t.name==='m'){S.method=t.value;render();}
 else if(t.id==='fPeriod'){S.months=+t.value;$('ckSum').innerHTML=sum();document.querySelector('[data-act=pay]').textContent='Bayar '+rp(total());}
 else if(t.id==='fBank')S.bank=t.value;else if(t.id==='fWallet')S.wallet=t.value;});
M.addEventListener('input',e=>{const t=e.target;
 if(t.id==='fCard')t.value=t.value.replace(/[^0-9]/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
 if(t.id==='fExp'){let v=t.value.replace(/[^0-9]/g,'').slice(0,4);t.value=v.length>2?v.slice(0,2)+'/'+v.slice(2):v;}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
document.querySelectorAll('#harga a[href="#"]').forEach(a=>{const p=PLANS[a.textContent.trim()];if(p)a.addEventListener('click',e=>{e.preventDefault();open(p);});});
})();
