const express = require('express');

const APP_PORT = 3000;

const app = express();

app.get('/movie', (req, res) => {
  const data = { message: 'Hello world!' };
  res.set('Cache-Control', 'private, max-age=3600');
  res.json(data);
})

app.listen(APP_PORT, () => {
    console.log(`up and running on port ${APP_PORT}`);
});
