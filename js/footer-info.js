// Konten setiap link footer (kunci = teks link)
  const li = a => '<ul class="list-disc pl-5 space-y-1.5">' + a.map(x => '<li>' + x + '</li>').join('') + '</ul>';
  const INFO = {
    'GitHub': ['GitHub NexaCode', '<p>Kode sumber SDK, contoh proyek, dan template resmi kami ada di github.com/nexacode-ai.</p>' + li(['Laporkan bug lewat Issues', 'Kirim Pull Request untuk contoh &amp; template', 'Beri bintang agar kami makin semangat'])],
    'Discord': ['Komunitas Discord', '<p>Gabung bersama 5.000+ mahasiswa dan developer untuk tanya jawab, berbagi proyek, dan sesi live coding tiap Jumat malam.</p>' + li(['#bantuan-ngoding: dijawab komunitas &amp; tim', '#showcase: pamerkan proyekmu', '#info-update: pengumuman rilis terbaru'])],
    'YouTube': ['Kanal YouTube', '<p>Tutorial singkat: dari install pertama sampai deploy ke cloud. Video baru tayang setiap minggu.</p>'],
    'Instagram': ['Instagram @nexacode.ai', '<p>Tips ngoding harian, infografik, dan info promo khusus mahasiswa.</p>'],
    'GitHub Sync': ['GitHub Sync', '<p>Hubungkan akun GitHub atau GitLab sekali, lalu kelola semuanya dari VS Code.</p>' + li(['Buat branch, commit, dan Pull Request otomatis', 'Ringkasan perubahan ditulis AI', 'Resolusi merge conflict dengan saran perbaikan', 'Sinkronisasi dua arah dengan Cloud Hosting'])],
    'Changelog': ['Changelog', '<p><b class="text-white">v2.4 (terbaru)</b></p>' + li(['Offline Mode lebih ringan, ukuran model turun 35%', 'Refactor multi-file di Developer Plus', 'Preview URL otomatis tiap commit']) + '<p class="pt-2"><b class="text-white">v2.3</b></p>' + li(['Mentor Mode: kuis latihan', 'Dukungan Dart &amp; Flutter', 'Perbaikan latensi autocomplete (&lt;120 ms)'])],
    'API Docs': ['API Docs', '<p>Integrasikan NexaCode ke alat internal timmu lewat REST API.</p><pre class="bg-black/50 border border-white/10 rounded-xl p-4 text-xs overflow-x-auto text-[#8fd8ff]">curl https://api.nexacode.ai/v1/complete \\\n  -H "Authorization: Bearer $NEXA_KEY" \\\n  -d \'{"prompt":"buat fungsi sorting"}\'</pre>' + li(['Autentikasi dengan API key', 'Streaming respons (SSE)', 'Batas: 60 permintaan/menit di paket Developer Plus'])],
    'Panduan Memulai': ['Panduan Memulai', li(['Buka VS Code, tekan Ctrl+Shift+X, cari “NexaCode AI”', 'Klik Install, lalu login dengan Google atau GitHub', 'Tekan Ctrl+I dan ketik perintah dengan bahasamu sendiri', 'Tekan Tab untuk menerima saran, Esc untuk menolak', 'Aktifkan Mentor Mode dari panel samping untuk penjelasan'])],
    
    'Status Sistem': ['Status Sistem', '<p class="text-[#8fd8ff]">● Semua sistem beroperasi normal</p>' + li(['Autocomplete: operasional (uptime 99,9%)', 'Cloud Hosting: operasional', 'API: operasional', 'Insiden terakhir: tidak ada dalam 30 hari'])],
    'Tentang Kami': ['Tentang Kami', '<p>NexaCode lahir dari kebiasaan begadang para pendirinya saat kuliah: terlalu banyak waktu habis untuk bug sepele. Kami membangun asisten AI yang menjelaskan, bukan hanya menjawab, supaya developer belajar sambil berkarya.</p><p>Tim kecil berbasis di Jakarta, dengan misi membuat alat kelas dunia terjangkau untuk mahasiswa.</p>'],
    'Karier': ['Karier', '<p>Kami sedang mencari:</p>' + li(['Senior Backend Engineer (Go/Python), remote', 'Developer Advocate, Jakarta/hybrid', 'ML Engineer, Jakarta', 'Community Manager, remote']) + '<p>Kirim CV ke karier@nexacode.ai.</p>'],
    'VIP Hotline': ['VIP Hotline', '<p>Khusus pelanggan Pro Suite: respons prioritas kurang dari 1 jam.</p>' + li(['Telepon: 0800-1234-5678 (Senin–Sabtu, 08.00–22.00 WIB)', 'WhatsApp: +62 812-0000-0000', 'Email: vip@nexacode.ai'])],
    'Privacy Policy': ['Privacy Policy', '<p>Ringkasan komitmen privasi kami:</p>' + li(['Zero Data Retention: kode dan prompt tidak disimpan', 'Data tidak dipakai untuk melatih model', 'Transmisi dienkripsi TLS 1.3', 'Kecualikan file sensitif lewat .nexaignore', 'Hapus akun dan seluruh data kapan saja dari dashboard'])],
    'Syarat & Ketentuan': ['Syarat &amp; Ketentuan', li(['Pengguna bertanggung jawab atas kode yang diterima dan dipakai', 'Langganan diperpanjang otomatis dan dapat dibatalkan kapan saja', 'Harga Student Pro memerlukan verifikasi KTM aktif', 'Dilarang menyalahgunakan layanan untuk membuat malware', 'Kami dapat memperbarui ketentuan dengan pemberitahuan lebih dulu'])]
  };
  const modal = document.getElementById('infoModal');
  const closeInfo = () => { modal.classList.add('hidden'); modal.classList.remove('flex'); };
  document.querySelectorAll('footer a[href="#"]').forEach(a => {
    const d = INFO[a.textContent.trim()]; if (!d) return;
    a.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('infoTitle').innerHTML = d[0];
      document.getElementById('infoBody').innerHTML = d[1];
      modal.classList.remove('hidden'); modal.classList.add('flex');
    });
  });
  document.getElementById('infoClose').addEventListener('click', closeInfo);
  modal.addEventListener('click', e => { if (e.target === modal) closeInfo(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeInfo(); });
