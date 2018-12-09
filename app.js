const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config/database');
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {console.log('Database Connected '+config.database);});
mongoose.connection.on('error', (err) => {console.log(err);});

const port = process.env.port || 8080;

const app = express();

// cors middleware
app.use(cors());

// bodyparser middleware
app.use(bodyParser.json());

// static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/menu', require('./api/menu'));
app.use('/banner', require('./api/banner'));
app.use('/about', require('./api/about'));
app.use('/portfolio', require('./api/portfolio'));
app.use('/skill', require('./api/skill'));
app.use('/user', require('./api/user'));
app.use('/setting', require('./api/setting'));

app.get('*', (req, res, next) => {
    res.sendfile('index.html');
});


app.listen(port, () => { console.log(`Server started at localhost:${port}`);});