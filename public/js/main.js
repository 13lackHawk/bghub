// Простая заглушка для онлайн-статистики
document.addEventListener('DOMContentLoaded', () => {
  const onlineCount = document.getElementById('online-count');
  // Имитация случайного числа игроков
  const count = Math.floor(Math.random() * 100 + 30); // 30–130
  onlineCount.textContent = `${count} игроков`;
});
