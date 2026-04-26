document.addEventListener('DOMContentLoaded', () => {
  const langMap = {
    ru: '/ru/?lang=ru',
    ua: '/ua/?lang=ua',
    en: '/en/?lang=en',
    he: '/he/?lang=he'
  };

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      const lang = btn.dataset.lang;
      const target = langMap[lang];
      if (target) {
        window.location.href = target;
      }
    }, true);
  });

  const path = window.location.pathname;
  if (path.includes('/he/')) {
    document.documentElement.lang = 'he';
    document.documentElement.dir = 'rtl';
  } else if (path.includes('/en/')) {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  } else if (path.includes('/ua/')) {
    document.documentElement.lang = 'uk';
    document.documentElement.dir = 'ltr';
  } else {
    document.documentElement.lang = 'ru';
    document.documentElement.dir = 'ltr';
  }

  const revealTargets = document.querySelectorAll('.reveal, .owner-review, .review-form, .reviews-shell');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  const heroCard = document.querySelector('.desktop-hero__card');
  const heroVisual = document.querySelector('.desktop-hero__visual');
  if (heroCard && heroVisual && window.innerWidth >= 1024) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      heroCard.style.transform = `rotate(1deg) translate(${x}px, ${y}px)`;
    });
    heroVisual.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'rotate(1deg) translate(0, 0)';
    });
  }
});
