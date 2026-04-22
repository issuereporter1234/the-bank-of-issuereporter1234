const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
let accounts = JSON.parse(fs.readFileSync('./data/accounts.json'));
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

app.get('/accounts', (req, res) => {
    res.status(200).json({ accounts });
});

app.get('/dashboard/:id', (req, res) => {
    const id = Number(req.params.id)

    let account = accounts.find(el => el.id === id)
    if (account){
    res.status(200).sendFile(path.join(__dirname, 'public', 'dashboard', 'index.html'))
    }
    else res.status(404).send('404')
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

function wirthdrawToATM(amount, id){
    accountToWirthdraw = accounts.find((el) => el.id === id)
    accountToWirthdraw.balance -= amount;
}

function wirthdrawToUser(sendId, reciId, amount){
    let sender = accounts.find((el) => el.id === sendId);
    let recipient = accounts.find((el) => el.id === reciId);
    sender.balance -= amount;
    recipient.balance += amount
    updateObjects()

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
    
    console.log(req.params.id);
    
    let id = Number(req.params.id)
    let accountToDelete = accounts.find((el) => el.id === id)
    if(accountToDelete){
    let index = accounts.indexOf(accountToDelete)
    accounts.splice(index, 1)
    res.status(204).send(null)
    }
    else res.status(404).send('not-found')
    console.log(accounts);
    
    updateObjects()
})

app.listen(8000, '0.0.0.0', () => {
    console.log('Server listening on port 8000');
});//add transaction logs
//add 404 for nonexisting accounts