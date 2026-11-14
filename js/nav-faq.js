// --- Mobile menu toggle ---
  const menuBtn = document.getElementById('menuBtn'), menu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click', () => {
    const open = menu.classList.toggle('hidden') === false;
    menu.classList.toggle('flex', open);
    menuBtn.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.classList.add('hidden'); menu.classList.remove('flex'); }));

  // --- FAQ accordion: one open at a time ---
  document.querySelectorAll('.faq-item > button').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement, wasOpen = item.dataset.open === 'true';
      document.querySelectorAll('.faq-item').forEach(i => { i.dataset.open = 'false'; i.firstElementChild.setAttribute('aria-expanded', 'false'); });
      if (!wasOpen) { item.dataset.open = 'true'; btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  // --- Hero terminal: type the prompt once, then reveal generated code ---
  const text = '> buatkan fungsi login dengan JWT dan validasi password', el = document.getElementById('typed'), res = document.getElementById('result');
  let i = 0;
  (function type() { return; /* diganti loop otomatis di skrip bawah */
    if (i <= text.length) { el.textContent = text.slice(0, i++); setTimeout(type, 35); }
    else { el.classList.remove('cursor'); res.style.opacity = 1; }
  })();
