var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('calender', {
    title: 'Schedular & Calender', navColor: '#00e6ac'});
});

module.exports = router;
