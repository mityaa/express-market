var fs = require('fs');
var mysql = require('mysql');
var guid = require('guid');

module.exports = function (usr, pass) {
    this.user = usr;
    this.password = pass;

    this.getConnection = function (database) {
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
    };

    this.createDatabase = function () {
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
    };

    this.createTables = function () {
        var con = this.getConnection('market');
        var sqlUsers = "CREATE TABLE users (id VARCHAR(255), login VARCHAR(255), password VARCHAR(255), email VARCHAR(255))";
        con.query(sqlUsers, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
        con.end();
    };

    this.insertUsers = function (login, password, email) {
        var id = guid.create();
        console.log(id.toString());
        var query = `INSERT INTO users (id, login, password, email) VALUES ('${id}','${login}','${password}','${email}')`;
        var con = this.getConnection('market');
        con.query(query, function (err, result) {
            if (err) {
                throw err;
            } else {
                console.log('query is ok');
            }
        });
        con.end();
    };
};
