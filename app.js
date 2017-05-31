var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
var registrUser = require('./routes/registr');
var routes = require('./routes/index');
var users = require('./routes/users');
var loginForm = require('./routes/loginForm');
var logIn = require('./routes/logIn');
var goods = require('./routes/goodsPage');
var admin = require('./routes/admin');
var goodLoad = require('./routes/addGood');
var test = require('./routes/test');
var redactionGoods = require('./routes/redactionGoods');
//end routes 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(__dirname + '/public'));
app.use('/test', test);
app.use('/', routes);
app.use('/users', users);
app.use('/getLoginForm', loginForm);
app.use('/registrationUser', registrUser);
app.use('/logIn', logIn);
app.use('/getGoods', goods);
app.use('/getAdmin', admin);
app.use('/goodLoad', goodLoad);
app.use('/redactGoods', redactionGoods);

// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });

    app.listen(3000, function () {
        console.log('Starting app on 3000');
    });

});


module.exports = app;
