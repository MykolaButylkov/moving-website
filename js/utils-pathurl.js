document.querySelectorAll('.lang-btn').forEach(button => {
    button.addEventListener('click', () => {
      const newLang = button.getAttribute('data-lang');

      // Текущий путь
      const currentPath = window.location.pathname;

      // Заменяем существующий язык в path
      let newPath = currentPath.replace(/\/(ru|ua|en|he)\//, `/${newLang}/`);

      // Если язык не был указан — добавим в начало
      if (!/\/(ru|ua|en|he)\//.test(currentPath)) {
        newPath = `/${newLang}${currentPath.startsWith('/') ? '' : '/'}${currentPath}`;
      }

      // Только если путь действительно изменился — делаем переход
      if (window.location.pathname !== newPath) {
        window.location.pathname = newPath;
      }
    });
  });
