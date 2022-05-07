const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
require('dotenv').config();

//declarations process connection a la base de donner
/* let host = process.env.HOST;
let userLogin = process.env.USER_LOGIN_SQL;
let password = process.env.PASSWORD_LOGIN_SQL; */

const db = mysql.createConnection({
    host : '127.0.0.1', //localhost
    user : 'root', //nom_utilisateur
    password : 'loulou', //mot_de_passe_utilisateur
    database : "groupomania" // nom_BDD
});



db.connect(function(err){
    if(err){
        console.log("Connexion à Mysql échoué !")
        throw err;
    }else{
    console.log("Connexion à Mysql réussie !")}
})

const chatRoutes = require('./routes/chat');
const userRoutes = require('./routes/user');



const app =  express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

 
app.use(bodyParser.json());

app.use('/api/chat', chatRoutes);
app.use('/api/user', userRoutes);


module.exports = app;