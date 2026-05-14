"use-strict"
const fs = require('fs')
const path = require('path')
const actions = require(path.join(__dirname, 'actions.js'))
const store = require(path.join(__dirname, 'store.js'))


exports.accountInfo = (req, res) => {
    let id = Number(req.params.id)
    let account = store.accounts.find((el) => el.id === id) 
    res.status(200).json({ account });
};




exports.sendAllAccounts = (req, res) =>{
    res.status(200).json({accounts: store.accounts})
}

exports.sendOneAccount = (req, res) => {
    const id = Number(req.params.id)

    let account = store.accounts.find(el => el.id === id)
    if (account){
    res.status(200).sendFile(path.join(__dirname, 'public', 'dashboard', 'index.html'))
    }
    else res.status(404).send('The account does not exist.')
}

exports.deposit = (req, res) => {
    let id = Number(req.params.id)
    let amount = Number(req.body.amount)
    actions.deposit(amount, id);
    res.status(200)
 }

 

exports.withdraw = (req, res) => {
    let sendId = Number(req.params.id);
    let reciId = req.body.recipient;
    let amount = Number(req.body.amount);
    
    if(reciId === 'ATM'){
        actions.withdrawToATM(amount, sendId)
        store.updateObjects();
    }else{
        reciId = Number(reciId)
    actions.withdrawToUser(sendId, reciId, amount)
    }
    res.status(200)

}

exports.newAccount =  (req, res) =>{
    let newId = store.accounts[store.accounts.length -1].id + 1;
    req.body.balance = Number(req.body.balance)
    let newAccount = Object.assign({id: newId}, req.body)

    store.accounts.push(newAccount)
  
    store.updateObjects()
    
    res.redirect('/')
}

exports.deleteAccount = (req, res) => {
    
    
    let id = Number(req.params.id)
    let accountToDelete = store.accounts.find((el) => el.id === id)
    if(accountToDelete){

    let index = store.accounts.indexOf(accountToDelete)
    store.accounts.splice(index, 1)
    if(fs.existsSync(path.join('data', 'logs', id.toString()))) fs.unlinkSync(path.join('data', 'logs', id.toString()))
    res.status(204).send(null)
    }
    else res.status(404).send('not-found')
    console.log(store.accounts);
    
    store.updateObjects()
}

exports.logTransaction = (req, res) => {
    let id = req.params.id
    let log
    let pathReq = path.join(__dirname, 'data', 'logs', id)
    if (fs.existsSync(pathReq)){
        log = JSON.parse(fs.readFileSync(pathReq, 'UTF-8'))
        
        
        res.status(200).json({log})
    }
    else {
        res.json(null)
    }
}

// make and include modules with nesesarry functions

