// Логика игры Taboo
let currentWord = "ПРИШПОРИВАТЬ";
let mines = ["Лошадь", "Двигаться", "Быстрее", "Темп", "Галоп"];

function joinTeam(side) {
  const teamBox = document.querySelector(`.team-${side}`);
  teamBox.style.backgroundColor = side === 'left' ? '#FF3E8D' : '#BD26FF';
}

function toggleSettings() {
  const menu = document.getElementById('settings-menu');
  if (menu.style.display === 'flex') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'flex';
  }
}

function openModal(game) {
  // Открытие модального окна с правилами
  const modal = document.getElementById('rulesModal');
  modal.style.display = 'flex';
}

function scoreWord(team) {
  alert(`Засчитано за ${team} команду`);
}

// Динамическая кнопка
const nextBtn = document.getElementById('next-btn');
nextBtn.textContent = 'Дальше';

// Таймер: 60 секунд, формат 00:09
let timer = 60;
const timerEl = document.querySelector('.timer');

setInterval(() => {
  if (timer > 0) {
    timer--;
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    nextBtn.textContent = 'Готов';
  }
}, 1000);

// Клик по кнопке "Готов"
nextBtn.addEventListener('click', () => {
  if (nextBtn.textContent === 'Готов') {
    nextBtn.style.backgroundColor = '#FF6B35'; // Цвет при наведении
  } else {
    nextBtn.style.backgroundColor = '#FF3E8D'; // Возвращаем обратно
  }
});
