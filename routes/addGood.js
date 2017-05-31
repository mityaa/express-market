var fileUpload = require('express-fileupload');
var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');

var router = express.Router();
var sqlWorker = require('../classes/getContent');
var sql = new sqlWorker('root', '123456');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var path = 'public/img/gallery/';

router.use(fileUpload());
router.post('/', urlencodedParser, function (req, res) {
    fs.writeFile(path + req.files.photo.name, new Buffer(req.files.photo.data), function (err) {
        if (err) {
            throw err;
        } else {
            console.log('image successfully loaded');
        }
    });
    sql.addGood(req);
    res.redirect('/getAdmin');
    res.end();
});

module.exports = router;