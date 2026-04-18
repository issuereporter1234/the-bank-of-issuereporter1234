let accountsApi
fetch('/accounts')
.then(res => res.json()).
then(data => {
    accountsApi = structuredClone(data.accounts)
    renderAccounts(accountsApi)
})

const accountsEl = document.getElementById('accounts')


function renderAccounts(array){
        for(i = 0; accountsApi[i]; i++){
        const accountToAdd = document.createElement('button')
        accountToAdd.classList.add('options')
        accountToAdd.innerText = array[i].name
        accountToAdd.id = array[i].id

        accountsEl.append(accountToAdd)
    }
}