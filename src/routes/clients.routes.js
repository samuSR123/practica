const express = require('express')
const clients = require('../controllers/client.controller')
var router = express.Router();
const { auth } = require('../validators/helper');

// Get All clients
router.get('/', auth, clients.findAll);

// Delete a client
router.get('/delete/:id', auth, clients.delete);

module.exports = router;