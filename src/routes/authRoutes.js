const router = require('express').Router();
const authController = require('../db/controllers/authController');
const passport = require('passport');

router.post('/login', passport.authenticate('local'), authController.login);
router.get('/logout', authController.logout);

module.exports = router;