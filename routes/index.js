const express = require('express');
const router = express.Router();
var path = require('path');

router.get('/calculator', function(req, res) {
    console.log(path);
    res.sendFile(path.join(__dirname + '/calculator.html'));
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Student Web App'
  });
});

module.exports = router;