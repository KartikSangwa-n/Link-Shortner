const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

require ('dotenv').config()
const PORT = process.env.PORT || 4000;

require('./db');

const urlRoutes = require('./routes/urlRoutes');

app.use('/' ,urlRoutes);
app.get('/', (req, res) =>
{
    res.send('API is running...');
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})