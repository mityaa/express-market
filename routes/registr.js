var express = require('express');
var router = express.Router();
var sql = require('./../classes/getContent');
var con = new sql('root', '123456');

router.get('/', function (req, res) {
    res.end('alert("Registration Succesfully Completed!")');
    con.insertUsers(req.query.login, req.query.password, req.query.email);
});

module.exports = router;