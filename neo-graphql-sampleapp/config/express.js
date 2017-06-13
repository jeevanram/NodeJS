import express from 'express';
var oracledb = require('oracledb'); 
var bodyParser = require('body-parser');

var connAttrs = {
    "user": "",
    "password": "",
    "connectString": ""
}

const app = express();
// Use body parser to parse JSON body
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello, this is API and I\'m ok!'));

export default {app,oracledb,connAttrs};