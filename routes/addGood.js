var fileUpload = require('express-fileupload');
var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var sqlWorker = require('../classes/getContent');
var sql = new sqlWorker('root', '123456');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(fileUpload());
router.post('/', urlencodedParser, function (req, res) {
    console.log(req);
    // sql.addGood(req);
    // res.redirect('/getAdmin');
    res.end();
});

module.exports = router;