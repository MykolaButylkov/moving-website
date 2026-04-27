// document.querySelectorAll('.lang-btn').forEach(button => {
//     button.addEventListener('click', () => {
//       const newLang = button.getAttribute('data-lang');

//       // Текущий путь
//       const currentPath = window.location.pathname;

//       // Заменяем существующий язык в path
//       let newPath = currentPath.replace(/\/(ru|ua|en|he)\//, `/${newLang}/`);

//       // Если язык не был указан — добавим в начало
//       if (!/\/(ru|ua|en|he)\//.test(currentPath)) {
//         newPath = `/${newLang}${currentPath.startsWith('/') ? '' : '/'}${currentPath}`;
//       }

//       // Только если путь действительно изменился — делаем переход
//       if (window.location.pathname !== newPath) {
//         window.location.pathname = newPath;
//       }
//     });
//   });

// document.querySelectorAll('.desktop-lang-btn').forEach(button => {
//     button.addEventListener('click', () => {
//       const newLang = button.getAttribute('data-lang');

//       // Текущий путь
//       const currentPath = window.location.pathname;

//       // Заменяем существующий язык в path
//       let newPath = currentPath.replace(/\/(ru|ua|en|he)\//, `/${newLang}/`);

//       // Если язык не был указан — добавим в начало
//       if (!/\/(ru|ua|en|he)\//.test(currentPath)) {
//         newPath = `/${newLang}${currentPath.startsWith('/') ? '' : '/'}${currentPath}`;
//       }

//       // Только если путь действительно изменился — делаем переход
//       if (window.location.pathname !== newPath) {
//         window.location.pathname = newPath;
//       }
//     });
//   });
document.addEventListener('DOMContentLoaded', () => {
  const langs = ['ru', 'ua', 'en', 'he'];

  document.querySelectorAll('.lang-btn, .desktop-lang-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      const newLang = button.dataset.lang;
      if (!langs.includes(newLang)) return;

      const currentPath = window.location.pathname;
      const parts = currentPath.split('/').filter(Boolean);

      // Убираем index.html, если он есть
      if (parts[parts.length - 1] === 'index.html') {
        parts.pop();
      }

      const langIndex = parts.findIndex(part => langs.includes(part));

      if (langIndex !== -1) {
        parts[langIndex] = newLang;
      } else {
        parts.push(newLang);
      }

      const newPath = '/' + parts.join('/') + '/';
      window.location.href = `${newPath}?lang=${newLang}`;
    });
  });
});