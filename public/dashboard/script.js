const id = window.location.pathname.split('/')[2];
let account
fetch(`/accounts/${id}`)
.then(res => res.json())
.then(data =>  account = structuredClone(data.account))
.then(() => displayData());

function displayData(){
    console.log(account)
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

}
