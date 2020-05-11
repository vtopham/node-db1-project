const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

//say hi
server.get('/',(req, res) => {
    res.status(200).json({message: "Hello there!"})
})

//get all accounts
server.get('/accounts', (req, res) =>{
    db.select('*')
        .from('accounts')
        .then(accounts => {
            res.status(200).json({data: accounts})
        }).catch(err => {
            res.status(500).json({message: "Error fetching accounts", error: err})
        })
})

//get a specific account
server.get('/accounts/:id', (req, res) =>{
    db.select(`*`)
        .from('accounts')
        .where({id: req.params.id})
        .then(account => {
            res.status(200).json({data: account})
        }).catch(err => {
            res.status(500).json({message: "Error fetching account", error: err})
        })
})

//create a new account
server.post('/accounts', (req, res) =>{

})

//update an existing account
server.put('/accounts/:id', (req, res) =>{

})

//delete an existing account
server.delete('/accounts/:id', (req, res) =>{

})
module.exports = server;
