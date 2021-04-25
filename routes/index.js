const { Console } = require('console');
const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const app = express();
var path = require('path');

app.use(express.static('public'))

//mysql user authentication
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'nodemysql'
});

//Connect to mysql
db.connect((err) => {
    if(err) {
        throw(err);
    }
    console.log("MySql connected");
});

//Creates database
router.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE  nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('database created...');
    })
});

//Creates account table
router.get('/createaccountstable', (req, res) => {
    let sql = 'CREATE TABLE accounts(userID int PRIMARY KEY, user VARCHAR(255), pass VARCHAR(255))';
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('Posts table created');
    })
})

//Creates account info table
router.get('/createaccountsinfotable', (req, res) => {
    let sql = 'CREATE TABLE accountsInfo(infoID int PRIMARY KEY, userID int, weightInfo MEDIUMTEXT, markInfo MEDIUMTEXT, FOREIGN KEY (userID) REFERENCES accounts(userID))';
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('Posts table created');
    })
})

//Adds an account
router.get('/addaccount', (req, res) => {
    let account = {title:'Username', body: 'Multiplixels'};
    let sql = 'INSERT INTO accounts SET ?';
    let query = db.query(sql, account, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Account added');
    });
})

//Selects all accounts
router.get('/getaccounts', (req, res) => {
    let sql = 'SELECT * FROM accounts';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Accounts fetched');
    });
})

//Selects single account
router.get('/getaccount/:id', (req, res) => {
    let sql = `SELECT * FROM accounts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Account fetched');
    });
})

//Update account username
router.get('/updateaccountusername/:id', (req, res) => {
    let newUsername = 'Multi'
    let sql = `UPDATE accounts SET title = '${newUsername}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Account username updated');
    });
})

//Delete account
router.get('/deleteaccount/:id', (req, res) => {
    let sql = `DELETE FROM accounts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Account deleted');
    });
})

app.get('/', function(req, res) {
    console.log(path);
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/calculator', function(req, res) {
    console.log(path);
    res.sendFile(path.join(__dirname + '/calculator.html'));
});

app.get('/register', function(req, res) {
    console.log(path);
    res.sendFile(path.join(__dirname + '/register.html'));
});

app.get('/login', function(req, res) {
    console.log(path);
    res.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/creatingAccount/:id2/:user2/:pass2', function(req, res) {
    console.log(path);

    var id = parseInt(req.params.id2);
    console.log(id);

    let account = {userID: id, user: req.params.user2, pass: req.params.pass2};
    let sql = `INSERT INTO accounts SET ?`;
    let query = db.query(sql, account, (err, result) => {
        if(err) throw err;
        console.log(result);
    });

    res.redirect('/');
});

app.listen(8000);

//Sends index html file to user
/*router.get('/', function(req, res) {
    console.log(path);
    res.sendFile(__dirname + '/index.html'); 
});

//Sends register html file to user
router.get('/register.html', function(req, res) {
    console.log(path);
    res.sendFile(__dirname + '/register.html'); 
});

//Sends login html file to user
router.get('/login.html', function(req, res) {
    console.log(path);
    res.sendFile(__dirname + '/login.html'); 
});

//Sends login html file to user
router.get('/calculator.html', function(req, res) {
    console.log(path);
    res.sendFile(__dirname + '/calculator.html'); 
});*/

//Attempts to register account 
router.get('/creatingAccount/', function(req, res) {
    console.log(path);
    res.sendFile(__dirname + '/index.html')
})

module.exports = router;