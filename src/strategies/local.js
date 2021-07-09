const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const Customer = require('../db/models/customerModels');

passport.use(new LocalStrategy(
  (username, password, done) => {
    Customer.findOne({phone: username})
      .then(user  => {
        if (!user) done(null, false, 'Incorrect username');
        if (!user.comparePassword(password)) done(null, false, 'Incorrect password');
        return done(null, user);
      })
      .then(err => {
        if (err) done(null, err);
      })
  }
))

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) =>  {
  done(null, user);
});