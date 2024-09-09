const express = require('express')
const users = require('../controllers/user.controller')
var router = express.Router();
const { validateCreate, validateCreateForeign } = require('../validators/user');

// Get
router.get('/', (req, res) => {
    res.render('user/user', {layout: 'layoutUsers'})
});

// Create a user
router.post('/create', validateCreate, users.create);
router.post('/create/extranjero', validateCreateForeign, users.createForeign);

module.exports = router;