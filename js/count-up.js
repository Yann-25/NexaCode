/* Angka statistik: menghitung naik dari 0 setiap kali terlihat */
(function(){
const els=[...document.querySelectorAll('.cnt')];if(!els.length)return;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fmt=(v,d)=>v.toLocaleString('id-ID',{minimumFractionDigits:d,maximumFractionDigits:d});
const ease=t=>1-Math.pow(1-t,4);
function show(el,v){const d=+el.dataset.dec;el.textContent=(el.dataset.pre||'').replace('&lt;','<')+fmt(v,d)+(el.dataset.suf||'')}
function run(el){
 const to=parseFloat(el.dataset.to),dur=1800+Math.min(1200,to*.2);cancelAnimationFrame(el._r);
 if(reduce){show(el,to);return}
 const t0=performance.now();el.closest('.statc')?.classList.add('counting');
 (function tick(now){const p=Math.min(1,(now-t0)/dur);show(el,to*ease(p));
  if(p<1)el._r=requestAnimationFrame(tick);else el.closest('.statc')?.classList.remove('counting')})(t0);
}
const io=new IntersectionObserver(es=>es.forEach(e=>{
 if(e.isIntersecting)run(e.target);else{cancelAnimationFrame(e.target._r);show(e.target,0)}
}),{threshold:.6});
els.forEach(el=>{show(el,0);io.observe(el)});
})();
