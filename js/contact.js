/* NexaCode Contact Form — clear success vs activation vs local-file failure. */
(() => {
  'use strict';
  const form = document.getElementById('contactForm');
  if (!form) return;
  const settings = window.NexaContactSettings || {};
  const receiver = String(settings.receiverEmail || '').trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(receiver);
  const token = String(settings.formEndpointId || '').trim();
  const endpoint = token || (emailValid ? receiver : '');
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
    notConfigured:['Email penerima belum disetel dengan benar. Atur receiverEmail di js/contact-settings.js.','Recipient inbox is not configured. Set receiverEmail in js/contact-settings.js.'],
    localFile:['Pengiriman tidak tersedia saat website dibuka langsung dari file HTML. Upload ke hosting (Vercel/Netlify) atau jalankan melalui server lokal, lalu coba lagi.','Form submission is unavailable when opening the HTML file directly. Deploy the site or run a local server, then try again.'],
    sending:['Menghubungi layanan email…','Contacting the email service…'],
    sent:['Pesan telah diterima layanan formulir. Terima kasih! Formulir sudah dikosongkan.','The form service accepted your message. Thank you! The form has been cleared.'],
    activation:['Formulir BELUM AKTIF. Periksa Gmail penerima (Inbox, Spam, Promotions), buka email FormSubmit terbaru, lalu klik “Activate Form”. Setelah aktif, coba kirim lagi.','The form is NOT ACTIVE. Check the recipient Gmail inbox (including Spam and Promotions), open the latest FormSubmit message and select “Activate Form”. Then try again.'],
    failed:['Belum terkirim. Koneksi ke FormSubmit gagal atau waktu tunggu habis. Periksa internet, lalu coba lagi.','Not sent. Could not reach FormSubmit or the request timed out. Check your internet connection and retry.'],
    rejected:['Belum terkirim. Layanan formulir menolak pesan ini. Silakan coba lagi, atau gunakan email kontak langsung.','Not sent. The form service rejected the message. Please retry or use the support email directly.'],
    copy:['Isi pesan berhasil disalin. Kamu bisa menempelkannya ke email.','Message copied. Paste it into an email.'],
    copyFail:['Penyalinan otomatis tidak tersedia di browser ini.','Automatic copying is not available in this browser.'],
    invalid:['Lengkapi semua isian dengan informasi yang sesuai.','Please complete all required fields.']
  };
  const status=$('contactStatus'), button=$('contactSubmit'), message=$('contactMessage');
  const selectedTopic=() => (topics[$('contactTopic').value]||['Lainnya','Other'])[lang()==='en'?1:0];
  const text=k=>copy[k][lang()==='en'?1:0];
  const statusContent={key:null,kind:null,detail:''};
  function show(key, kind='info', detail='') {
    status.hidden=false;
    status.classList.remove('hidden','error','good');
    if(kind==='error')status.classList.add('error');
    if(kind==='good')status.classList.add('good');
    statusContent.key=key;statusContent.kind=kind;statusContent.detail=detail;
    status.textContent=text(key)+(detail?' '+detail:'');
  }
  function publicMail() {
    for(const id of ['publicSupportEmail','footerSupportEmail']) {
      const link=$(id);if(!link)continue;
      if(emailValid){
        link.href='mailto:'+receiver;
        if(id==='publicSupportEmail')link.textContent=receiver+' ↗';
        else link.textContent=receiver;
      } else {
        link.href='#kontak';link.removeAttribute('target');
      }
    }
  }
  publicMail();
  const counter=$('contactCounter');
  message.addEventListener('input',()=>counter.textContent=message.value.length);
  function valid(){return form.reportValidity() && message.value.trim().length>0 && form.elements.name.value.trim().length>0}
  function payload(){
    const p={
      name:form.elements.name.value.trim(),
      email:form.elements.email.value.trim(),
      topic:selectedTopic(),
      message:message.value.trim(),
      _subject:'[NexaCode AI] '+selectedTopic(),
      _honey:$('contactTrap').value.trim(),
      _replyto:form.elements.email.value.trim(),
      _template:'table'
    };
    if(location.protocol==='http:'||location.protocol==='https:')p._url=location.href;
    return p;
  }
  let sending=false;
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!valid()){show('invalid','error');return}
    if(!endpoint){show('notConfigured','error');return}
    if(location.protocol==='file:'){show('localFile','error');return}
    if(sending)return;
    if($('contactTrap').value)return;
    sending=true;button.disabled=true;button.style.opacity='.6';button.setAttribute('aria-busy','true');
    show('sending');
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),15000);
    try{
      const response=await fetch('https://formsubmit.co/ajax/'+encodeURIComponent(endpoint),{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(payload()),
        signal:controller.signal
      });
      let result={};
      try{result=await response.json()}catch(_e){}
      // FormSubmit returns success as a string, including the string 'false'.
      const success=(result.success===true || result.success==='true');
      const serviceMessage=String(result.message||'').slice(0,350);
      if(response.ok && success){
        form.reset();counter.textContent='0';show('sent','good');
      }else if(/activation|activate form|actived/i.test(serviceMessage)){
        show('activation','error');
      }else if(/web server|html files|referer/i.test(serviceMessage)){
        show('localFile','error');
      }else{
        show('rejected','error',serviceMessage);
      }
    }catch(err){
      show('failed','error');
    }finally{
      clearTimeout(timeout);sending=false;button.disabled=false;button.style.opacity='';button.removeAttribute('aria-busy');
    }
  });
  $('contactCopy').addEventListener('click',async()=>{
    if(!valid()){show('invalid','error');return}
    const p=payload();
    const draft=['To: '+(receiver||'[email belum diatur]'),'Subject: '+p._subject,'','Nama: '+p.name,'Email: '+p.email,'Topik: '+p.topic,'','Pesan: '+p.message].join('\n');
    try{
      if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(draft);
      else{
        const a=document.createElement('textarea');a.value=draft;a.style.position='fixed';a.style.left='-9999px';document.body.append(a);a.select();
        if(!document.execCommand('copy'))throw Error('copy unsupported');a.remove();
      }
      show('copy','good');
    }catch(_err){show('copyFail','error')}
  });
  document.addEventListener('nexa:langchange',()=>{
    if(statusContent.key)show(statusContent.key,statusContent.kind||'info',statusContent.detail);
  });
})();
