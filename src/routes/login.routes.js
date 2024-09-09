const express = require('express')
const login = require('../controllers/login.controller')
var router = express.Router();
const { auth } = require('../validators/helper')

// Get All login
router.get('/', (req, res) => {
    res.render('login/login', { layout: false })
})

router.get('/register', (req, res) => {
    res.render('login/register', { layout: false })
})

// Get login
router.post('/auth', login.auth);

// Create a login
router.post('/create', login.register);

router.get('/logout', auth, function (req, res) {
    req.session.destroy();
    res.redirect('/login')
  });

module.exports = router;