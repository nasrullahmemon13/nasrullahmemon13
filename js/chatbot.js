(function () {
  const toggle = document.getElementById('chatToggle');
  const win = document.getElementById('chatWindow');
  const closeBtn = document.getElementById('chatClose');
  const messages = document.getElementById('chatMessages');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const chipsWrap = document.getElementById('chatChips');
  const dot = document.getElementById('chatDot');

  if (!toggle || !win) return;

  let opened = false;

  const QUICK_CHIPS = ['Skills', 'Featured project', 'Education', 'Contact', 'Download CV'];

  const KB = [
    { keys: ['hi', 'hello', 'hey', 'salam', 'assalam'],
      reply: "Hey! 👋 I'm ND-Bot, Nasrullah's portfolio assistant. Ask me about his skills, his LuxuryStay project, education, or how to reach him." },
    { keys: ['who', 'about', 'yourself', 'intro'],
      reply: "Nasrullah Dilshad is a Full-Stack Developer, Mobile App Developer & Data Analyst from Karachi, Pakistan — working with React, Node.js, MongoDB, Flutter and R." },
    { keys: ['skill', 'tech', 'stack', 'technolog', 'language', 'tool'],
      reply: "Core stack: React JS 18, Node.js 20, Express.js & MongoDB Atlas (Expert) · Bootstrap, jQuery, Figma, PHP, ASP.NET/C#, Flutter/Dart, R (Proficient) · MySQL/SQL Server (Good). Full breakdown is in the Skills section ↑" },
    { keys: ['project', 'luxurystay', 'luxury stay', 'hotel', 'work', 'portfolio'],
      reply: "His featured project is LuxuryStay — a full-stack Hotel Management System with 40+ pages & 10+ REST API routes. Built with React 18 + Vite + Tailwind + Framer Motion on the frontend, and Node.js + Express + MongoDB Atlas + JWT on the backend. Check the Work section for screenshots!" },
    { keys: ['education', 'study', 'degree', 'university', 'school', 'qualification'],
      reply: "Currently pursuing a BS in Computer Science (Virtual University of Pakistan, since 2024) alongside a 3-year DISM/ADSE Diploma at Aptech, Karachi (since 2023)." },
    { keys: ['contact', 'email', 'phone', 'hire', 'reach', 'call', 'whatsapp'],
      reply: "Best ways to reach him: nasrullahdilshad0@gmail.com or +92 316 1407786. There are one-tap buttons in the Contact section too 👇" },
    { keys: ['cv', 'resume', 'download'],
      reply: "You can grab his CV as a PDF — there's a 'Download CV' button in the navbar and hero section. One click and it's yours." },
    { keys: ['github', 'linkedin', 'social'],
      reply: "GitHub: github.com/Nasrullah-ND · LinkedIn: linkedin.com/in/nasrullah-dilshad — both linked in the Contact section." },
    { keys: ['thank', 'thanks', 'shukriya'],
      reply: "You're welcome! Anything else you'd like to know? 😊" },
    { keys: ['joke', 'funny'],
      reply: "Why do programmers prefer dark mode? Because light attracts bugs. 🐛" },
    { keys: ['available', 'freelance', 'job', 'opportunit'],
      reply: "Yes — Nasrullah is open to full-stack, mobile, or data roles and freelance work. Drop him an email and he'll get back to you." },
  ];

  function findReply(text) {
    const t = text.toLowerCase();
    for (const entry of KB) {
      if (entry.keys.some(k => t.includes(k))) return entry.reply;
    }
    return "I'm just a simple bot so I might've missed that 🙂 Try asking about his skills, the LuxuryStay project, education, or contact info — or use the quick buttons below.";
  }

  function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }

  function addMessage(text, who) {
    const div = document.createElement('div');
    div.className = 'msg ' + (who === 'user' ? 'msg-user' : 'msg-bot');
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

    const delay = 500 + Math.random() * 500;
    setTimeout(() => {
      typing.remove();
      addMessage(findReply(userText), 'bot');
    }, delay);
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    addMessage(text, 'user');
    botReply(text);
  }

  function openChat() {
    win.classList.add('open');
    opened = true;
    if (dot) dot.style.display = 'none';
    if (messages.children.length === 0) {
      setTimeout(() => {
        addMessage("Hey! 👋 I'm ND-Bot — ask me anything about Nasrullah's skills, projects, education, or how to get in touch.", 'bot');
      }, 300);
    }
    input && input.focus();
  }

  toggle.addEventListener('click', () => {
    if (win.classList.contains('open')) {
      win.classList.remove('open');
    } else {
      openChat();
    }
  });
  closeBtn && closeBtn.addEventListener('click', () => win.classList.remove('open'));

  if (chipsWrap) {
    QUICK_CHIPS.forEach(label => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip';
      chip.textContent = label;
      chip.addEventListener('click', () => sendMessage(label));
      chipsWrap.appendChild(chip);
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value;
      input.value = '';
      sendMessage(text);
    });
  }
})();
