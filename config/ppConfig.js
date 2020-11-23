const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models')

// passport serialize your info, making log in easier
passport.serializeUser((user, cb) => {
    cb(null, user.id)
});

// passport deserialize looks up ID in database
passport.deserializeUser((user, cb) => {
    db.user.findByPk(id)
    .then(user => {
        if (user) {
            cb(null, user);
        }
    })
    .catch(err => {
        console.log(err);
    })
})