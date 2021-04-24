const { Console } = require('console');
const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const app = express();
var path = require('path');

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
    let sql = 'CREATE TABLE accounts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
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

//Sends html file to user
router.get('/', function(req, res) {
    console.log(path);
    res.sendFile(__dirname + '/index.html'); 
});

module.exports = router;