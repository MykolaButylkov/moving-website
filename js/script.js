  document.addEventListener('DOMContentLoaded', () => {
    const area = document.querySelector('.container_buttons-area');
    const panel = area.querySelector('.button-panel');
    const closeIcon = panel.querySelector('.close-icon');
    const callBtn = document.getElementById('call-button-2');

    const labels = {
      ru: '📞 Позвонить',
      en: '📞 Make Call',
      he: '📞 להתקשר',
      ua: '📞 Подзвонити'
    };

    function getCurrentLang() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('lang') || 'ru';
    }

    function updateCallButtonText() {
      const lang = getCurrentLang();
      callBtn.textContent = labels[lang] || labels['ru'];
    }

    function clampPosition(x, y) {
      const panelWidth = panel.offsetWidth + 17;
      const panelHeight = panel.offsetHeight;
      const areaRect = area.getBoundingClientRect();

      // Максимально допустимые координаты, чтобы панель не вылезала
      const maxX = area.clientWidth - panelWidth;
      const maxY = area.clientHeight - panelHeight;

      return {
        x: Math.max(0, Math.min(x, maxX)),
        y: Math.max(0, Math.min(y, maxY))
      };
    }

    updateCallButtonText();

    area.addEventListener('click', function (e) {
      if (panel.contains(e.target)) return;

      updateCallButtonText();

      // Вычисляем координаты клика
      const areaRect = area.getBoundingClientRect();
      const clickX = e.clientX - areaRect.left;
      const clickY = e.clientY - areaRect.top;

      // Временно показываем панель, чтобы получить её размеры
      panel.style.visibility = 'hidden';
      panel.classList.remove('hidden');

      // После рендеринга определим корректные координаты
      requestAnimationFrame(() => {
        const { x, y } = clampPosition(clickX, clickY);
        panel.style.left = `${x}px`;
        panel.style.top = `${y}px`;
        panel.style.visibility = 'visible';
      });
    });

    closeIcon.addEventListener('click', function (e) {
      e.stopPropagation();
      panel.classList.add('hidden');
    });

    document.addEventListener('click', function (e) {
      if (!area.contains(e.target)) {
        panel.classList.add('hidden');
      }
    });
  });
