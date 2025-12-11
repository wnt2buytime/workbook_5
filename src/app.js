const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const contactsRouter = require('./routes/contacts');
const requestTime = require('./middleware/requestTime');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestTime);
app.use(logger);
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    at: req.requestedAt.toISOString(),
  });
});

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Contact book API listening on http://localhost:${PORT}`);
});


