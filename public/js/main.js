// === Правила игр ===
const rules = {
  taboo: `
    <h2>Табу</h2>
    <p><strong>Цель игры:</strong> объяснить слово, избегая 5 запрещённых ассоциаций: слов-табу. За каждое угаданное слово — 1 очко.</p>
    
    <p><strong>Ход игры:</strong></p>
    <ul>
      <li>Одна команда объясняет слова в течение 1 минуты. Эти слова могут быть абсолютно любыми, в том числе глаголами и прилагательными.</li>
      <li>Если ведущий говорит слово-табу или как-либо нарушает правила — он пропускает текущее слово и берёт следующее.</li>
      <li>Вражеская команда должна запоминать пропущенные слова и сразу же говорить о нарушении ведущему.</li>
      <li>По истечению минуты раунд заканчивается и вражеская команда должна забрать пропущенные слова в свою копилку: по 1 очку за каждое слово.</li>
    </ul>

    <p><strong>Особенности:</strong></p>
    <ul>
      <li>Запрещено: однокоренные слова, части слов, аббревиатуры и сокращения, созвучные слова.</li>
      <li>Можно: говорить о роде, длине, происхождении слова. А также же можно петь, шутить и веселиться :)</li>
      <li>Для игры крайне рекомендуется голосовая связь!</li>
    </ul>
  `,

  werewords: `
    <h2>Werewords</h2>
    <p>WIP</p>
  `,

  soclover: `
    <h2>So Clover!</h2>
    <p>WIP</p>
  `,

  landmarks: `
    <h2>Landmarks</h2>
    <p>WIP</p>
  `
};

// === Модальные окна ===
function openModal(game) {
  const modal = document.getElementById('rulesModal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');

  title.textContent = '';
  body.innerHTML = rules[game] || '<p>Правила пока не добавлены.</p>';

  modal.style.display = 'flex';
}

function closeModal() {
  document.getElementById('rulesModal').style.display = 'none';
}

// Закрытие по клику вне окна
window.onclick = function(event) {
  const modal = document.getElementById('rulesModal');
  if (event.target === modal) {
    closeModal();
  }
};

// === Переключение темы ===
let currentTheme = 0;
const themes = ['theme-warm-neon', 'theme-white'];

function toggleTheme() {
  const body = document.body;
  
  // Удаляем текущую тему
  body.classList.remove(themes[currentTheme]);
  
  // Переходим к следующей
  currentTheme = (currentTheme + 1) % themes.length;
  
  // Добавляем новую
  body.classList.add(themes[currentTheme]);
  
  // Сохраняем в localStorage
  localStorage.setItem('theme', themes[currentTheme]);
}

// Делаем функцию доступной глобально
window.toggleTheme = toggleTheme;

// === Восстановление темы при загрузке ===
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme && themes.includes(savedTheme)) {
    currentTheme = themes.indexOf(savedTheme);
  } else {
    currentTheme = 0;
    localStorage.setItem('theme', 'theme-warm-neon');
  }
  
  // Применяем тему
  document.body.classList.add(themes[currentTheme]);

  // Онлайн-статистика
  const onlineCount = document.getElementById('online-count');
  const count = Math.floor(Math.random() * 100 + 30);
  onlineCount.textContent = `${count} игроков`;
});
