const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require("path");
require('dotenv').config();

let password = process.env.S3_PASSWORD_LOGIN_SQL;
let login = process.env.S3_USER_LOGIN_SQL;
let iphost = process.env.S3_HOST;

const db = mysql.createConnection({
    host : iphost, //localhost
    user : login, //nom_utilisateur
    password : password, //mot_de_passe_utilisateur
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
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/chat', chatRoutes);
app.use('/api/user', userRoutes);

module.exports = app;