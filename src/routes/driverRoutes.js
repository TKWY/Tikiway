const router = require('express').Router();
const drivers = require('../db/controllers/driversController');

router.get('/', drivers.getAllDriver);
router.post('/', drivers.createDriver);
router.get('/:driverId', drivers.getDriverById);
router.put('/:driverId', drivers.updateDriver);
router.delete('/:driverId', drivers.deleteDriver);

module.exports = router;