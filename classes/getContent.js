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
            con.query("CREATE DATABASE `market` CHARACTER SET utf8 COLLATE utf8_general_ci", function (err, result) {
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
        var sqlGoods = "CREATE TABLE goods (id VARCHAR(255), name VARCHAR(255), price VARCHAR(255), goodData VARCHAR(255), photoPath VARCHAR(255))";
        return new Promise(function (resolve, reject) {
            con.query(sqlUsers, function (err, result) {
                if (err) reject(err);
                console.log("Table users created");
            });
            con.query(sqlGoods, function (err, result) {
                if (err) reject(err);
                console.log("Table goods created");
            });
            resolve();
            con.end();
        });
    };

    this.insertUsers = function (login, password, email) {
        var id = guid.create();
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

    this.checkUser = function (login, password) {
        var selected;
        var query = `SELECT * FROM users WHERE login='${login}' AND password='${password}'`;
        var con = this.getConnection('market');
        return new Promise(function (resolve, reject) {
            con.query(query, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                    con.end();
                }
            });
        });
    };

    this.addGood = function (reqObj) {
        var id = guid.create();
        var query = `INSERT INTO goods (id, name, price, goodData, photoPath) VALUES ('${id}','${reqObj.body.name}','${reqObj.body.price}','${reqObj.body.goodData}','${reqObj.files.photo.name}')`;
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

    this.selectGoods = function () {
        var query = `SELECT * FROM goods`;
        var con = this.getConnection('market');
        return new Promise(function (resolve, reject) {
            con.query(query, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                    con.end();
                }
            });
        });
    };

};
