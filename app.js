"use strict"
 const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const controllers = require(path.join(__dirname, 'controllers.js'))
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 







app.use(express.static(path.join(__dirname, 'public')));
app.use('/dashboard/', express.static(path.join(__dirname, 'public', 'dashboard')));
app.use('/new-account', express.static(path.join(__dirname, 'public', 'new-account')))

app.get('/accounts/:id', controllers.accountInfo);
app.get('/accounts',  controllers.sendAllAccounts)
app.get('/dashboard/:id', controllers.sendOneAccount) 
app.post('/deposit/:id', controllers.deposit)
app.post('/withdraw/:id', controllers.withdraw)
app.post('/new-account', controllers.newAccount)
app.delete('/dashboard/:id', controllers.deleteAccount)
app.get('/transaction-log/:id', controllers.logTransaction)
module.exports = app

