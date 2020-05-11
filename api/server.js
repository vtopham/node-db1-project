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
            if (account.length > 0) {
                res.status(200).json({data: account})
            } else {
                res.status(404).json({message: "ID not found"})
            }
            
        }).catch(err => {
            res.status(500).json({message: "Error fetching account", error: err})
        })
})

//create a new account
server.post('/accounts', validateAccount, (req, res) =>{
    db('accounts')
        .insert(req.body, "id")
        .then(id => {
            res.status(201).json({message: `record ${id} successfully created`})
        })
        .catch(err => {
            res.status(500).json({message: 'Error creating account'})
        })
})

//update an existing account
//TODO: doesn't update things i didn't create :( )
server.put('/accounts/:id', validateAccount, (req, res) =>{
    db('accounts')
        .where({id: req.params.id})
        .update(req.body)
        .then(count => {
            res.status(200).json({message: `Number of accounts successfully updated: ${count} `})
        })
        .catch(err => {
            res.status(500).json({message: 'Error updating account', error: err})
        })
})

//delete an existing account
server.delete('/accounts/:id', (req, res) =>{
    db('accounts')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if (count > 0) {
                res.status(200).json( {message: `Number of accounts deleted: ${count}`})
            } else {
                res.status(404).json({message: "Account not found"})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'Error deleting account', error: err})
        })
})

//check to make sure the body of the request is valid
function validateAccount (req, res, next) {
    if (req.body.name && req.body.budget) {
        next();
    } else {
        res.status(400).json({message: "Please include a name and budget in the body of your request."})
    }
}




module.exports = server;
