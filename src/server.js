const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Обслуживаем статические файлы из папки public
app.use(express.static(path.join(__dirname, '../public')));

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Простой маршрут для проверки
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
  console.log(`📁 Папка: ${path.join(__dirname, '../public')}`);
});
