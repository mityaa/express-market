var express = require('express');
var router = express.Router();
var sql = require('../classes/getContent');
var connection = new sql('root', '123456');

router.get('/', function (req, res) {
    connection.selectGoods()
        .then(function (result) {
            res.render('goodsList', { path: result });
        });
});

module.exports = router;