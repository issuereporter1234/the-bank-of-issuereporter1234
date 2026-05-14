"use strict"
const fs = require('fs')
const path = require('path')

const store = require('./store')


exports.deposit = function(amount, id) {
    console.log(id);
    
    let accountToDeposit = store.accounts.find((el) => el.id === id);

    console.log(accountToDeposit)
    accountToDeposit.balance += amount
    store.updateObjects()
    logATM(accountToDeposit, true, amount)

}

function getDate(){
    let now = new Date;
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let year = now.getFullYear();
    let month = now.getMonth();
    month++
    let date = now.getDate();
    
    let day = now.getDay();

    let hour = now.getHours()
    let minute = now.getMinutes()
    let second = now.getSeconds()

    return `Date: ${days[day]} ${date}. ${month} ${year} Time: ${hour}:${minute}:${second}`
}

 function logUsers(sender, recipient, amount){
    let logSend
    let logRec

    let dataSend = {
       id: recipient.id,
       name: recipient.name,
       dateAndTime:  getDate(),
       amount: -amount
    }

    let dataRec = {
        id: sender.id,
        name: sender.name,
        dateAndTime: getDate(),
        amount: amount
    }

    let pathSend = path.join(__dirname, 'data', 'logs', sender.id.toString())
    let pathRec = path.join(__dirname, 'data', 'logs', recipient.id.toString())
    if (fs.existsSync(pathSend)){
        logSend = JSON.parse(fs.readFileSync(pathSend))
       
        
    }
    else {
        logSend = []
    }
    logSend.push(dataSend)
    fs.writeFileSync(pathSend, JSON.stringify(logSend))

    if(fs.existsSync(pathRec)){
        logRec = JSON.parse(fs.readFileSync(pathRec))
         
    }
    else logRec = []

    logRec.push(dataRec)
    fs.writeFileSync(pathRec, JSON.stringify(logRec))

}

function logATM(user, isDeposit, amount){
    let logUser
    let pathUser = path.join(__dirname, 'data', 'logs', (user.id.toString()))
    let dataTr = {
       id: 'ATM',
       name: 'ATM',
       dateAndTime:  getDate(),
       amount: null
    }

    if(isDeposit) {
        dataTr.amount = amount
    }
    else dataTr.amount = -amount

    if(fs.existsSync(pathUser)){
        logUser = JSON.parse(fs.readFileSync(pathUser))
    }
    else{
        logUser = []
    }

    logUser.push(dataTr)
    fs.writeFileSync(pathUser, JSON.stringify(logUser))

}

exports.withdrawToATM = function(amount, id){
    let accountToWithdraw = store.accounts.find((el) => el.id === id)
    accountToWithdraw.balance -= amount;
    logATM(accountToWithdraw, false, amount)
}

exports.withdrawToUser = function(sendId, reciId, amount){
    let sender = store.accounts.find((el) => el.id === sendId);
    console.log(sender);
    
    let recipient = store.accounts.find((el) => el.id === reciId);
     console.log(recipient);

    sender.balance -= amount;
    recipient.balance += amount
    store.updateObjects()
    logUsers(sender, recipient, amount)

}
