const accountsEl = document.getElementById('accounts')

function redirect(id){
    if(id === 'new-account') window.location.href = `/${id}`
    else window.location.href = `/dashboard/${id}`
}

function renderAccounts(array){
        for(i = 0; accountsApi[i]; i++){
        const accountToAdd = document.createElement('button')
        accountToAdd.classList.add('options')
        accountToAdd.innerText = array[i].name
        accountToAdd.id = array[i].id
        accountsEl.append(accountToAdd)
        
    }
}

function select() {accountBtns = document.querySelectorAll('.options');

accountBtns.forEach(function(btn){
    btn.addEventListener('click', () => {
    id = btn.getAttribute('id');
   redirect(id)
})})
}

let accountsApi
fetch('/accounts')
.then(res => res.json()).
then(data => {
    accountsApi = structuredClone(data.accounts)
    renderAccounts(accountsApi)
})
.then(() => select())