/* Tooltip kolom Produk: menjelaskan isi dan tujuan tiap link */
  (function(){
    const TIPS = {
      'Fitur': 'Lihat semua fitur. Menggulir ke bagian Fitur di halaman ini.',
      'Harga': 'Bandingkan 4 paket. Menggulir ke bagian Harga.',
      'GitHub Sync': 'Sinkronisasi repo, branch, dan PR otomatis. Buka penjelasan lengkap.',
      'Cloud Hosting': 'Deploy instan dan CI/CD. Menggulir ke kartu Cloud Sync.',
      'Changelog': 'Riwayat rilis terbaru. Buka daftar pembaruan.'
    };
    document.querySelectorAll('footer a').forEach(a => {
      const t = TIPS[a.textContent.trim()];
      if (t) { a.classList.add('tip'); a.setAttribute('data-tip', t); }
    });
  })();
