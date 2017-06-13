'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('./config/express');

_express.app.listen(3000, function () {
    console.log('API Server started and listening on port 3000');
});

// Http Method: GET
// URI        : /BANKRUPTCY
// Read all the BANKRUPTCY records
_express.app.get('/BANKRUPTCY', function (req, res) {
    "use strict";

    _express.oracledb.getConnection(_express.connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }

        connection.execute("SELECT * FROM BANKRUPTCY", {}, {
            outFormat: _express.oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the user profile",
                    detailed_message: err.message
                }));
            } else {
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
            }
            // Release the connection
            connection.release(function (err) {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log("GET /BANKRUPTCY : Connection released");
                }
            });
        });
    });
});

exports.default = _express.app;
module.exports = exports['default'];