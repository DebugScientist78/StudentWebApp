const { Console } = require('console');
const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const app = express();
var path = require('path');

app.get('/calculator', function(req, res) {
    console.log(path);
    res.sendFile(path.join(__dirname + '/calculator.html'));
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Student Web App'
  });
});

app.listen(8000);

module.exports = router;