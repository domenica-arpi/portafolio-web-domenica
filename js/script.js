/* =====================================================
   PORTAFOLIO WEB - JAVASCRIPT
   Funcionalidades:
   1. Menú responsive
   2. Tema claro / oscuro (con localStorage)
   3. Filtro de proyectos por tecnología
   4. Validación del formulario de contacto
   5. Botón "volver arriba"
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  setupNavbarToggle();
  setupThemeToggle();
  setupProjectFilters();
  setupContactFormValidation();
  setupBackToTop();
});

/* =====================================================
   1. MENÚ RESPONSIVE
   ===================================================== */
function setupNavbarToggle() {
  const navbarToggle = document.getElementById('navbar-toggle');
  const navbarMenu = document.getElementById('navbar-menu');

  if (!navbarToggle || !navbarMenu) return;

  navbarToggle.addEventListener('click', () => {
    const isOpen = navbarMenu.classList.toggle('is-open');
    navbarToggle.setAttribute('aria-expanded', isOpen);
  });

  // Cierra el menú automáticamente al hacer clic en un enlace (mejora la experiencia en móvil)
  navbarMenu.querySelectorAll('.navbar-link').forEach((link) => {
    link.addEventListener('click', () => {
      navbarMenu.classList.remove('is-open');
      navbarToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* =====================================================
   2. TEMA CLARO / OSCURO
   ===================================================== */
function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const THEME_STORAGE_KEY = 'portfolio-theme';

  if (!themeToggle) return;

  // Al cargar la página, aplica el tema guardado anteriormente (si existe)
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    const isDark = htmlElement.getAttribute('data-theme') === 'dark';

    if (isDark) {
      htmlElement.removeAttribute('data-theme');
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
      themeToggle.textContent = '🌙';
    } else {
      htmlElement.setAttribute('data-theme', 'dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
      themeToggle.textContent = '☀️';
    }
  });
}

/* =====================================================
   3. FILTRO DE PROYECTOS POR TECNOLOGÍA
   ===================================================== */
function setupProjectFilters() {
  const filterButtons = document.querySelectorAll('.btn-filter');
  const projectCards = document.querySelectorAll('#projects-grid .card');

  if (filterButtons.length === 0 || projectCards.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedFilter = button.dataset.filter;

      // Actualiza el botón activo visualmente
      filterButtons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      // Muestra u oculta las cards según la tecnología seleccionada
      projectCards.forEach((card) => {
        const cardTechnologies = card.dataset.technologies || '';
        const matchesFilter =
          selectedFilter === 'todos' || cardTechnologies.includes(selectedFilter);

        card.classList.toggle('is-hidden', !matchesFilter);
      });
    });
  });
}

/* =====================================================
   4. VALIDACIÓN DEL FORMULARIO DE CONTACTO
   ===================================================== */
function setupContactFormValidation() {
  const contactForm = document.getElementById('contact-form');

  if (!contactForm) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');

  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorMessage = document.getElementById('error-message');
  const successMessage = document.getElementById('form-success');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let isFormValid = true;

    // Validar nombre
    if (nameInput.value.trim() === '') {
      errorName.textContent = 'Por favor ingresa tu nombre.';
      isFormValid = false;
    } else {
      errorName.textContent = '';
    }

    // Validar correo electrónico con una expresión regular simple
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
      errorEmail.textContent = 'Por favor ingresa tu correo electrónico.';
      isFormValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      errorEmail.textContent = 'Ingresa un correo electrónico válido.';
      isFormValid = false;
    } else {
      errorEmail.textContent = '';
    }

    // Validar mensaje
    if (messageInput.value.trim() === '') {
      errorMessage.textContent = 'Por favor escribe un mensaje.';
      isFormValid = false;
    } else if (messageInput.value.trim().length < 10) {
      errorMessage.textContent = 'El mensaje debe tener al menos 10 caracteres.';
      isFormValid = false;
    } else {
      errorMessage.textContent = '';
    }

    if (isFormValid) {
      successMessage.hidden = false;
      contactForm.reset();

      // Oculta el mensaje de éxito automáticamente después de unos segundos
      setTimeout(() => {
        successMessage.hidden = true;
      }, 4000);
    } else {
      successMessage.hidden = true;
    }
  });
}

/* =====================================================
   5. BOTÓN "VOLVER ARRIBA"
   ===================================================== */
function setupBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');

  if (!backToTopButton) return;

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}