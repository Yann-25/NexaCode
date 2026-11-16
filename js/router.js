/* ===== Router halaman: tiap menu membuka halamannya sendiri, tidak satu halaman panjang ===== */
(function(){
const pages=[...document.querySelectorAll('.page')],links=[...document.querySelectorAll('#navLinks a,#mobileMenu a[href^="#"]')];
const HOME='beranda';let cur=null;
function show(id,first){
  let el=id&&document.getElementById(id);
  if(!el||!el.closest('.page')){id=HOME;el=document.getElementById(HOME)}
  const pg=el.closest('.page'),changed=pg!==cur;
  if(changed){pages.forEach(p=>p.classList.toggle('on',p===pg));cur=pg;document.title='NexaCode AI – '+({beranda:'Asisten Pair-Programming di VS Code',demo:'Demo',fitur:'Fitur',tentang:'Tentang Kami',harga:'Harga',faq:'FAQ',kontak:'Kontak'}[pg.dataset.page]||'')}
  window.NexaI18n?.refresh();
  links.forEach(a=>a.classList.toggle('act',a.getAttribute('href')==='#'+id||(id!==pg.dataset.page&&a.getAttribute('href')==='#'+pg.dataset.page&&!links.some(b=>b.getAttribute('href')==='#'+id))));
  const top=el===pg.querySelector('section')||id===pg.dataset.page;
  requestAnimationFrame(()=>{
    if(top)scrollTo({top:0,behavior:'instant'});else el.scrollIntoView({behavior:changed?'instant':'smooth',block:'start'});
    dispatchEvent(new Event('resize'));dispatchEvent(new Event('scroll'));
  });
}
addEventListener('hashchange',()=>show(location.hash.slice(1)));
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const h=a.getAttribute('href');if(h.length<2)return;
  if(h.slice(1)===location.hash.slice(1)){e.preventDefault();show(h.slice(1))}});
show(location.hash.slice(1),true);
})();
