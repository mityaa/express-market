var sql = require('./getContent');
var connect = new sql('root', '123456');
// connect.createDatabase()
//     .then(function (msg) {
//         console.log(msg);
//         connect.createTables()
//             .then(function () {
//             });
//     }, (err) = {
//     });
                connect.insertUsers('cdewvc', 'cdsvc', 'cvwdv');
                connect.checkUser('mitya', 'mkitya');
                connect.getGoodsAndInsertInDb();