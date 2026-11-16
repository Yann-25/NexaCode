/* NexaCode product demo: complete Indonesian/English copy, including dynamic output. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const K = text => `<span class="text-[#9bb8ff]">${text}</span>`;
  const G = text => `<span class="text-[#8fd8ff]">${text}</span>`;
  const Y = text => `<span class="text-[#e9c9a4]">${text}</span>`;

  // Each step has an Indonesian and an English version; no automatic translation
  // of source-code snippets or mixed HTML is required.
  const SC = [
    {
      file: 'api/login.py', duration: 7,
      id: {
        name: 'Tulis perintah', prompt: '> buatkan fungsi login dengan JWT dan validasi password',
        output: [K('def') + ' login(email, password):',
          '&nbsp;&nbsp;user = db.users.find(email=email)',
          '&nbsp;&nbsp;' + K('if not') + ' verify(password, user.hash):',
          '&nbsp;&nbsp;&nbsp;&nbsp;' + K('raise') + ' AuthError(' + Y('"Email atau password salah"') + ')',
          '&nbsp;&nbsp;' + K('return') + ' issue_jwt(user.id, ttl=3600)',
          G('✓ Kode dan penjelasan siap — demo simulasi')]
      },
      en: {
        name: 'Write a prompt', prompt: '> create a login function with JWT and password validation',
        output: [K('def') + ' login(email, password):',
          '&nbsp;&nbsp;user = db.users.find(email=email)',
          '&nbsp;&nbsp;' + K('if not') + ' verify(password, user.hash):',
          '&nbsp;&nbsp;&nbsp;&nbsp;' + K('raise') + ' AuthError(' + Y('"Invalid email or password"') + ')',
          '&nbsp;&nbsp;' + K('return') + ' issue_jwt(user.id, ttl=3600)',
          G('✓ Code and explanation ready — simulated demo')]
      }
    },
    {
      file: 'ProductList.jsx', duration: 7,
      id: {
        name: 'Error? Satu klik', prompt: "> perbaiki: Cannot read properties of undefined (reading 'map')",
        output: ["<span class='text-gray-500'>// Penyebab: items undefined sebelum data dimuat</span>",
          "<span class='text-red-400'>- items.map(i =&gt; i.nama)</span>",
          "<span class='text-[#8fd8ff]'>+ (items ?? []).map(i =&gt; i.nama)</span>",
          G('✓ Akar masalah ditemukan · Tinjau perbaikan')]
      },
      en: {
        name: 'Fix errors in one click', prompt: "> fix: Cannot read properties of undefined (reading 'map')",
        output: ["<span class='text-gray-500'>// Cause: items is undefined before data loads</span>",
          "<span class='text-red-400'>- items.map(i =&gt; i.nama)</span>",
          "<span class='text-[#8fd8ff]'>+ (items ?? []).map(i =&gt; i.nama)</span>",
          G('✓ Root cause identified · Review suggested fix')]
      }
    },
    {
      file: 'tests/login.test.js', duration: 7,
      id: {
        name: 'Test otomatis', prompt: '> buatkan unit test untuk login() lengkap dengan edge case',
        output: ['PASS&nbsp; login benar → token valid', 'PASS&nbsp; password salah → AuthError',
          'PASS&nbsp; email kosong → ditolak', 'PASS&nbsp; password 1000 karakter → aman',
          G('✓ 4 dari 4 test lulus — simulasi')]
      },
      en: {
        name: 'Automated tests', prompt: '> generate unit tests for login() including edge cases',
        output: ['PASS&nbsp; valid login → valid token', 'PASS&nbsp; incorrect password → AuthError',
          'PASS&nbsp; empty email → rejected', 'PASS&nbsp; 1000-character password → handled',
          G('✓ 4 of 4 tests passed — simulation')]
      }
    },
    {
      file: 'Cloud Hosting', duration: 7,
      id: {
        name: 'Deploy 1 klik', prompt: '> deploy ke Cloud Hosting',
        output: ['Membangun proyek… selesai', 'Menjalankan pipeline CI… berhasil',
          'Mengunggah ke cloud… selesai', G('✓ Preview: https://tugas-toko.nexa.app (contoh)')]
      },
      en: {
        name: 'One-click deploy', prompt: '> deploy to Cloud Hosting',
        output: ['Building project… complete', 'Running CI pipeline… successful',
          'Uploading to cloud… complete', G('✓ Preview: https://tugas-toko.nexa.app (example)')]
      }
    },
    {
      file: 'NexaCode AI', duration: 7, cta: true,
      id: { name: 'Giliranmu', prompt: '', output: [] },
      en: { name: 'Your turn', prompt: '', output: [] }
    }
  ];

  const total = SC.reduce((seconds, step) => seconds + step.duration, 0);
  let elapsed = 0;
  let playing = false;
  let last = 0;
  let seen = false;
  let renderKey = '';
  const lang = () => window.NexaI18n?.language() === 'en' ? 'en' : 'id';
  const stepStart = index => SC.slice(0, index).reduce((seconds, step) => seconds + step.duration, 0);

  function renderChapters() {
    const language = lang();
    $('vchap').innerHTML = SC.map((step, i) =>
      `<button class="chap shrink-0" data-i="${i}"><b>${i + 1}. ${step[language].name}</b></button>`
    ).join('');
  }

  function render() {
    let index = 0;
    while (index < SC.length - 1 && elapsed >= stepStart(index + 1)) index++;
    const language = lang();
    const step = SC[index];
    const copy = step[language];
    const stepElapsed = elapsed - stepStart(index);
    const nextKey = `${language}:${index}:${Math.floor(stepElapsed * 30)}`;
    if (nextKey === renderKey) return;
    renderKey = nextKey;

    $('vstep').textContent = language === 'en'
      ? `STEP ${index + 1} OF ${SC.length} · ${copy.name.toUpperCase()}`
      : `LANGKAH ${index + 1} DARI ${SC.length} · ${copy.name.toUpperCase()}`;
    $('vfile').textContent = `${step.file} — NexaCode AI`;
    $('vprompt').textContent = copy.prompt.slice(0, Math.min(copy.prompt.length, Math.floor(stepElapsed * 32)));

    const out = $('vout');
    if (step.cta) {
      if (out.dataset.cta !== language) {
        delete out.dataset.s;
        out.dataset.cta = language;
        out.innerHTML = language === 'en' ?
          `<div class="font-sans text-center py-8"><div class="font-serif text-3xl text-white">Ready to code with confidence?</div><p class="text-gray-400 mt-2">The basic plan is free. No credit card required.</p><a href="#harga" class="inline-block mt-6 px-7 py-3 rounded-full bg-gradient-to-r from-[#4f8cff] to-[#8fd8ff] text-black font-semibold">Install for Free</a></div>` :
          `<div class="font-sans text-center py-8"><div class="font-serif text-3xl text-white">Siap ngoding lebih tenang?</div><p class="text-gray-400 mt-2">Gratis untuk paket dasar. Tanpa kartu kredit.</p><a href="#harga" class="inline-block mt-6 px-7 py-3 rounded-full bg-gradient-to-r from-[#4f8cff] to-[#8fd8ff] text-black font-semibold">Install Gratis Sekarang</a></div>`;
      }
    } else {
      delete out.dataset.cta;
      const visibleLines = Math.max(0, Math.floor((stepElapsed - 1.8) / 0.55) + 1);
      const outputKey = `${language}:${index}`;
      if (out.dataset.s !== outputKey) {
        out.dataset.s = outputKey;
        out.innerHTML = copy.output.map(line => `<div class="vline">${line}</div>`).join('');
      }
      [...out.children].forEach((node, j) => node.classList.toggle('in', j < visibleLines));
    }
    document.querySelectorAll('.chap').forEach((button, j) => button.classList.toggle('on', j === index));
    $('vbar').style.width = (elapsed / total * 100) + '%';
    $('vtime').textContent = `${Math.floor(elapsed / 60)}:${String(Math.floor(elapsed % 60)).padStart(2, '0')} / 0:${total}`;
  }

  function tick(now) {
    if (!playing) return;
    elapsed += (now - last) / 1000;
    last = now;
    if (elapsed >= total) elapsed = 0;
    render();
    requestAnimationFrame(tick);
  }
  function setPlay(state) {
    const wasPlaying = playing;
    playing = state;
    $('vplay').textContent = lang() === 'en'
      ? (playing ? '⏸ Pause' : '▶ Play')
      : (playing ? '⏸ Jeda' : '▶ Putar');
    $('vbig').classList.toggle('hidden', playing);
    $('vbig').classList.toggle('flex', !playing);
    if (playing && !wasPlaying) {
      last = performance.now();
      requestAnimationFrame(tick);
    }
  }
  $('vplay').addEventListener('click', () => setPlay(!playing));
  $('vbig').addEventListener('click', () => setPlay(true));
  $('vrep').addEventListener('click', () => { elapsed = 0; renderKey = ''; render(); setPlay(true); });
  $('vchap').addEventListener('click', event => {
    const button = event.target.closest('.chap');
    if (!button) return;
    elapsed = stepStart(Number(button.dataset.i)) + 0.01;
    renderKey = '';
    render();
    if (!playing) setPlay(true);
  });
  new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { if (!seen) { seen = true; setPlay(true); } }
    else if (playing) setPlay(false);
  }), { threshold: 0.35 }).observe($('vp'));

  function refreshLanguage() {
    renderKey = '';
    renderChapters();
    render();
    setPlay(playing);
  }
  renderChapters();
  render();
  setPlay(false);
  document.addEventListener('nexa:langchange', refreshLanguage);
})();
