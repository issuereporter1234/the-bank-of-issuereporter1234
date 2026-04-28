const id = window.location.pathname.split('/')[2];
let account
fetch(`/accounts/${id}`)
.then(res => res.json())
.then(data =>  account = structuredClone(data.account))
.then(() => displayData());

function displayData(){
    
    const nameEl = document.getElementById('name');
    nameEl.innerText = account.name
    const balanceEl = document.getElementById('balance')
    balanceEl.innerText = account.balance
    const userId = document.getElementById('id')
    userId.innerText = account.id
};


let depositAmount = document.getElementById('deposit-amount').value

function deposit(){
    depositAmount = document.getElementById('deposit-amount').value
    fetch(`/deposit/${id}`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: depositAmount
        })
    })
}

function wirthdraw(){
    wirthdrawAmount = document.getElementById('wirthdraw-amount').value;
    recipient = document.getElementById('recipient').value
    fetch(`/wirthdraw/${id}`, {
        
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            recipient: recipient,
            amount: wirthdrawAmount
        })
    })
    
}

function deleteAccount(){
    if (confirm('Do you want to delete your account?')){
    fetch(`/dashboard/${id}`, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'aplication/json'
        },
        body: null
    })
    .then(() => window.location.href  = '/')
}

};

function displayLog(data){
    
    const logEl = document.getElementById('transaction-log')
    if(data){

        
    for (i = data.length -1; i >= 0; i--){
        const logChild = document.createElement('div')
        logChild.className = 'info-container'
        const logChild2 = document.createElement('div')
        logChild2.className = 'info-container'


        let name = document.createElement('div')
        name.id = 'name-of-user'
        name.innerText = `Name: ${data[i].name}`
        logChild2.append(name)

        let dateAndTime = document.createElement('div')
        dateAndTime.id = 'date-and-time'
        dateAndTime.innerText = data[i].dateAndTime
        logChild2.append(dateAndTime);
        logChild.append(logChild2)
        let amount = document.createElement('div')
        amount.id = 'amount'
        amount.innerText = data[i].amount
        logChild.append(amount)

        logEl.append(logChild);
    }}
    else{
        const logChild = document.createElement('div')
        logChild.innerText = 'The log is empty.';
        logEl.append(logChild);
    }}

(function () {
    
    fetch(`/transaction-log/${id}`)
    .then(res => {
        if (res)res.json()
        else displayLog(data)
    })
    .then(data =>  displayLog(data))
    .catch(err => console.log(err))

    
    
})()
