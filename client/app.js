'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var express = _interopRequireWildcard(_express);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var app = express.default();

// Setup logger
app.use((0, _morgan2.default)(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// For ssl certificate
app.get('/.well-known/acme-challenge/:tokenValue', function (req, res) {
    (0, _fs.readFile)(path.resolve(__dirname, '..', 'build', '.well-known/acme-challenge/', req.params.tokenValue), 'ascii', function (err, data) {
        if (err) {
            return console.log(err);
        }
        res.send(data.trim());
    });
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

exports.default = app;