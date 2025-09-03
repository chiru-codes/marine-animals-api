const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./database');
const marineRouter = require('./routes/marineAnimals');

app.use('/api/marine', marineRouter);

app.listen(port, () => {
  console.log(`API siendo llamada en http://localhost:${port}/api/marine`);
});
