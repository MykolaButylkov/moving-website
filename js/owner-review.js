const ownerReviewTranslations = {
    ru: {
        name: "Микола Бутылков",
        badge: "владелец",
        text: `
      Привет!👋 <br>
      Меня зовут Микола Бутылков — я сам лично стою за этим сервисом переездов🚚.<br>
      Если вы читаете это сообщение — значит, вы ищете не просто перевозку, а нормальных людей, с которыми можно
      спокойно договориться, без нервов и сюрпризов.
      Я с вами на связи от первого 📞звонка и до последней коробки📦, всегда честно объясняю, как всё будет, и слежу,
      чтобы всё прошло ровно.
      Хотите — оставьте отзыв, хотите — просто напишите 'привет'😊.<br>
      <strong> Всё сделаю как для себя 💪</strong>
    `
    },
    ua: {
        name: "Микола Бутилков",
        badge: "власник",
        text: `
      Привіт!👋 <br>
      Мене звати Микола Бутилков — я особисто стою за цим сервісом переїздів🚚.<br>
      Якщо ви читаєте це повідомлення — значить, ви шукаєте не просто перевезення, а нормальних людей, з якими можна
      спокійно домовитись, без стресу та несподіванок.
      Я з вами на зв’язку від першого 📞дзвінка до останньої коробки📦, завжди чесно пояснюю, як усе буде, і стежу,
      щоб усе пройшло рівно.
      Хочете — залишайте відгук, хочете — просто напишіть «привіт»😊.<br>
      <strong> Зроблю все, як для себе 💪</strong>
    `
    },
    en: {
        name: "Mykola Butylkov",
        badge: "owner",
        text: `
      Hi there!👋 <br>
      My name is Mykola Butylkov — I'm the person behind this moving service🚚.<br>
      If you're reading this, you're probably looking for more than just a van — you want real people you can trust,
      no stress, no surprises.
      I'm with you from the first 📞call to the last 📦box, always transparent and in touch.
      Feel free to leave a review or just say "hi" 😊.<br>
      <strong> I'll handle it like it’s my own move 💪</strong>
    `
    },
    he: {
        name: "מיקולה בוטילקוב",
        badge: "בעל",
        text: `
      שלום!👋 <br>
      שמי מיקולה בוטילקוב — אני עומד אישית מאחורי השירות הזה של ההובלות🚚.<br>
      אם אתה קורא את ההודעה הזו, כנראה שאתה מחפש לא רק הובלה, אלא אנשים אמינים שאפשר לסמוך עליהם,
      בלי לחץ ובלי הפתעות.
      אני איתך מהשיחה הראשונה 📞 ועד הקרטון האחרון 📦, מדבר בגובה העיניים ודואג להכל.
      אפשר להשאיר ביקורת או פשוט לכתוב "היי" 😊.<br>
      <strong> אני אטפל בהובלה כאילו זו שלי 💪</strong>
    `
    }
};

function getCurrentLang() {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");
    return ["ru", "ua", "en", "he"].includes(lang) ? lang : "ru";
}

function updateOwnerReviewLang() {
    const lang = getCurrentLang();
    const t = ownerReviewTranslations[lang];

    const reviewEl = document.getElementById("owner-review");
    if (!reviewEl || !t) return;

    const p = reviewEl.querySelector(".review-text p");
    const nameEl = reviewEl.querySelector(".review-name");
    const badgeEl = reviewEl.querySelector(".owner-badge");

    if (p) p.innerHTML = t.text;
    if (nameEl) nameEl.childNodes[0].textContent = t.name + " "; // пробел важен
    if (badgeEl) badgeEl.textContent = t.badge;
}

// При загрузке страницы
window.addEventListener("DOMContentLoaded", updateOwnerReviewLang);

// При клике по кнопкам языка
document.addEventListener("click", (e) => {
    if (e.target.matches(".lang-btn")) {
        setTimeout(updateOwnerReviewLang, 300); // даём URL обновиться
    }
});
