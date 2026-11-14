(function(){
const $=id=>document.getElementById(id),K=t=>`<span class='text-[#9bb8ff]'>${t}</span>`,G=t=>`<span class='text-[#8fd8ff]'>${t}</span>`,Y=t=>`<span class='text-[#e9c9a4]'>${t}</span>`;
const SC=[
{n:'Tulis perintah',f:'api/login.py',d:7,p:'> buatkan fungsi login dengan JWT dan validasi password',o:[K('def')+' login(email, password):','&nbsp;&nbsp;user = db.users.find(email=email)','&nbsp;&nbsp;'+K('if not')+' verify(password, user.hash):','&nbsp;&nbsp;&nbsp;&nbsp;'+K('raise')+' AuthError('+Y('"Email atau password salah"')+')','&nbsp;&nbsp;'+K('return')+' issue_jwt(user.id, ttl=3600)',G('✓ Kode + penjelasan siap dalam 98 ms')]},
{n:'Error? Satu klik',f:'ProductList.jsx',d:7,p:"> perbaiki: Cannot read properties of undefined (reading 'map')",o:["<span class='text-gray-500'>// Penyebab: items undefined sebelum data dimuat</span>","<span class='text-red-400'>- items.map(i =&gt; i.nama)</span>","<span class='text-[#8fd8ff]'>+ (items ?? []).map(i =&gt; i.nama)</span>",G('✓ Akar masalah ditemukan · Terapkan perbaikan')]},
{n:'Test otomatis',f:'tests/login.test.js',d:7,p:'> buatkan unit test untuk login() lengkap dengan edge case',o:['PASS&nbsp; login benar → token valid','PASS&nbsp; password salah → AuthError','PASS&nbsp; email kosong → ditolak','PASS&nbsp; password 1000 karakter → aman',G('✓ 4 dari 4 test lulus')]},
{n:'Deploy 1 klik',f:'Cloud Hosting',d:7,p:'> deploy ke Cloud Hosting',o:['Membangun proyek… selesai','Menjalankan pipeline CI… hijau','Mengunggah ke cloud… selesai',G('✓ Online: https://tugas-toko.nexa.app')]},
{n:'Giliranmu',f:'NexaCode AI',d:7,p:'',cta:1,o:[]}];
const T=SC.reduce((a,s)=>a+s.d,0);let t=0,play=false,last=0,seen=false,key='';
$('vtime').textContent='0:00 / 0:'+T;
$('vchap').innerHTML=SC.map((s,i)=>`<button class='chap shrink-0' data-i='${i}'><b>${i+1}. ${s.n}</b></button>`).join('');
const st=i=>SC.slice(0,i).reduce((a,s)=>a+s.d,0);
function render(){
 let i=0;while(i<SC.length-1&&t>=st(i+1))i++;const s=SC[i],e=t-st(i);
 const k=i+':'+Math.floor(e*30);if(k===key)return;key=k;
 $('vstep').textContent=(window.NexaI18n?.language()==='en'?'Step '+(i+1)+' of '+SC.length+' · ':'Langkah '+(i+1)+' dari '+SC.length+' · ')+(window.NexaI18n?.tr(s.n)||s.n);$('vfile').textContent=s.f+' — NexaCode AI';
 const prompt=window.NexaI18n?.tr(s.p)||s.p;const n=Math.min(prompt.length,Math.floor(e*32));$('vprompt').textContent=prompt.slice(0,n);
 const out=$('vout');
 if(s.cta){if(!out.dataset.cta){out.dataset.cta=1;out.innerHTML="<div class='font-sans text-center py-8'><div class='font-serif text-3xl text-white'>Siap ngoding lebih tenang?</div><p class='text-gray-400 mt-2'>Gratis selamanya untuk paket dasar. Tanpa kartu kredit.</p><a href='#harga' class='inline-block mt-6 px-7 py-3 rounded-full bg-gradient-to-r from-[#4f8cff] to-[#8fd8ff] text-black font-semibold'>Install Gratis Sekarang</a></div>";}}
 else{delete out.dataset.cta;const c=Math.max(0,Math.floor((e-1.8)/.55)+1);
  if(out.dataset.s!==String(i)){out.dataset.s=i;out.innerHTML=s.o.map(l=>`<div class='vline'>${l}</div>`).join('');}
  [...out.children].forEach((d,j)=>d.classList.toggle('in',j<c));}
 document.querySelectorAll('.chap').forEach((b,j)=>b.classList.toggle('on',j===i));
 $('vbar').style.width=(t/T*100)+'%';$('vtime').textContent=Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0')+' / 0:'+T;}
function tick(now){if(play){t+=(now-last)/1000;last=now;if(t>=T)t=0;render();requestAnimationFrame(tick);}}
function go(p){play=p;$('vplay').textContent=window.NexaI18n?.language()==='en'?(p?'⏸ Pause':'▶ Play'):(p?'⏸ Jeda':'▶ Putar');$('vbig').classList.toggle('hidden',p);$('vbig').classList.toggle('flex',!p);if(p){last=performance.now();requestAnimationFrame(tick);}}
$('vplay').onclick=()=>go(!play);$('vbig').onclick=()=>go(true);
$('vrep').onclick=()=>{t=0;key='';render();go(true);};
$('vchap').onclick=e=>{const b=e.target.closest('.chap');if(b){t=st(+b.dataset.i)+.01;key='';render();if(!play)go(true);}};
new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){if(!seen){seen=true;go(true);}}else if(play)go(false);}),{threshold:.35}).observe($('vp'));
render();go(false);document.addEventListener('nexa:langchange',()=>{key='';render();go(play);});
})();
