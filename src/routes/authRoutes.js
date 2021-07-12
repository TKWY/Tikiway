const router = require('express').Router();
const authController = require('../db/controllers/authController');

router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;