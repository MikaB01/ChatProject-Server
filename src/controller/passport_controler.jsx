const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (app) {
    const bookshelf = app.get('bookshelf');

    const User = bookshelf.model('Users');
    passport.use(new LocalStrategy(
        function(username, password, done) {
            console.log('not quite yet')
        }
    ));
    
}