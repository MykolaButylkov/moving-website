const avatars = [
  // Micah (современный мульт стиль)
  'https://api.dicebear.com/8.x/micah/svg?seed=user1',
  'https://api.dicebear.com/8.x/micah/svg?seed=user44',
  'https://api.dicebear.com/8.x/micah/svg?seed=user4',
  'https://api.dicebear.com/8.x/micah/svg?seed=use45',
  'https://api.dicebear.com/8.x/micah/svg?seed=user9',
  'https://api.dicebear.com/8.x/micah/svg?seed=user10',
  'https://api.dicebear.com/8.x/micah/svg?seed=user5',
  'https://api.dicebear.com/8.x/micah/svg?seed=user43',
  'https://api.dicebear.com/8.x/micah/svg?seed=user22',
  'https://api.dicebear.com/8.x/micah/svg?seed=user27',
  'https://api.dicebear.com/8.x/micah/svg?seed=user28',
  'https://api.dicebear.com/8.x/micah/svg?seed=user47',
  'https://api.dicebear.com/8.x/micah/svg?seed=user30',
  'https://api.dicebear.com/8.x/micah/svg?seed=user31',
  'https://api.dicebear.com/8.x/micah/svg?seed=user36',
];

// Отрисовываем все аватары на странице
window.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('avatarGrid');
  const hiddenInput = document.getElementById('avatarReview');

  avatars.forEach((url, index) => {
    const div = document.createElement('div');
    div.className = 'avatar-option';
    div.innerHTML = `<img src="${url}" alt="avatar-${index}">`;

    div.addEventListener('click', () => {
      document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
      div.classList.add('selected');
      hiddenInput.value = url;
    });

    grid.appendChild(div);
  });

  // По умолчанию выбираем первый
  if (avatars.length > 0) {
    grid.children[0].classList.add('selected');
    hiddenInput.value = avatars[0];
  }

  loadReviews(); // загружаем отзывы после инициализации аватаров
});

function submitReview() {
  const name = document.getElementById('nameReview').value;
  const message = document.getElementById('messageReview').value;
  const rating = document.getElementById('ratingReview').value;

  if (!name || !message) {
    alert('Пожалуйста, заполните все поля.');
    return;
  }

  const avatar = document.getElementById('avatarReview').value;
  const reviewRef = db.ref('reviews').push();
  const reviewData = {
    name,
    message,
    rating,
    avatarUrl: avatar,
    timestamp: new Date().toISOString()
  };

  reviewRef.set(reviewData);
  alert('Спасибо за отзыв!');
}

function loadReviews() {
  const reviewsSection = document.getElementById('reviews-section');

  db.ref('reviews').on('value', snapshot => {
    reviewsSection.innerHTML = ''; // Очистка перед добавлением новых отзывов
    const reviews = snapshot.val();
    if (reviews) {
      // Сортировка по дате (новые выше)
      const sortedReviews = Object.entries(reviews).sort((a, b) => {
        return new Date(b[1].timestamp) - new Date(a[1].timestamp);
      });

      sortedReviews.forEach(([id, review]) => {
        const reviewEl = document.createElement('div');
        reviewEl.classList.add('review');
        reviewEl.dataset.reviewId = id;

        // Заголовок: аватар + имя
        const header = document.createElement('div');
        header.classList.add('review-header');

        const avatar = document.createElement('img');
        avatar.src = review.avatarUrl || 'https://placekitten.com/80/80';
        avatar.alt = "Аватар";
        avatar.classList.add('review-avatar');

        const name = document.createElement('h3');
        name.textContent = review.name;
        name.style.margin = '0';

        header.appendChild(avatar);
        header.appendChild(name);
        reviewEl.appendChild(header);

        // Дата создания
        const date = document.createElement('p');
        const createdAt = new Date(review.timestamp);
        const day = String(createdAt.getDate()).padStart(2, '0');
        const month = String(createdAt.getMonth() + 1).padStart(2, '0'); // Месяцы с 0
        const year = createdAt.getFullYear();
        const hours = String(createdAt.getHours()).padStart(2, '0');
        const minutes = String(createdAt.getMinutes()).padStart(2, '0');
        date.textContent = `🕒 ${day}.${month}.${year} ${hours}:${minutes}`;

        date.style.fontSize = '0.85em';
        date.style.color = '#777';
        reviewEl.appendChild(date);

        // Рейтинг
        const rating = document.createElement('p');
        rating.textContent = 'Рейтинг: ' + '⭐'.repeat(review.rating);
        rating.classList.add('review-rating');
        reviewEl.appendChild(rating);

        // Сообщение
        const message = document.createElement('p');
        message.textContent = review.message;
        reviewEl.appendChild(message);

        // Кнопка удаления — только для админа
        if (localStorage.getItem('isAdmin') === 'true') {
          const del = document.createElement('button');
          del.textContent = '🗑 Удалить';
          del.classList.add('delete-btn');
          del.style.marginTop = '10px';
          del.style.background = '#e53935';
          del.style.color = '#fff';
          del.style.border = 'none';
          del.style.padding = '8px 12px';
          del.style.borderRadius = '6px';
          del.style.cursor = 'pointer';
          del.onclick = () => {
            if (confirm('Удалить этот отзыв?')) {
              db.ref('reviews/' + id).remove();
              reviewEl.remove();
            }
          };
          reviewEl.appendChild(del);
        }

        reviewsSection.appendChild(reviewEl);
      });
    }
  });
}
