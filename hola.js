function mostrarSaludo() {
  const saludo = document.getElementById('saludo');
  if (saludo) {
    saludo.textContent = '¡Hola! Mi página ya está lista, positiva y lista para mostrar todo mi esfuerzo en desarrollo web.';
  }
}

function crearMensaje(texto, clase) {
  const mensaje = document.createElement('div');
  mensaje.className = `chat-message ${clase}`;
  mensaje.textContent = texto;
  return mensaje;
}

function responderPregunta(texto) {
  const pregunta = texto.toLowerCase();
  if (pregunta.includes('experiencia')) {
    return 'He creado este CV web completo con HTML, CSS y JavaScript. Incluye servicios, logros, portafolio y un asistente de chat.';
  }
  if (pregunta.includes('habilidad') || pregunta.includes('skill') || pregunta.includes('javascript') || pregunta.includes('css') || pregunta.includes('html')) {
    return 'Mis principales habilidades son HTML, CSS y JavaScript. También trabajo en diseño responsivo y presentaciones visuales limpias.';
  }
  if (pregunta.includes('proyecto') || pregunta.includes('portafolio')) {
    return 'El portafolio muestra este sitio en sí y ejemplos de experiencia visual, chat interactivo y diseño responsivo.';
  }
  if (pregunta.includes('servicio')) {
    return 'Trabajo en desarrollo de páginas web claras y responsivas, diseño visual y organización de la información para presentar tu perfil de forma ordenada.';
  }
  if (pregunta.includes('logro')) {
    return 'He dedicado muchas horas al aprendizaje y creé este sitio como un portafolio personal para mostrar mi progreso.';
  }
  if (pregunta.includes('idioma') || pregunta.includes('español') || pregunta.includes('inglés')) {
    return 'Hablo español nativo y tengo conocimientos básicos de inglés para leer documentación técnica y trabajar con recursos en ese idioma.';
  }
  if (pregunta.includes('github')) {
    return 'Mi código está en GitHub; pronto compartiré el enlace en este sitio. También puedes escribirme por Instagram o correo para pedirlo.';
  }
  if (pregunta.includes('contacto') || pregunta.includes('correo') || pregunta.includes('teléfono')) {
    return 'Puedes escribirme a Daviddanielrobleskong@gmail.com o contactarme por Instagram en @danny_k777ig.';
  }
  if (pregunta.includes('tema') || pregunta.includes('modo claro') || pregunta.includes('modo oscuro') || pregunta.includes('dark')) {
    return 'Usa el botón de tema para cambiar entre modo claro y oscuro. El sitio recuerda tu preferencia.';
  }
  return 'Estoy aquí para ayudarte. Pregúntame por mi experiencia, servicios, portafolio, logros o contacto.';
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('Bienvenido a la página de CV de David.');

  const chatToggle = document.getElementById('chatToggle');
  const chatPanel = document.getElementById('chatPanel');
  const chatClose = document.getElementById('chatClose');
  const chatSend = document.getElementById('chatSend');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  const themeToggle = document.getElementById('themeToggle');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  function setTheme(theme) {
    document.body.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'light' ? 'Modo Oscuro' : 'Modo Claro';
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
  }

  function toggleChat(open) {
    chatPanel.classList.toggle('open', open);
    chatPanel.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (open) {
      chatInput.focus();
    }
  }

  function enviarMensaje() {
    const texto = chatInput.value.trim();
    if (!texto) return;
    chatMessages.appendChild(crearMensaje(texto, 'chat-user'));
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      const respuesta = responderPregunta(texto);
      chatMessages.appendChild(crearMensaje(respuesta, 'chat-bot'));
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 400);
  }

  function enviarFormulario(event) {
    event.preventDefault();
    const nombre = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('message').value.trim();
    if (!nombre || !email || !mensaje) {
      formSuccess.textContent = 'Por favor completa todos los campos antes de enviar.';
      formSuccess.style.color = '#f87171';
      return;
    }
    formSuccess.textContent = `Gracias ${nombre}, tu mensaje ha sido enviado. Pronto me pondré en contacto.`;
    formSuccess.style.color = '#34d399';
    contactForm.reset();
  }

  themeToggle.addEventListener('click', () => {
    const activeTheme = document.body.classList.contains('light') ? 'dark' : 'light';
    setTheme(activeTheme);
  });

  chatToggle.addEventListener('click', () => toggleChat(true));
  chatClose.addEventListener('click', () => toggleChat(false));
  chatSend.addEventListener('click', enviarMensaje);
  chatInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      enviarMensaje();
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', enviarFormulario);
  }

  function initTypingEffect() {
    const typedEl = document.getElementById('typedText');
    const phrases = ['desarrollo web', 'inteligencia artificial', 'experiencia de usuario', 'proyectos tecnológicos'];
    let index = 0;
    let charIndex = 0;
    let currentPhrase = '';
    let forward = true;

    function type() {
      currentPhrase = phrases[index];
      if (forward) {
        typedEl.textContent = currentPhrase.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentPhrase.length) {
          forward = false;
          setTimeout(type, 1000);
          return;
        }
      } else {
        typedEl.textContent = currentPhrase.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          forward = true;
          index = (index + 1) % phrases.length;
        }
      }
      setTimeout(type, forward ? 100 : 50);
    }

    if (typedEl) type();
  }

  function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.closest('.counter-card').dataset.target;
          let value = 0;
          const increment = Math.ceil(target / 80);
          const update = () => {
            value += increment;
            counter.textContent = value > target ? target : value;
            if (value < target) {
              requestAnimationFrame(update);
            }
          };
          update();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(counter => observer.observe(counter));
  }

  function initScrollTop() {
    const scrollTop = document.getElementById('scrollTop');
    if (!scrollTop) return;
    window.addEventListener('scroll', () => {
      const shouldShow = window.scrollY > 320;
      scrollTop.classList.toggle('show', shouldShow);
    });
    scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const colors = ['#00e5ff', '#38bdf8', '#0ea5e9', '#ffffff'];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    }

    for (let i = 0; i < 100; i++) particles.push(createParticle());

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        if (index % 12 === 0) {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.4;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          const next = particles[(index + 8) % particles.length];
          ctx.lineTo(next.x, next.y);
          ctx.stroke();
        }
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  function initAOS() {
    if (window.AOS) {
      window.AOS.init({ duration: 900, once: true, mirror: false });
    }
  }

  initTypingEffect();
  initCounters();
  initScrollTop();
  initParticles();
  initAOS();

  loadTheme();
});
