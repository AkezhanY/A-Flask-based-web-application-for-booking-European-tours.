<!-- Подключение библиотек -->
<script src="https://unpkg.com/scrollreveal"></script>
<script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>

<script>
  // Инициализация EmailJS
  (function() {
    emailjs.init("c4s_o7U-aESLw-MMr");
  })();

  // Мобильное меню
  const menu = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');

  menu.addEventListener('click', () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
  });

  // Закрытие меню при клике на ссылку
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('bx-x');
      navbar.classList.remove('active');
    });
  });

  // Закрытие меню при прокрутке
  window.addEventListener('scroll', () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
  });

  // Открытие модального окна
  function openModal(projectId) {
    console.log(`Opening modal for ${projectId}`);
    // document.getElementById(`${projectId}-modal`).style.display = 'block';
  }

  // Закрытие модального окна
  function closeModal(projectId) {
    console.log(`Closing modal for ${projectId}`);
    // document.getElementById(`${projectId}-modal`).style.display = 'none';
  }

  // Подписка на рассылку
  function sendNewsletterEmail() {
    const userEmail = document.getElementById("newsletter-email").value;

    if (!userEmail) {
      alert("Please enter your email.");
      return;
    }

    if (!userEmail.includes('@') || !userEmail.includes('.')) {
      alert("Please enter a valid email address.");
      return;
    }

    emailjs.send("service_oh934wn", "template_qtd1qkf", {
      user_email: userEmail
    })
    .then(function(response) {
      alert("Thank you for subscribing!");
      document.getElementById("newsletter-email").value = "";
    }, function(error) {
      console.error("Failed to send email:", error);
      alert("Failed to subscribe. Please try again later.");
    });
  }

  // Инициализация после загрузки страницы
  document.addEventListener('DOMContentLoaded', function() {
    // Анимация прогресс-баров
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });

    // ScrollReveal
    const sr = ScrollReveal({
      distance: '60px',
      duration: 2500,
      delay: 400,
      reset: true
    });

    sr.reveal('.investment-hero', { delay: 200, origin: 'top' });
    sr.reveal('.heading', { delay: 300, origin: 'top' });
    sr.reveal('.project-card', { delay: 200, origin: 'bottom', interval: 200 });
    sr.reveal('.newsletter', { delay: 300, origin: 'bottom' });
  });
</script>