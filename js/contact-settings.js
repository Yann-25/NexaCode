/**
 * NexaCode AI — Pengaturan FormSubmit.
 * receiverEmail adalah alamat email penerima, BUKAN password/login.
 * Setelah mengaktifkan form, kamu bisa mengganti formEndpointId dengan
 * token acak dari email FormSubmit (jika tersedia), untuk menyembunyikan alamat.
 * FormSubmit tidak mengirim jika website dibuka langsung via file://.
 */
window.NexaContactSettings = Object.freeze({
  receiverEmail: 'ryaneryento25@gmail.com',
  formEndpointId: '' // opsional: token endpoint yang diperoleh setelah aktivasi FormSubmit
});
