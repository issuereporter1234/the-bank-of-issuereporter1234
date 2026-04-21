const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
let accounts = JSON.parse(fs.readFileSync('./data/accounts.json'));

function updateObjects(){
    fs.writeFile('./data/accounts.json', JSON.stringify(accounts), (err) =>{
        if(err) console.log(err)
    })
}



app.use(express.static(path.join(__dirname, 'public')));

app.get('/accounts', (req, res) => {
    res.status(200).json({ accounts });
});

app.get('/dashboard/:id', (req, res) => {
    const id = Number(req.params.id)

    let account = accounts.find(el => el.id === id)
    res.status(200).sendFile(path.join(__dirname, 'public', 'dashboard', 'index.html'))
})

app.use('/dashboard/', express.static(path.join(__dirname, 'public', 'dashboard')));
     
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

app.listen(8000, '0.0.0.0', () => {
    console.log('Server listening on port 8000');
});