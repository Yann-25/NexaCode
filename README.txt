NEXACODE AI — BLUE SIGNAL (ID / EN)

CARA MEMBUKA
1. Ekstrak seluruh folder website. Buka index.html di browser.
2. Gunakan tombol ID / EN di navbar untuk mengganti bahasa.
3. Untuk hosting, upload semua isi folder NexaCode_Blue_Signal.

PERBAIKAN (2026-11-16)
- Dropdown BCA / Mandiri / BNI / BRI dan opsi pembayaran lain: warna latar dan teks dibuat kontras.
- Logo berukuran kecil, menu Cloud navbar dihapus, fitur Cloud tetap ada.
- Halaman Contact Us menggunakan FormSubmit AJAX (sudah diintegrasikan), bukan sekadar mailto.
- Belum dapat mengirim sampai inbox yang BENAR-BENAR kamu punya ditambahkan dan diverifikasi.

WAJIB SETUP EMAIL (kira-kira 3 langkah)
1. Buat atau siapkan inbox yang kamu miliki (contoh: Gmail aktif). Jika ingin alamat support@nexacode.ai, kamu harus memiliki domain nexacode.ai dan layanan email domain tersebut.
2. Buka `js/contact-settings.js` dan isi satu baris ini:
   receiverEmail: 'alamatemailaktifkamu@gmail.com'
   JANGAN taruh password, token, API key, atau kredensial apapun di file ini.
3. Publikasikan website (mis. Vercel / Netlify) dan kirim satu pesan percobaan dari Contact Us. FormSubmit mengirim email aktivasi ke inbox penerima. Klik link aktivasi, lalu kirim pesan uji lagi. Cek Inbox dan Spam.
   Dokumentasi: https://formsubmit.co/documentation dan https://formsubmit.co/ajax-documentation

PENTING
- Integrasi pengiriman memakai pihak ketiga (FormSubmit). Data kontak dari pengunjung dikirim ke layanan tersebut.
- File HTML satu halaman juga bisa dipakai. Di bagian dekat akhir HTML, cari `window.NexaContactSettings` lalu ubah `receiverEmail` di sana.
- Jangan pernah mengklaim email sudah aktif sebelum pemilik benar-benar mengonfirmasi inbox.
- Checkout, pembayaran bank, QRIS, kartu dan pembelian merupakan SIMULASI. Tidak ada payment gateway atau transfer uang sungguhan. Jangan gunakan data kartu atau OTP asli.
- Source adalah website presentasi, bukan ekstensi VS Code yang sudah dirilis.
- Tailwind dan font memerlukan koneksi internet.

UPDATE: BAHASA DEMO ID/EN (16 NOVEMBER 2026)
- Perbaikan penerjemahan semua 5 langkah Product Demo, termasuk prompt, pesan error, output test, deployment, dan CTA.
- Teks dinamis pada katalog fitur, timeline, dan beberapa bagian terminal/ulasan ikut diterjemahkan.
- Manifesto berubah mengikuti bahasa ID/EN.
- Tombol ID/EN mengembalikan teks kedua bahasa tanpa perlu refresh.
- Komponen lain dipertahankan: logo kecil, Contact Us, dropdown checkout, dan FormSubmit.
- Untuk mengaktifkan form email, konfigurasi js/contact-settings.js dengan inbox aktif dan konfirmasi email aktivasi FormSubmit.
- Website adalah prototipe. Pembayaran dan demo coding hanya simulasi, bukan transaksi atau eksekusi AI sungguhan.

UPDATE — PENGIRIMAN EMAIL DAN AKTIVASI
- Email penerima diatur: ryaneryento25@gmail.com (pastikan kamu memang pemilik inbox).
- Formulir mendeteksi halaman file:// dan menunjukkan petunjuk menggunakan hosting/server.
- Formulir menampilkan status khusus jika FormSubmit meminta aktivasi, dan alasan error dari layanan.
- Timeout 15 detik untuk mencegah status "Mengirim" menggantung selamanya.
- Setelah layanan menerima kiriman dengan success=true, input formulir otomatis kosong tanpa reload seluruh halaman.
- Jika status masih perlu aktivasi atau gagal, isian dipertahankan untuk percobaan ulang.
- Berkas aktivasi-kontak.html: kirim tes aktivasi manual menggunakan POST dari URL HTTP/HTTPS.
- Link aktivasi hanya dapat diklik oleh pemilik Gmail. Tidak dapat dilakukan otomatis via JavaScript.
- Jangan menguji pengiriman langsung lewat file://; situs harus di-host atau memakai server lokal.
