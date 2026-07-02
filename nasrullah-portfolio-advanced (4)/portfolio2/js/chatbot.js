/* ============================================================
   ND-Bot — Bilingual chatbot (English + Roman Urdu)
   Voice input  : Web Speech API (SpeechRecognition)
   Voice output : Web Speech API (SpeechSynthesis)
   Language     : auto-detect English vs Roman Urdu
   ============================================================ */
(function () {
  const toggle      = document.getElementById('chatToggle');
  const win         = document.getElementById('chatWindow');
  const closeBtn    = document.getElementById('chatClose');
  const messages    = document.getElementById('chatMessages');
  const form        = document.getElementById('chatForm');
  const input       = document.getElementById('chatInput');
  const chipsWrap   = document.getElementById('chatChips');
  const micBtn      = document.getElementById('micBtn');
  const speakToggle = document.getElementById('speakToggle');
  if (!toggle || !win) return;

  /* ---------- state ---------- */
  let voiceEnabled = true;
  let recognizing  = false;
  let SR = null;

  /* ---------- Roman Urdu detection ----------
     If > 30 % of words are common Roman-Urdu words → treat as Urdu input  */
  const URDU_WORDS = new Set([
    'kya','hai','hain','ap','aap','mera','meri','mujhe','hoga','nahi',
    'theek','shukriya','ok','karo','karo','batao','bata','swal','sawaal',
    'kaun','kaise','kab','kyun','skill','project','portfolio','contact',
    'linkedin','github','email','cv','resume','job','kaam','kuch','bhi',
    'jo','or','aur','se','ko','ka','ki','ke','tha','thi','the','ek','yeh',
    'woh','is','us','phir','ab','bas','sahi','samjha','samjhi','pata',
    'education','degree','padhai','university','college','experience'
  ]);

  function isUrdu(text) {
    const words = text.toLowerCase().split(/\s+/);
    const hits = words.filter(w => URDU_WORDS.has(w)).length;
    return words.length > 0 && hits / words.length > 0.25;
  }

  /* ---------- Nasrullah's own quotes (rotates on greeting) ---------- */
  const QUOTES = [
    { en: '"Code is the closest thing we have to magic — it builds worlds from nothing."', ur: '"Code jaadu jaisa hai — kuch nahi se poori duniya ban jati hai."' },
    { en: '"Every bug is a lesson. Every line of code is a step forward."',              ur: '"Har bug ek sabaq hai. Har line ek qadam aage."' },
    { en: '"I build for users, not for compilers."',                                     ur: '"Main users ke liye banata hoon, compiler ke liye nahi."' },
    { en: '"Clean code is not a luxury — it\'s respect for your future self."',          ur: '"Clean code gift hai apne future wale aap ko."' },
    { en: '"React renders the view, but passion renders the product."',                  ur: '"React view dikhata hai, lekin junoon product banata hai."' },
    { en: '"A developer who stops learning has already started falling behind."',        ur: '"Jo developer sikhna chhor de, woh pehle hi peechhe reh gaya."' },
  ];
  let quoteIndex = 0;
  function nextQuote() {
    const q = QUOTES[quoteIndex % QUOTES.length];
    quoteIndex++;
    return q;
  }

  /* ---------- knowledge base ---------- */
  const KB = [
    /* greetings */
    {
      keys: ['hi','hello','hey','salam','assalam','hola'],
      en() { const q = nextQuote(); return `Hey! 👋 I'm ND-Bot, Nasrullah's portfolio assistant.\n\n${q.en}\n— Nasrullah Dilshad\n\nAsk me about his skills, LuxuryStay project, education, or how to reach him.`; },
      ur() { const q = nextQuote(); return `Salam! 👋 Main ND-Bot hoon — Nasrullah ka portfolio assistant.\n\n${q.ur}\n— Nasrullah Dilshad\n\nPucho skills, project, education ya contact ke baare mein!`; },
    },
    /* about */
    {
      keys: ['who','about','yourself','intro','kon','kaun','nasrullah','bata','batao'],
      en: `Nasrullah Dilshad is a Full-Stack Developer, Mobile App Developer & Data Analyst from Karachi, Pakistan. He works with React, Node.js, MongoDB, Flutter and R — building scalable apps and clean interfaces.`,
      ur: `Nasrullah Dilshad ek Full-Stack Developer, Mobile App Developer aur Data Analyst hain Karachi, Pakistan se. React, Node.js, MongoDB, Flutter aur R use karte hain — clean aur scalable apps banate hain.`,
    },
    /* skills */
    {
      keys: ['skill','tech','stack','technolog','tool','react','node','mongo','flutter'],
      en: `Core stack:\n• Expert: React JS 18, Node.js 20, Express.js, MongoDB Atlas, HTML5/CSS3, Bootstrap\n• Proficient: PHP, Laravel, ASP.NET/C#, Flutter/Dart, R, Figma\n• Good: MySQL / SQL Server\n• Tools: Git, Vite, Tailwind, JWT, REST APIs, Framer Motion`,
      ur: `Core stack:\n• Expert: React JS 18, Node.js 20, Express.js, MongoDB Atlas, HTML5/CSS3\n• Proficient: PHP, Flutter/Dart, R Language, Figma\n• Good: MySQL / SQL Server\n• Tools: Git, Tailwind, JWT, REST APIs`,
    },
    /* project */
    {
      keys: ['project','luxurystay','luxury','hotel','kaam','kia','banya','banaya','work','portfolio'],
      en: `His featured project is LuxuryStay — a full-stack Hotel Management System:\n• 40+ pages, 10+ REST API routes\n• React 18 + Vite + Tailwind + Framer Motion (frontend)\n• Node.js + Express + MongoDB Atlas + JWT (backend)\n• Final Year Project, APTECH Shah-e-Faisal, 4-member team`,
      ur: `Featured project hai LuxuryStay — ek full-stack Hotel Management System:\n• 40+ pages, 10+ REST API routes\n• React 18 + Vite + Tailwind (frontend)\n• Node.js + MongoDB + JWT (backend)\n• Final Year Project, APTECH, 4 logon ki team`,
    },
    /* education */
    {
      keys: ['education','study','degree','university','school','padhai','college','qualification','parh'],
      en: `Education:\n• BS Computer Science — Virtual University of Pakistan (2024–Present)\n• DISM/ADSE Diploma — Aptech Shah-e-Faisal, Karachi (2023–Present)\n• Intermediate Pre-Engineering — Sindh Board, Hyderabad (2024)\n• Diploma in IT — Agha Computer Center, Karachi (2021)`,
      ur: `Education:\n• BS Computer Science — Virtual University of Pakistan (2024–Present)\n• DISM/ADSE Diploma — Aptech Shah-e-Faisal, Karachi (2023–Present)\n• Intermediate Pre-Engineering — Sindh Board, Hyderabad (2024)\n• Diploma in IT — Agha Computer Center, Karachi (2021)`,
    },
    /* contact */
    {
      keys: ['contact','email','phone','hire','reach','call','rabta','milo','baat'],
      en: `Best ways to reach Nasrullah:\n📧 nasrullahdilshad0@gmail.com\n📞 +92 316 1407786\n💼 linkedin.com/in/nasrullahdilshad\n🐙 github.com/nasrullahmemon13`,
      ur: `Nasrullah se rabta karo:\n📧 nasrullahdilshad0@gmail.com\n📞 +92 316 1407786\n💼 linkedin.com/in/nasrullahdilshad\n🐙 github.com/nasrullahmemon13`,
    },
    /* cv */
    {
      keys: ['cv','resume','download','dakhal','file'],
      en: `You can download Nasrullah's CV as a PDF — hit the Download CV button in the navbar or hero section. It opens/saves instantly.`,
      ur: `Nasrullah ki CV PDF mein download kar sakte ho — nav ya hero section mein "Download CV" button hai. Ek click mein save ho jaayegi.`,
    },
    /* github / linkedin */
    {
      keys: ['github','linkedin','social','link'],
      en: `🐙 GitHub: github.com/nasrullahmemon13\n💼 LinkedIn: linkedin.com/in/nasrullahdilshad\n📧 Email: nasrullahdilshad0@gmail.com`,
      ur: `🐙 GitHub: github.com/nasrullahmemon13\n💼 LinkedIn: linkedin.com/in/nasrullahdilshad\n📧 Email: nasrullahdilshad0@gmail.com`,
    },
    /* thanks */
    {
      keys: ['thank','thanks','shukriya','shukria','mehrbani','jazakallah'],
      en: `You're welcome! 😊 Feel free to ask anything else.`,
      ur: `Koi baat nahi! 😊 Kuch aur poochna ho to zaroor poochna.`,
    },
    /* joke */
    {
      keys: ['joke','funny','mazak','hasao','hasa'],
      en: `Why do programmers prefer dark mode? Because light attracts bugs! 🐛`,
      ur: `Developer dark mode kyun prefer karta hai? Kyunke light mein bugs aa jate hain! 🐛`,
    },
    /* available */
    {
      keys: ['available','freelance','job','opportunit','kaam','hire','vacancy'],
      en: `Yes — Nasrullah is open to full-stack, mobile, or data roles and freelance work. Drop him an email and he'll get back to you!`,
      ur: `Haan — Nasrullah full-stack, mobile ya data roles aur freelance kaam ke liye available hain. Email bhejo, jald reply milegi!`,
    },
    /* quote */
    {
      keys: ['quote','wisdom','soch','aqwal','kehna','kehte'],
      en()  { const q = nextQuote(); return `${q.en}\n— Nasrullah Dilshad`; },
      ur()  { const q = nextQuote(); return `${q.ur}\n— Nasrullah Dilshad`; },
    },
  ];

  /* ---------- reply engine ---------- */
  function findReply(text) {
    const t   = text.toLowerCase();
    const urdu = isUrdu(t);
    for (const entry of KB) {
      if (entry.keys.some(k => t.includes(k))) {
        const reply = typeof entry[urdu ? 'ur' : 'en'] === 'function'
          ? entry[urdu ? 'ur' : 'en']()
          : entry[urdu ? 'ur' : 'en'];
        return { text: reply, urdu };
      }
    }
    return {
      text: urdu
        ? 'Main sirf ek simple bot hoon 😅 Skills, project, education ya contact ke baare mein poochho!'
        : 'I\'m a simple bot so I might\'ve missed that 😅 Try asking about skills, the LuxuryStay project, education, or contact info!',
      urdu,
    };
  }

  /* ---------- TTS ---------- */
  function speak(text, isUrdu) {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text.replace(/[🐛👋😊😅📧📞💼🐙•\n]/g,' '));
    utter.lang  = isUrdu ? 'ur-PK' : 'en-US';
    utter.rate  = 1.0;
    utter.pitch = 1.05;
    window.speechSynthesis.speak(utter);
  }

  /* ---------- DOM helpers ---------- */
  function scrollToBottom() { messages.scrollTop = messages.scrollHeight; }

  function addMessage(text, who) {
    const div = document.createElement('div');
    div.className = 'msg ' + (who === 'user' ? 'msg-user' : 'msg-bot');
    div.style.whiteSpace = 'pre-wrap';
    div.textContent = text;
    messages.appendChild(div);
    scrollToBottom();
  }

  function botReply(userText) {
    const typing = document.createElement('div');
    typing.className = 'msg msg-bot typing-dots';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(typing);
    scrollToBottom();
    setTimeout(() => {
      typing.remove();
      const { text, urdu } = findReply(userText);
      addMessage(text, 'bot');
      speak(text, urdu);
    }, 450 + Math.random() * 400);
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    window.speechSynthesis && window.speechSynthesis.cancel();
    addMessage(text, 'user');
    botReply(text);
  }

  /* ---------- open / close ---------- */
  function openChat() {
    win.classList.add('open');
    document.getElementById('chatDot') && (document.getElementById('chatDot').style.display = 'none');
    if (messages.children.length === 0) {
      setTimeout(() => {
        const q = nextQuote();
        const greeting = `Hey! 👋 I'm ND-Bot — ask me anything about Nasrullah.\n\nHis quote for you:\n${q.en}\n\nAap Roman Urdu mein bhi pooch sakte ho! 🇵🇰`;
        addMessage(greeting, 'bot');
        speak(greeting, false);
      }, 350);
    }
    input && input.focus();
  }

  toggle.addEventListener('click', () => win.classList.contains('open') ? win.classList.remove('open') : openChat());
  closeBtn && closeBtn.addEventListener('click', () => { win.classList.remove('open'); window.speechSynthesis && window.speechSynthesis.cancel(); });

  /* ---------- quick chips ---------- */
  const CHIPS = [
    { label: 'Skills 🛠️',           msg: 'skills' },
    { label: 'Project 🏨',           msg: 'project' },
    { label: 'Education 🎓',         msg: 'education' },
    { label: 'Contact 📞',           msg: 'contact' },
    { label: 'Download CV 📄',       msg: 'cv' },
    { label: 'Quote 💬',             msg: 'quote' },
    { label: 'Hire karo? 💼',        msg: 'hire karo available' },
  ];
  if (chipsWrap) {
    CHIPS.forEach(c => {
      const chip = document.createElement('button');
      chip.type = 'button'; chip.className = 'chip'; chip.textContent = c.label;
      chip.addEventListener('click', () => sendMessage(c.msg));
      chipsWrap.appendChild(chip);
    });
  }

  /* ---------- form submit ---------- */
  form && form.addEventListener('submit', (e) => { e.preventDefault(); const t = input.value.trim(); input.value = ''; if(t) sendMessage(t); });

  /* ---------- voice output toggle ---------- */
  if (speakToggle) {
    speakToggle.addEventListener('click', () => {
      voiceEnabled = !voiceEnabled;
      speakToggle.classList.toggle('is-off', !voiceEnabled);
      speakToggle.title = voiceEnabled ? 'Mute bot voice' : 'Unmute bot voice';
      if (!voiceEnabled && window.speechSynthesis) window.speechSynthesis.cancel();
    });
  }

  /* ---------- voice input (mic) ---------- */
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition && micBtn) {
    SR = new SpeechRecognition();
    SR.continuous = false;
    SR.interimResults = false;
    SR.maxAlternatives = 1;

    SR.onstart  = () => { recognizing = true; micBtn.classList.add('listening'); micBtn.title = 'Listening… (click to stop)'; };
    SR.onend    = () => { recognizing = false; micBtn.classList.remove('listening'); micBtn.title = 'Speak to ND-Bot'; };
    SR.onerror  = () => { recognizing = false; micBtn.classList.remove('listening'); };
    SR.onresult = (e) => {
      const spoken = e.results[0][0].transcript;
      if (input) input.value = spoken;
      sendMessage(spoken);
    };

    micBtn.addEventListener('click', () => {
      if (!win.classList.contains('open')) openChat();
      if (recognizing) { SR.stop(); return; }
      /* detect user language and set recognition lang */
      SR.lang = 'ur-PK,en-US'; /* try both; browser picks best */
      try { SR.start(); } catch(e) { /* already running */ }
    });
  } else if (micBtn) {
    micBtn.style.display = 'none'; /* hide if browser doesn't support */
  }

})();
