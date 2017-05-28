var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/', urlencodedParser, function (req, res) {
    console.log(req.body);
});

module.exports = router;