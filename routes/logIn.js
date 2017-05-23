var express = require('express');
var router = express.Router();
var sql = require('./../classes/getContent');
var con = new sql('root', '123456');

router.get('/', function (req, res) {
    console.log(req.query)
    con.checkUser(req.query.login, req.query.password)
        .then(function (selected) {
            console.log(selected[0])
            if (selected[0] === undefined) {
                res.send('alert("Не верный логин или пароль")');
            } else {
                res.redirect('/');
            }
        });
});

module.exports = router;