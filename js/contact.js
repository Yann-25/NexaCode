/* Contact: FormSubmit AJAX (real service); requires user-owned, activated receiver email. */
(() => {
  'use strict';
  const form = document.getElementById('contactForm');
  if (!form) return;
  const settings = window.NexaContactSettings || {};
  const email = String(settings.receiverEmail || '').trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const emailSafe = emailValid ? email : '';
  const $ = id => document.getElementById(id);
  const lang = () => window.NexaI18n?.language() === 'en' ? 'en' : 'id';
  const topics = {
    product:['Pertanyaan Produk','Product Inquiry'],
    technical:['Bantuan Teknis','Technical Support'],
    pricing:['Paket & Harga','Plans & Pricing'],
    partnership:['Kolaborasi / Partnership','Collaboration / Partnership'],
    feedback:['Saran & Masukan','Feedback & Suggestions'],
    other:['Lainnya','Other']
  };
  const copy = {
    notConfigured:['Formulir belum aktif. Pemilik website perlu mengisi receiverEmail pada js/contact-settings.js dengan alamat email yang benar-benar dimiliki.','Contact form is not active yet. The site owner must set receiverEmail in js/contact-settings.js to an inbox they own.'],
    sending:['Mengirim pesan ke layanan email…','Sending your message…'],
    sent:['Permintaan diterima oleh layanan formulir. Jika pertama kali digunakan, pemilik inbox wajib mengaktifkan formulir dari email verifikasi sebelum pesan bisa diterima.','Submission accepted by the form service. For first-time use, the inbox owner must activate the form from the verification email before messages can be delivered.'],
    failed:['Pengiriman belum berhasil. Coba lagi nanti, periksa internet, atau gunakan email support yang tercantum.','Your message could not be submitted. Please check your connection and try again, or use the support email shown.'],
    rejected:['Layanan menolak pengiriman. Pastikan email penerima sudah diverifikasi dan coba kembali.','The service rejected the request. Verify the recipient inbox and try again.'],
    copy:['Isi pesan disalin. Kamu bisa menempelkannya ke email.','Message copied. You can paste it into an email.'],
    copyFail:['Penyalinan otomatis tidak tersedia di browser ini.','Automatic copying is not available in this browser.'],
    invalid:['Lengkapi semua isian dengan informasi yang sesuai.','Please complete all required fields.']
  };
  const status=$('contactStatus'), button=$('contactSubmit'), message=$('contactMessage');
  const rawBtn=button.innerHTML;
  const selectedTopic=() => (topics[$('contactTopic').value]||['Lainnya','Other'])[lang()==='en'?1:0];
  const text=k=>copy[k][lang()==='en'?1:0];
  function show(k, kind='info', extra='') {
    status.hidden=false;status.classList.remove('hidden','error','good');
    if(kind==='error') status.classList.add('error');
    if(kind==='good') status.classList.add('good');
    status.textContent=text(k)+(extra?' '+extra:'');
    status.dataset.msgKey=k;status.dataset.msgKind=kind;
  }
  function publicMail() {
    for (const id of ['publicSupportEmail','footerSupportEmail']) {
      const link=$(id); if(!link) continue;
      if(emailSafe){
        link.href='mailto:'+emailSafe;
        if(id==='publicSupportEmail') link.innerHTML='';
        if(id==='publicSupportEmail') link.append(document.createTextNode(emailSafe+' ↗'));
        else link.textContent=emailSafe;
      } else {
        link.href='#kontak';
        link.removeAttribute('target');
      }
    }
  }
  publicMail();
  const counter=$('contactCounter');
  message.addEventListener('input',()=>counter.textContent=message.value.length);
  function valid() {
    return form.reportValidity() && message.value.trim().length>0 && form.elements.name.value.trim().length>0;
  }
  function payload() {
    return {
      name:form.elements.name.value.trim(),
      email:form.elements.email.value.trim(),
      topic:selectedTopic(),
      message:message.value.trim(),
      _subject:'[NexaCode AI] '+selectedTopic(),
      _honey:$('contactTrap').value.trim(),
      _replyto:form.elements.email.value.trim(),
      _template:'table'
    };
  }
  let sending=false;
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!valid()){show('invalid','error');return}
    if(!emailSafe){show('notConfigured','error');return}
    if(sending)return;
    if($('contactTrap').value) return;
    sending=true;button.disabled=true;button.style.opacity='.6';button.setAttribute('aria-busy','true');
    show('sending');
    try {
      // FormSubmit requires an activation link sent to the recipient email once.
      const response=await fetch('https://formsubmit.co/ajax/'+encodeURIComponent(emailSafe),{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(payload())
      });
      const result=await response.json();
      // IMPORTANT: FormSubmit sometimes uses string 'false'; check strictly.
      if(response.ok && (result.success===true || result.success==='true')){
        show('sent','good');form.reset();counter.textContent='0';
      } else {
        show('rejected','error');
      }
    } catch(err) {
      show('failed','error');
    } finally {
      sending=false;button.disabled=false;button.style.opacity='';button.removeAttribute('aria-busy');
    }
  });
  $('contactCopy').addEventListener('click',async()=>{
    if(!valid()){show('invalid','error');return}
    const p=payload();
    const draft=['To: '+(emailSafe||'[email belum dikonfigurasi]'),'Subject: '+p._subject,'','Nama: '+p.name,'Email: '+p.email,'Topik: '+p.topic,'','Pesan: '+p.message].join('\n');
    try {
      if(navigator.clipboard?.writeText) await navigator.clipboard.writeText(draft);
      else {
        const a=document.createElement('textarea');a.value=draft;a.style.position='fixed';a.style.left='-9999px';document.body.append(a);a.select();
        if(!document.execCommand('copy')) throw Error('copy unsupported');a.remove();
      }
      show('copy','good');
    } catch(e) {show('copyFail','error')}
  });
  document.addEventListener('nexa:langchange',()=>{
    if(!status.hidden && status.dataset.msgKey){
      show(status.dataset.msgKey,status.dataset.msgKind||'info');
    }
  });
})();
