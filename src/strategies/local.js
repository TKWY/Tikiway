const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const Customer = require('../db/models/customerModels');

passport.use(new LocalStrategy(
  (username, password) => {
    Customer.findOne({phone: username})
      .then(response => {
        console.log(response)
        return response
      })
  }
))

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) =>  {
  done(null, user);
});