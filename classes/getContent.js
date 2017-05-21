var fs = require('fs');
var mysql = require('mysql');

module.exports = class sql {

    constructor(usr, pass) {
        this.user = usr;
        this.password = pass;
    }
    getConnection(database) {
        database = database || undefined;
        var _self = this;
        var con = mysql.createConnection({
            host: "localhost",
            user: _self.user,
            password: _self.password,
            database: database
        });
        con.connect(function (err) {
            if (err) throw err;
            console.log('connected');
        });
        return con;
    }

    createDatabase() {
        var con = this.getConnection();
        return new Promise(function (resolve, reject) {
            con.query("CREATE DATABASE market", function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve("Database created");
                    con.end();
                }
            });
        });
    }

    createTables() {
        var con = this.getConnection('market');
        var sqlUsers = "CREATE TABLE users (id VARCHAR(255), login VARCHAR(255), password VARCHAR(255), email VARCHAR(255))";
        con.query(sqlUsers, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
        con.end();
    }

};
