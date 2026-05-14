"use strict"
const path = require('path')
const fs = require('fs')

let accounts = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'accounts.json')));

function updateObjects(){
    fs.writeFile(path.join(__dirname, 'data', 'accounts.json'), JSON.stringify(accounts), (err) =>{
        if(err) console.log(err)
    }) 
}

module.exports = { accounts, updateObjects }