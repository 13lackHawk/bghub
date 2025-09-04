console.log('✅ script.js загружен');

// === Гарантированная инициализация после загрузки DOM ===
function waitForEl(selector, callback) {
  const el = document.querySelector(selector);
  if (el) {
    callback(el);
  } else {
    setTimeout(() => {
      waitForEl(selector, callback);
    }, 100);
  }
}

// === Ввод ника при первом заходе ===
function initNickname() {
  console.log('initNickname: запуск');

  const savedNick = localStorage.getItem('userNick');
  const modal = document.getElementById('nickname-modal');
  const input = document.getElementById('nickname-input');
  const btn = document.getElementById('nickname-ok');

  if (!modal || !input || !btn) {
    console.error('initNickname: элементы не найдены', { modal, input, btn });
    return;
  }

  if (savedNick) {
    console.log('Ник найден в localStorage:', savedNick);
    modal.remove();
    joinSpectators(savedNick);
  } else {
    console.log('Ник не найден, показываем модалку');

    btn.onclick = function () {
      const nick = input.value.trim();
      if (!nick) {
        alert('Введите никнейм');
        return;
      }
      if (nick.length > 32) {
        alert('Ник не должен превышать 32 символа');
        return;
      }

      localStorage.setItem('userNick', nick);
      modal.remove();
      joinSpectators(nick);
    };

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        btn.click();
      }
    });

    input.focus();
  }
}

function joinSpectators(nick) {
  const list = document.getElementById('spectators-list');
  if (!list) {
    console.error('Список зрителей не найден');
    return;
  }

  const box = document.createElement('div');
  box.className = 'spectator-box';
  box.textContent = nick;
  box.title = nick;
  box.onclick = () => moveToTeam(nick);
  list.appendChild(box);

  window.playerData = { nick, team: 'spectators', isReady: false };
  console.log('Игрок добавлен в зрителей:', nick);
}

// === Запускаем только когда DOM готов и элементы доступны ===
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    waitForEl('#nickname-modal', () => {
      setTimeout(initNickname, 200);
    });
  });
} else {
  waitForEl('#nickname-modal', () => {
    setTimeout(initNickname, 200);
  });
}

// === Вызов после полной загрузки DOM и всех скриптов ===
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initNickname();
  }, 100);
});

// Переместить игрока в команду
function moveToTeam(targetTeam) {
  console.log('moveToTeam вызвана:', targetTeam);
  const nick = window.playerData?.nick;
  if (!nick) return;

  const currentTeam = window.playerData.team;
  const spectatorBox = document.querySelector(`.spectator-box[title="${nick}"]`);
  const playerInTeam = document.querySelector(`.player-box[title="${nick}"]`);

  // Если уже в целевой команде — ничего не делаем
  if (currentTeam === targetTeam) return;

  // Удаляем из текущего места
  if (spectatorBox) {
    spectatorBox.remove();
  } else if (playerInTeam) {
    playerInTeam.remove();
  }

  // Добавляем в новую команду
  const teamBox = document.querySelector(`.team-${targetTeam}`);
  const playerBox = document.createElement('div');
  playerBox.className = 'player-box';
  playerBox.textContent = nick;
  playerBox.title = nick;
  playerBox.onclick = () => moveToSpectators(nick);
  teamBox.appendChild(playerBox);

  // Обновляем данные игрока
  window.playerData.team = targetTeam;
}

// Вернуться в зрителей
function moveToSpectators(nick) {
  const playerBox = document.querySelector(`.player-box[title="${nick}"]`);
  if (!playerBox) return;

  const list = document.getElementById('spectators-list');
  const box = document.createElement('div');
  box.className = 'spectator-box';
  box.textContent = nick;
  box.title = nick;
  box.onclick = () => moveToTeam('left'); // По умолчанию — в левую команду
  list.appendChild(box);

  playerBox.remove();
  window.playerData.team = 'spectators';
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
  const playerBox = document.querySelector('.player-box');
  if (!playerBox) return;

  const currentTeam = playerBox.parentElement.classList.contains('team-left') ? 'left' : 'right';
  const targetTeam = side === 'left' ? 'left' : 'right';

  if (currentTeam === targetTeam) {
    return; // Не двигаем, если уже в этой команде
  }

  // Удаляем из текущей команды
  playerBox.remove();

  // Добавляем в новую команду
  const teamBox = document.querySelector(`.team-${targetTeam}`);
  teamBox.appendChild(playerBox);
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

// === Обработчики кликов по зонам команд ===
document.querySelector('.team-left').onclick = function () {
  moveToTeam('left');
};

document.querySelector('.team-right').onclick = function () {
  moveToTeam('right');
};

// === Привязка кликов к зонам команд ===
document.addEventListener('DOMContentLoaded', () => {
  const leftTeam = document.querySelector('.team-left');
  const rightTeam = document.querySelector('.team-right');

  if (leftTeam && rightTeam) {
    console.log('✅ Зоны команд найдены, привязываем обработчики');
    leftTeam.onclick = () => moveToTeam('left');
    rightTeam.onclick = () => moveToTeam('right');
  } else {
    console.error('❌ Зоны команд не найдены');
  }
});

// Клик по кнопке "Готов"
//nextBtn.addEventListener('click', () => {
//  if (nextBtn.textContent === 'Готов') {
//    nextBtn.style.backgroundColor = '#ff8c00'; // Оранжевый цвет
//  } else {
//    nextBtn.style.backgroundColor = '#0066cc'; // Синий цвет
//  }
//});
