function updateHeroImageByLang() {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang');

    const imgRuUa = document.querySelector('img[alt^="Переезд от"]');
    const imgHeEn = document.querySelector('img[alt^="מבצע"]'); // ✅ Исправлен селектор

    if (!imgRuUa || !imgHeEn) return; // защита, если картинки ещё не подгрузились

    if (lang === 'ru' || lang === 'ua') {
        document.body.style.backgroundColor = '#B7D9DD';
        imgRuUa.style.display = 'block';
        imgHeEn.style.display = 'none';
    } else if (lang === 'he' || lang === 'en') {
        document.body.style.backgroundColor = '#FDC22C';
        imgRuUa.style.display = 'none';
        imgHeEn.style.display = 'block';
    } else {
        // по умолчанию — русский/украинский
        document.body.style.backgroundColor = '#B7D9DD';
        imgRuUa.style.display = 'block';
        imgHeEn.style.display = 'none';
    }
}

// При загрузке страницы
document.addEventListener('DOMContentLoaded', updateHeroImageByLang);

// При переходах назад/вперёд
window.addEventListener('popstate', updateHeroImageByLang);

// При смене URL вручную через pushState
const originalPushState = history.pushState;
history.pushState = function () {
    originalPushState.apply(this, arguments);
    updateHeroImageByLang();
};
