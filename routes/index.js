var express = require('express');
var router = express.Router();
var images = require('fs').readdirSync('./public/img/gallery/');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: images });
});

module.exports = router;
