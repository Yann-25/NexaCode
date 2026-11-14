/* Cerita Kami: jam bergerak dari 02.17 ke 06.12 mengikuti scroll */
(function(){
const sec=document.getElementById('cerita'),clk=document.getElementById('stClock'),bar=document.getElementById('stBar'),st=document.getElementById('stStage');
if(!sec||!clk)return;
const A=2*60+17,B=6*60+12;
function upd(){
 const r=sec.getBoundingClientRect();if(!r.height)return;
 const p=Math.min(1,Math.max(0,(innerHeight*.6-r.top)/(r.height-innerHeight*.1)));
 const m=Math.round(A+(B-A)*p),h=Math.floor(m/60),mm=m%60;
 clk.textContent=String(h).padStart(2,'0')+'.'+String(mm).padStart(2,'0');
 bar.style.width=(p*100)+'%';
 st.textContent=p<.34?'dini hari':p<.7?'menjelang subuh':p<.97?'fajar':'pagi';
}
addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
})();
