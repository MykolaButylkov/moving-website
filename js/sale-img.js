function updateHeroImageByLang() {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang');

    const imgRu = document.querySelector('img[alt^="Переезд от"]');
    const imgUa = document.querySelector('img[alt^="Переїзд від"]');
    const imgEn = document.querySelector('img[alt^="deal for one apartment"]');
    const imgHe = document.querySelector('img[alt^="מבצע"]');
    const button = document.querySelector('.cartoon-button');

    // Скрываем все изображения
    [imgRu, imgUa, imgEn, imgHe].forEach(img => {
        if (img) img.style.display = 'none';
    });

    if (lang === 'ru') {
        document.body.style.backgroundColor = '#B7D9DD';
        if (imgRu) imgRu.style.display = 'block';
        if (button) button.textContent = '🚚 Оставить заявку';
    } else if (lang === 'ua') {
        document.body.style.backgroundColor = '#B7D9DD';
        if (imgUa) imgUa.style.display = 'block';
        if (button) button.textContent = '🚚 Залишити заявку';
    } else if (lang === 'en') {
        document.body.style.backgroundColor = '#FFBD1B';
        if (imgEn) imgEn.style.display = 'block';
        if (button) button.textContent = '🚚 Submit a request';
    } else if (lang === 'he') {
        document.body.style.backgroundColor = '#FDC22C';
        if (imgHe) imgHe.style.display = 'block';
        if (button) button.textContent = '🚚 שלח בקשה';
    } else {
        // По умолчанию RU
        document.body.style.backgroundColor = '#B7D9DD';
        if (imgRu) imgRu.style.display = 'block';
        if (button) button.textContent = '🚚 Оставить заявку';
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
