// Логика игры Taboo
let currentWord = "ПРИШПОРИВАТЬ";
let mines = ["Лошадь", "Двигаться", "Быстрее", "Темп", "Галоп"];

function joinTeam(side) {
  const teamBox = document.querySelector(`.team-${side}`);
  teamBox.style.backgroundColor = side === 'left' ? '#FF3E8D' : '#BD26FF';
}

function toggleSettings() {
  const menu = document.getElementById('settings-menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
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

// Таймер
let timer = 50;
const timerEl = document.querySelector('.timer');
setInterval(() => {
  if (timer > 0) {
    timer--;
    timerEl.textContent = `00:${timer}`;
  } else {
    nextBtn.textContent = 'Готов';
  }
}, 1000);
