var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('loginForm', { formText: 'Форма входа' });
});

module.exports = router;