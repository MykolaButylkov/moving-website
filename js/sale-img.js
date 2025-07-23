function getLangFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    const supportedLangs = ['ru', 'ua', 'en', 'he'];

    if (langParam && supportedLangs.includes(langParam)) {
        return langParam;
    }

    // Если параметра нет или он невалидный — fallback к path
    const path = window.location.pathname;
    if (path.includes('/ru/')) return 'ru';
    if (path.includes('/ua/')) return 'ua';
    if (path.includes('/en/')) return 'en';
    if (path.includes('/he/')) return 'he';

    return 'ru'; // язык по умолчанию
}

function updateHeroImageByLang() {
    const lang = getLangFromURL();

    const imgRu = document.querySelector('img[alt^="Переезд от"]');
    const imgUa = document.querySelector('img[alt^="Переїзд від"]');
    const imgEn = document.querySelector('img[alt^="deal for one apartment"]');
    const imgHe = document.querySelector('img[alt^="מבצע"]');
    const button = document.querySelector('.cartoon-button');

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
    }
}

// События
document.addEventListener('DOMContentLoaded', updateHeroImageByLang);
window.addEventListener('popstate', updateHeroImageByLang);

const originalPushState = history.pushState;
history.pushState = function () {
    originalPushState.apply(this, arguments);
    updateHeroImageByLang();
};
