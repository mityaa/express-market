var express = require('express');
var router = express.Router();
var sql = require('./../classes/getContent');
var con = new sql('root', '123456');

router.get('/', function (req, res) {
    res.render('loginForm', { formText: 'Форма входа' });
});

module.exports = router;