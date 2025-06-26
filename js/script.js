  document.addEventListener('DOMContentLoaded', () => {
    const area = document.querySelector('.container_buttons-area');
    const panel = area.querySelector('.button-panel');
    const closeIcon = panel.querySelector('.close-icon');
    const callBtn = document.getElementById('call-button-2');

    const labels = {
      ru: '📞 Позвонить',
      en: '📞 Make Call',
      he: '📞 להתקשר',
      ua: '📞 Зателефонувати'
    };

    function getCurrentLang() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('lang') || 'ru';
    }

    function updateCallButtonText() {
      const lang = getCurrentLang();
      callBtn.textContent = labels[lang] || labels['ru'];
    }

    // 1. Установка при загрузке
    updateCallButtonText();

    // 2. Клик по области — показать панель и обновить язык
    area.addEventListener('click', function (e) {
      if (panel.contains(e.target)) return;

      updateCallButtonText(); // обновляем язык каждый раз при открытии

      const rect = area.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      panel.style.left = `${clickX}px`;
      panel.style.top = `${clickY}px`;
      panel.classList.remove('hidden');
    });

    // 3. Закрытие по ✖
    closeIcon.addEventListener('click', function (e) {
      e.stopPropagation();
      panel.classList.add('hidden');
    });

    // 4. Закрытие по клику вне области
    document.addEventListener('click', function (e) {
      if (!area.contains(e.target)) {
        panel.classList.add('hidden');
      }
    });
  });
