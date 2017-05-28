var express = require('express');
var router = express.Router();
var images = require('fs').readdirSync('./public/img/gallery/');

router.get('/', function (req, res) {
    res.render('goods', { path: images });
});

module.exports = router;