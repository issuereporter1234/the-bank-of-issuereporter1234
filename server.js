"use srticrt"
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
let accounts = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'accounts.json')));
console.log(accounts);

function updateObjects(){
    fs.writeFile('./data/accounts.json', JSON.stringify(accounts), (err) =>{
        if(err) console.log(err)
    })
console.log(accounts);
}



app.use(express.static(path.join(__dirname, 'public')));
app.use('/dashboard/', express.static(path.join(__dirname, 'public', 'dashboard')));
app.use('/new-account', express.static(path.join(__dirname, 'public', 'new-account')))

app.get('/accounts/:id', (req, res) => {
    let id = Number(req.params.id)
    let account = accounts.find((el) => el.id === id) 
    res.status(200).json({ account });
});

app.get('/accounts', (req, res) =>{
    res.status(200).json({accounts})
} )

app.get('/dashboard/:id', (req, res) => {
    const id = Number(req.params.id)

    let account = accounts.find(el => el.id === id)
    if (account){
    res.status(200).sendFile(path.join(__dirname, 'public', 'dashboard', 'index.html'))
    }
    else res.status(404).send('The account does not exist.')
})


     
 app.post('/deposit/:id', (req, res) => {
    let id = Number(req.params.id)
    amount = Number(req.body.amount)
    deposit(amount, id)
 })



function deposit(amount, id) {
    console.log(id);
    
    let accountToDeposit = accounts.find((el) => el.id === id);

    console.log(accountToDeposit)
    accountToDeposit.balance += amount
    updateObjects()
    logATM(accountToDeposit, true, amount)

}

app.post('/wirthdraw/:id', (req, res) => {
    let sendId = Number(req.params.id);
    let reciId = req.body.recipient;
    let amount = Number(req.body.amount);
    
    if(reciId === 'ATM'){
        wirthdrawToATM(amount, sendId)
        updateObjects();
    }else{
        reciId = Number(reciId)
    wirthdrawToUser(sendId, reciId, amount)
    }

})

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


function wirthdrawToATM(amount, id){
    accountToWirthdraw = accounts.find((el) => el.id === id)
    accountToWirthdraw.balance -= amount;
    logATM(accountToWirthdraw, false, amount)
}

function wirthdrawToUser(sendId, reciId, amount){
    let sender = accounts.find((el) => el.id === sendId);
    console.log(sender);
    
    let recipient = accounts.find((el) => el.id === reciId);
     console.log(recipient);

    sender.balance -= amount;
    recipient.balance += amount
    updateObjects()
    logUsers(sender, recipient, amount)

}

app.post('/new-account', (req, res) =>{
    newId = accounts[accounts.length -1].id + 1;
    req.body.balance = Number(req.body.balance)
    let newAccount = Object.assign({id: newId}, req.body)

    accounts.push(newAccount)
  
    updateObjects()
    
    res.redirect('/')
})
app.delete('/dashboard/:id', (req, res) => {
    
    
    let id = Number(req.params.id)
    let accountToDelete = accounts.find((el) => el.id === id)
    if(accountToDelete){
    let index = accounts.indexOf(accountToDelete)
    accounts.splice(index, 1)
    fs.unlinkSync(path.join('data', 'logs', id.toString()))
    res.status(204).send(null)
    }
    else res.status(404).send('not-found')
    console.log(accounts);
    
    updateObjects()
})

app.get('/transaction-log/:id', (req, res) => {
    let id = req.params.id
    let log
    let pathReq = path.join(__dirname, 'data', 'logs', id)
    if (fs.existsSync(pathReq)){
        log = JSON.parse(fs.readFileSync(pathReq, 'UTF-8'))
        console.log(log);
        
        res.status(200).json({log})
    }
    else {
        res.json(null)
    }
})

app.listen(8000, '0.0.0.0', () => {
    console.log('Server listening on port 8000');
});
app.use((req, res) => {
    res.status(404).send('The page you are looking for does not exist.')
})
//add transaction logs
