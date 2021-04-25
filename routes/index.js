const { Console } = require('console');
const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const app = express();
var path = require('path');

app.use(express.static('public'))

app.get('/', function(req, res) {
    console.log(path);
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/calculator', function(req, res) {
    console.log(path);
    res.sendFile(path.join(__dirname + '/calculator.html'));
});

app.listen(8000);

module.exports = router;