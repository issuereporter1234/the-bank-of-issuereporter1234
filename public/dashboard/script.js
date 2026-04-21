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