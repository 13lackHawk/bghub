// === Ввод ника при первом заходе ===
function initNickname() {
  const savedNick = localStorage.getItem('userNick');
  const modal = document.getElementById('nickname-modal');
  const input = document.getElementById('nickname-input');
  const btn = document.getElementById('nickname-ok');

  if (savedNick) {
    modal.remove(); // Удаляем модалку
    joinSpectators(savedNick); // Добавляем в зрителей
  } else {
    btn.addEventListener('click', () => {
      const nick = input.value.trim();
      if (nick) {
        localStorage.setItem('userNick', nick);
        modal.remove();
        joinSpectators(nick);
      }
    });

    input.focus();
  }
}

// Добавить игрока в зрителей
function joinSpectators(nick) {
  const list = document.getElementById('spectators-list');
  const box = document.createElement('div');
  box.className = 'spectator-box';
  box.textContent = nick.charAt(0).toUpperCase();
  box.title = nick;
  box.onclick = () => moveToTeam(nick); // Позже реализуем переход в команду
  list.appendChild(box);

  window.playerData = { nick, team: 'spectators', isReady: false };
}

// Вызов при загрузке
document.addEventListener('DOMContentLoaded', () => {
  initNickname();
});

// === Логика хоста ===
let isHost = false;

function checkHost() {
  // Простой способ: если только один игрок — он хост
  const players = document.querySelectorAll('.team-box, .spectator-box');
  if (players.length === 1) {
    isHost = true;
  }
}

checkHost();

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
let timer = 2; // 2 секунды для дебага
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

function blockTeams() {
  // Блокируем команды
  const teamBoxes = document.querySelectorAll('.team-box');
  teamBoxes.forEach(box => {
    box.style.pointerEvents = 'none';
  });
  
  // Убираем кнопку
  this.style.display = 'none';
}

function setScore(wordId, value) {
  // Обнуляем готовность всех игроков
  const readyBtn = document.getElementById('next-btn');
  if (readyBtn.textContent === 'Готов') {
    readyBtn.textContent = 'Дальше';
  }
  
  // Обновляем значение
  const scoreEl = document.querySelector(`[data-word-id="${wordId}"]`);
  scoreEl.textContent = value;
}

// Клик по кнопке "Готов"
//nextBtn.addEventListener('click', () => {
//  if (nextBtn.textContent === 'Готов') {
//    nextBtn.style.backgroundColor = '#ff8c00'; // Оранжевый цвет
//  } else {
//    nextBtn.style.backgroundColor = '#0066cc'; // Синий цвет
//  }
//});
