'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var oracledb = require('oracledb');
var bodyParser = require('body-parser');

var connAttrs = {
    "user": "",
    "password": "",
    "connectString": ""
};

var app = (0, _express2.default)();
// Use body parser to parse JSON body
app.use(bodyParser.json());
app.get('/', function (req, res) {
    return res.send('Hello, this is API and I\'m ok!');
});

exports.default = { app: app, oracledb: oracledb, connAttrs: connAttrs };
module.exports = exports['default'];