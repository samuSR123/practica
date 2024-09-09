const express = require('express')
const schedule = require('../controllers/schedule.controller')
var router = express.Router();
const { auth } = require('../validators/helper');

// Get All hours
// router.get('/usuario', schedule.find);
router.get('/', auth, schedule.findAll)

// // Get hour
router.get('/buscar', auth, schedule.find);

// Create a hour
router.post('/create/:id', schedule.create);

// Delete a hour
router.get('/delete/:id', auth, schedule.delete);

module.exports = router;