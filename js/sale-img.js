function updateHeroImageByLang() {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang');

    const imgRuUa = document.querySelector('img[alt^="Переезд от"]');
    const imgHeEn = document.querySelector('img[alt^="מ בצע"]');

    if (lang === 'ru' || lang === 'ua') {
        document.body.style.backgroundColor = '#B7D9DD';
        imgRuUa.style.display = 'block';
        imgHeEn.style.display = 'none';
    } else if (lang === 'he' || lang === 'en') {
        document.body.style.backgroundColor = '#FDC22C';
        imgRuUa.style.display = 'none';
        imgHeEn.style.display = 'block';
    } else {
        document.body.style.backgroundColor = '#B7D9DD';
        imgRuUa.style.display = 'block';
        imgHeEn.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', updateHeroImageByLang);

// 🎯 Отслеживание изменений URL (смена языка)
window.addEventListener('popstate', updateHeroImageByLang);

// 🎯 Подмена истории вручную (если язык меняется без перезагрузки)
const originalPushState = history.pushState;
history.pushState = function () {
    originalPushState.apply(this, arguments);
    updateHeroImageByLang();
};