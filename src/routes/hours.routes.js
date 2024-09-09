const express = require('express')
const hours = require('../controllers/hours.controller')
var router = express.Router();
const { auth } = require('../validators/helper');

// Get All hours
router.get('/', auth, hours.findAll);

// Get a Single hour
router.get('/buscar', auth, hours.find);

// Create a hour
router.post('/create', auth, hours.create);

// Update a hour
router.get('/edit/:id', auth, hours.edit);

router.post('/edit/:id', auth, hours.update);

// Delete a hour
router.get('/delete/:id', auth, hours.delete);

module.exports = router;