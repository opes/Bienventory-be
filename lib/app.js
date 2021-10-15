const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/inventory', require('./controllers/inventory'));
app.use('/api/v1/menus', require('./controllers/menus'));
app.use('/api/v1/sales', require('./controllers/sales'));

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
