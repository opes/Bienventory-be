const express = require('express');

const app = express();

app.use(express.json());

app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/inventory', require('./controllers/inventory'));
app.use('/api/v1/menus', require('./controllers/menus'));

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
