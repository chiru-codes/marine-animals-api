const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./database');
const marineRouter = require('./routes/marineAnimals');

app.use('/api/marine', marineRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`API de animales marinos escuchando en http://0.0.0.0:${port}/api/marine`);
});
