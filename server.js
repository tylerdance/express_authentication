require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash')
const SECRET_SESSION = process.env.SECRET_SESSION
console.log(SECRET_SESSION);
const app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

// secret: what user will be given on site as a session cookie
// resave: saves session even if it's modifie, make this false
// saveUninitialized: if new session, it is saved, making it true
const sessionObject = {
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}

app.use(session(sessionObject));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.use('/auth', require('./routes/auth'));


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
