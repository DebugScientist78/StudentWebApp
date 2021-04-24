const { Console } = require('console');
const express = require('express');
const router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
    console.log(path);
    res.sendFile(__dirname + '/index.html'); 
});

module.exports = router;