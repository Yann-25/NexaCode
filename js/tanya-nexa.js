/* NexaCode interactive deployment Q&A demonstration.
 * These are curated educational replies, NOT a connected AI backend or deployment service.
 */
(function () {
  'use strict';
  const input = document.getElementById('nxIn');
  const form = document.getElementById('nxForm');
  const output = document.getElementById('nxTxt');
  if (!input || !form || !output) return;

  const content = {
    deploy: {
      prompts: {id:'Gimana cara deploy project React aku ke Vercel?', en:'How do I deploy my React project to Vercel?'},
      title: {id:'Deploy React/Vite ke Vercel', en:'Deploy React/Vite to Vercel'},
      summary:{id:'Berikut alur umum untuk mempublikasikan project React atau Vite.',en:'Here is a typical workflow to publish a React or Vite project.'},
      steps:{id:['Pastikan project berjalan lokal dengan `npm run dev`.','Jalankan `npm run build` dan pastikan build tanpa error.','Push kode ke repositori GitHub (tanpa file rahasia).','Di Vercel, pilih New Project → Import repository → Deploy.','Untuk Vite, periksa Build Command `npm run build` dan Output Directory `dist`.'],en:['Verify the project works locally with `npm run dev`.','Run `npm run build` and fix any build errors.','Push the code to GitHub without secrets.','In Vercel, choose New Project → Import repository → Deploy.','For Vite, confirm Build Command `npm run build` and Output Directory `dist`.']},
      tip:{id:'Setelah deploy, cek URL yang diberikan. Kalau memakai React Router, mungkin perlu rewrite untuk rute SPA.',en:'After deployment, open the generated URL. React Router apps may need an SPA rewrite.'}
    },
    build:{
      prompts:{id:'Bagaimana cara build project React Vite?',en:'How do I build a React Vite project?'},
      title:{id:'Build React/Vite untuk produksi',en:'Build React/Vite for production'},
      summary:{id:'Build mengubah source project menjadi file yang siap disajikan hosting.',en:'A production build turns source files into assets that can be hosted.'},
      steps:{id:['Di terminal, masuk ke folder project yang berisi `package.json`.','Jalankan `npm install` untuk memasang dependensi.','Jalankan `npm run build`.','Untuk Vite, folder hasil biasanya `dist/`.','Periksa hasil lokal dengan `npm run preview` sebelum di-deploy.'],en:['Open the project directory containing `package.json`.','Run `npm install` to install dependencies.','Run `npm run build`.','For Vite, the output is usually the `dist/` folder.','Run `npm run preview` to inspect the production build locally.']},
      tip:{id:'Kalau script build tidak ada, cek bagian `scripts` pada `package.json`.',en:'If the build script is missing, inspect the `scripts` section of `package.json`.'}
    },
    'deploy-error':{
      prompts:{id:'Kenapa deploy aku gagal dan muncul error?',en:'Why did my deployment fail with an error?'},
      title:{id:'Menganalisis error saat deploy',en:'Troubleshooting deployment errors'},
      summary:{id:'Tanpa log error, penyebab pastinya belum bisa diketahui. Mulai dari pemeriksaan berikut.',en:'The exact cause depends on your build logs. Start with these checks.'},
      steps:{id:['Buka Build Logs pada platform hosting, lalu temukan pesan error pertama.','Coba jalankan `npm run build` di komputer untuk mereproduksi masalah.','Pastikan dependensi, path import, dan huruf besar/kecil nama file sesuai.','Periksa environment variables yang diperlukan pada dashboard hosting.','Pastikan build command dan output directory cocok dengan framework.'],en:['Open Build Logs and locate the first meaningful error.','Run `npm run build` locally to reproduce the failure.','Check dependencies, import paths, and case-sensitive filenames.','Verify the required environment variables in the hosting dashboard.','Confirm the build command and output directory match your framework.']},
      tip:{id:'Salin bagian error log tanpa token atau password untuk dianalisis lebih lanjut.',en:'Copy the relevant error log without exposing any tokens or passwords.'}
    },
    git:{
      prompts:{id:'Bagaimana cara sync project ke GitHub?',en:'How do I sync my project with GitHub?'},
      title:{id:'Sinkronkan project dengan GitHub',en:'Sync your project with GitHub'},
      summary:{id:'Git mencatat perubahan kode, sedangkan GitHub menyimpan repository jarak jauh.',en:'Git tracks changes locally while GitHub hosts the remote repository.'},
      steps:{id:['Buat repository GitHub dan pastikan `.gitignore` mengabaikan `node_modules`, `.env`, dan file rahasia.','Bila belum ada Git, jalankan `git init` di folder project.','Jalankan `git add .` lalu `git commit -m "Initial project"`.','Tambahkan remote sesuai alamat repository kamu: `git remote add origin <URL-REPOSITORY>`.','Push dengan `git branch -M main` lalu `git push -u origin main`.'],en:['Create a GitHub repository; add `node_modules`, `.env`, and secrets to `.gitignore`.','If needed, initialize Git in the project directory using `git init`.','Run `git add .` and `git commit -m "Initial project"`.','Add the remote using your repository URL: `git remote add origin <REPOSITORY-URL>`.','Push with `git branch -M main` followed by `git push -u origin main`.']},
      tip:{id:'Jangan commit API key, password, atau kredensial akses.',en:'Never commit API keys, passwords, or other credentials.'}
    },
    cicd:{
      prompts:{id:'Apa itu CI/CD otomatis saat deploy?',en:'How does automated CI/CD work for deployment?'},
      title:{id:'CI/CD dan deploy otomatis',en:'CI/CD and automatic deployment'},
      summary:{id:'CI/CD membantu menjalankan pemeriksaan kode dan proses publikasi secara konsisten.',en:'CI/CD automates verification steps and helps release software consistently.'},
      steps:{id:['Hubungkan repository GitHub ke Vercel atau platform CI/CD pilihan.','Atur workflow agar push atau pull request memicu instalasi dependensi, test, dan build.','Perbaiki test/build yang gagal sebelum merilis.','Gunakan preview deployment untuk memeriksa hasil perubahan.','Rilis ke production setelah perubahan lolos review.'],en:['Connect the GitHub repository to Vercel or your preferred CI/CD service.','Configure push or pull request triggers for install, tests, and build.','Fix failing tests or builds before releasing.','Inspect preview deployments for each change.','Promote to production after review and successful checks.']},
      tip:{id:'Workflow sebenarnya tergantung fitur paket hosting dan konfigurasi repository.',en:'The exact automation depends on your hosting plan and repository settings.'}
    },
    domain:{
      prompts:{id:'Bagaimana cara pakai domain sendiri di Vercel?',en:'How do I connect a custom domain to Vercel?'},
      title:{id:'Menghubungkan custom domain',en:'Connect a custom domain'},
      summary:{id:'Domain membuat website dapat diakses lewat alamat milikmu sendiri.',en:'A custom domain lets visitors access the site through your own address.'},
      steps:{id:['Pastikan kamu memiliki domain dari registrar tepercaya.','Di Vercel, buka project → Settings → Domains dan tambahkan domain.','Ikuti petunjuk DNS dari Vercel (A atau CNAME sesuai konfigurasi yang ditampilkan).','Tunggu propagasi DNS dan status verifikasi domain.','Uji HTTPS dan buka domain dari perangkat berbeda.'],en:['Use a domain you own through a trusted registrar.','In Vercel, open the project → Settings → Domains and add your domain.','Apply the DNS records shown by Vercel (A or CNAME, as instructed).','Wait for DNS propagation and domain verification.','Verify HTTPS and test the domain from another device.']},
      tip:{id:'Jangan menyalin nilai DNS dari contoh acak; gunakan record yang ditampilkan dashboard project kamu.',en:'Use the DNS records shown in your own project dashboard, not values copied from unrelated examples.'}
    },
    testing:{
      prompts:{id:'Gimana cara menjalankan unit test sebelum deploy?',en:'How do I run unit tests before deployment?'},
      title:{id:'Unit testing sebelum rilis',en:'Unit testing before release'},
      summary:{id:'Unit test membantu mengecek fungsi kecil secara otomatis sebelum perubahan dipublikasikan.',en:'Unit tests help verify individual functions automatically before publishing changes.'},
      steps:{id:['Pastikan project mempunyai test runner seperti Jest atau Vitest.','Buat test untuk input normal, kondisi kosong, dan edge case.','Jalankan script testing, biasanya `npm test` atau `npm run test`.','Jika ada test gagal, perbaiki kode atau ekspektasi test yang keliru.','Jalankan build setelah test lulus, lalu lanjutkan review dan deploy.'],en:['Ensure the project has a test runner such as Jest or Vitest.','Write tests for normal inputs, empty cases, and edge cases.','Run your test script, usually `npm test` or `npm run test`.','Fix any failing code or incorrect test expectations.','After tests pass, run the build and review the changes before deployment.']},
      tip:{id:'Perintah test dapat berbeda sesuai konfigurasi `package.json`.',en:'The test command depends on your project’s `package.json` scripts.'}
    },
    rollback:{
      prompts:{id:'Gimana cara kembali ke deployment sebelumnya?',en:'How do I roll back to a previous deployment?'},
      title:{id:'Rollback saat rilis bermasalah',en:'Rollback a problematic release'},
      summary:{id:'Rollback mengembalikan versi produksi ke deployment yang lebih stabil.',en:'A rollback restores an earlier stable production deployment.'},
      steps:{id:['Buka dashboard hosting dan lihat riwayat deployments.','Cari deployment sebelumnya yang sudah pernah diuji.','Gunakan menu rollback atau promote to production bila tersedia pada paketmu.','Pastikan URL production kembali bekerja dan cek log error.','Perbaiki sumber masalah di branch baru sebelum deploy ulang.'],en:['Open the hosting dashboard and inspect deployment history.','Find a previously tested, stable deployment.','Use rollback or promote-to-production controls if available on your plan.','Verify the production URL and inspect any error logs.','Fix the issue on a separate branch before deploying again.']},
      tip:{id:'Rollback aplikasi tidak selalu mengembalikan perubahan database. Siapkan migrasi dan backup terpisah.',en:'Rolling back app code does not necessarily undo database changes; plan migrations and backups separately.'}
    },
    error:{
      prompts:{id:'Aku bingung sama error di kode, gimana?',en:'I am confused by an error in my code. What should I do?'},
      title:{id:'Cari akar masalah error',en:'Find the root cause of an error'},
      summary:{id:'Error bukan selalu tanda seluruh project rusak. Mulai dari pesan yang paling relevan.',en:'An error does not necessarily mean the whole project is broken. Start with the most relevant message.'},
      steps:{id:['Baca baris error pertama yang menunjukkan file dan lokasi masalah.','Periksa potongan kode dan perubahan terbaru di lokasi tersebut.','Buat contoh kasus paling kecil yang tetap memunculkan error.','Periksa versi package, nama variabel, serta import.','Setelah diperbaiki, jalankan ulang test dan build.'],en:['Read the first meaningful error line pointing to a file or location.','Review nearby code and your most recent changes.','Create the smallest example that still reproduces the error.','Check package versions, variable names, and imports.','Run your tests and build again after the fix.']},
      tip:{id:'Pesan error yang lengkap dapat membantu, tetapi jangan tempelkan rahasia atau data pribadi.',en:'Full error messages are useful, but never paste secrets or personal data.'}
    }
  };

  const ui={
    id:{eyebrow:'DEPLOY BARENG NEXA',heading:'Dari editor sampai online, satu alat.',lead:'Tanya seputar sync, build, deploy, dan rilis. Pilih contoh pertanyaan atau ketik sendiri.',examples:'COBA PERTANYAAN INI',input:'Misalnya: deploy project React aku ke Vercel gimana?',send:'Kirim ↗',type:'· Panduan Interaktif',initial:'Siap! Pilih pertanyaan di atas atau tulis perintahmu. Aku akan menampilkan panduan sesuai topiknya.',disclaimer:'Ini simulasi panduan berbasis contoh pertanyaan. Nexa tidak menjalankan git, build, atau deployment sungguhan dari halaman ini. Jangan masukkan password atau token.',empty:'Tulis pertanyaan dulu, atau klik salah satu contoh di atas.',otherTitle:'Pertanyaan belum tersedia di demo',other:'Untuk saat ini, demo ini dapat menjawab pertanyaan tentang deploy, build, error, GitHub, CI/CD, domain, unit test, dan rollback. Pilih salah satu contoh untuk melihat panduannya.',tip:'Catatan',chips:['Deploy ke Vercel','Build React/Vite','Error saat deploy','GitHub sync','CI/CD otomatis','Domain sendiri','Unit test','Rollback versi']},
    en:{eyebrow:'DEPLOY WITH NEXA',heading:'From editor to live website, one tool.',lead:'Ask about syncing, building, deploying, and releasing. Pick an example or type your own question.',examples:'TRY ONE OF THESE QUESTIONS',input:'For example: how do I deploy my React project to Vercel?',send:'Send ↗',type:'· Interactive Guide',initial:'Ready! Choose a question above or type your own. I’ll show you a topic-specific guide.',disclaimer:'This is a guided FAQ simulation. Nexa cannot actually run git, build or deploy your project from this page. Never enter passwords or tokens.',empty:'Type a question or choose an example above.',otherTitle:'This question is not covered by the demo yet',other:'This demo currently covers deployment, builds, errors, GitHub, CI/CD, domains, unit tests, and rollbacks. Select an example to view its guide.',tip:'Note',chips:['Deploy to Vercel','Build React/Vite','Deployment errors','GitHub sync','Automatic CI/CD','Custom domain','Unit tests','Rollback release']}
  };
  const chipIds=['deploy','build','deploy-error','git','cicd','domain','testing','rollback'];
  const chips=Array.from(document.querySelectorAll('#nxExamples [data-nx-topic]'));
  let lastTopic=null;
  let lastQuery='';
  function language(){return window.NexaI18n?.language?.()==='en'?'en':'id';}
  function has(s,any){return any.some(term=>s.includes(term));}
  function detect(query){
    const s=query.toLowerCase().trim();
    if(has(s,['rollback','roll back','revert','kembali ke versi','versi sebelumnya','previous version']))return 'rollback';
    if(has(s,['ci/cd','pipeline','auto deploy','deploy otomatis','continuous integration']))return 'cicd';
    if(has(s,['domain','dns','custom url','subdomain']))return 'domain';
    if(has(s,['test','jest','vitest','pytest','pengujian']))return 'testing';
    if(has(s,['github','git push','git commit','repository','repo','sync','sinkron']))return 'git';
    if((has(s,['deploy','deployment','vercel','netlify','hosting','build']) && has(s,['gagal','error','fail','failed','problem','bermasalah'])) || has(s,['deploy gagal','deploy error','error deploy','deployment error','deploy fail','deployment fail','failed deploy','build fail','build error']))return 'deploy-error';
    if(has(s,['error','bug','exception','traceback','stack trace']))return 'error';
    if(has(s,['build','dist','npm install','npm run preview']))return 'build';
    if(has(s,['deploy','vercel','netlify','hosting','online','rilis','publish']))return 'deploy';
    return null;
  }
  function el(tag,className,text){const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;}
  function addFormatted(parent,text){
    // Render backtick-delimited command snippets safely, without accepting HTML from input.
    text.split(/(`[^`]+`)/g).forEach(chunk=>{
      if(chunk.startsWith('`')&&chunk.endsWith('`'))parent.appendChild(el('code','nx-answer-code',chunk.slice(1,-1)));
      else parent.appendChild(document.createTextNode(chunk));
    });
  }
  function show(topic,query){
    const lang=language(),phrases=ui[lang];lastTopic=topic;lastQuery=query||'';
    output.replaceChildren();
    if(!topic){
      output.appendChild(el('div','nx-answer-title',phrases.otherTitle));
      output.appendChild(el('p','nx-answer-summary',phrases.other));
    }else{
      const ans=content[topic];
      output.appendChild(el('div','nx-answer-title',ans.title[lang]));
      output.appendChild(el('p','nx-answer-summary',ans.summary[lang]));
      const list=el('ol','nx-answer-steps');
      ans.steps[lang].forEach(x=>{const li=el('li');addFormatted(li,x);list.appendChild(li);});
      output.appendChild(list);
      const note=el('div','nx-answer-tip');note.appendChild(el('strong','',phrases.tip+': '));addFormatted(note,ans.tip[lang]);output.appendChild(note);
    }
    chips.forEach(chip=>chip.setAttribute('aria-pressed',String(chip.dataset.nxTopic===topic)));
  }
  function updateLanguage(){
    const l=language(),copy=ui[l],lookup={nxEyebrow:'eyebrow',nxHeading:'heading',nxLead:'lead',nxExamplesLabel:'examples',nxDisclaimer:'disclaimer',nxAnswerType:'type',nxGo:'send'};
    for(const [id,k] of Object.entries(lookup)){const node=document.getElementById(id);if(node)node.textContent=copy[k];}
    input.placeholder=copy.input;
    chips.forEach((chip,i)=>{chip.textContent=copy.chips[i];chip.setAttribute('aria-label',copy.chips[i]);});
    if(lastTopic!==null || lastQuery){show(lastTopic,lastQuery);}
    else output.textContent=copy.initial;
  }
  chips.forEach((chip,i)=>chip.addEventListener('click',()=>{
    const topic=chipIds[i];input.value=content[topic].prompts[language()];show(topic,input.value);
  }));
  form.addEventListener('submit',ev=>{
    ev.preventDefault();const q=input.value.trim();
    if(!q){output.textContent=ui[language()].empty;input.focus();return;}
    show(detect(q),q);
  });
  document.addEventListener('nexa:langchange',updateLanguage);
  updateLanguage();
})();
