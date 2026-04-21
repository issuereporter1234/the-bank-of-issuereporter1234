const id = window.location.pathname.split('/')[2];
let account
fetch('/accounts')
.then(res => res.json())
.then((data) =>  account = structuredClone(data.accounts[id - 1]))
.then(() => displayData())

function displayData(){
    const nameEl = document.getElementById('name');
    nameEl.innerText = account.name
    const balanceEl = document.getElementById('balance')
    balanceEl.innerText = account.balance
}


depositAmount = document.getElementById('deposit-amount').value

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

