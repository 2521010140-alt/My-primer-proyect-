function mostrarSaludo() {
  const saludo = document.getElementById('saludo');
  if (saludo) {
    saludo.textContent = '¡Hola! Gracias por visitar mi CV. Estoy aprendiendo a crear sitios web con HTML, CSS y JavaScript.';
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

  loadTheme();
});
