var fs = require('fs');
var mysql = require('mysql');

//module.exports = 
class sql {

    static getConnection() {
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "123456"
        });
        return con.connect(function (err) {
            if (err) throw err;
            console.log('connected');
        });
    }

}
sql.getConnection();

