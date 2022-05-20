const mysql= require("mysql");
const fs = require('fs');

const jwt = require('jsonwebtoken');
const codeToken = "RANDOM_TOKEN_SECRET";


exports.getAllMessage = (req, res, next ) =>{
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
            console.log("Connexion à Mysql reussi !");
        }
    })  

    db.query('SELECT * FROM message ORDER BY userid  ', function(err, responseDdd, fields){
            if(!err){
                 res.send(responseDdd).status(200);
            }else{console.log(err);}
     })

    db.end();
};

exports.createMessage = (req, res, next ) =>{
    var  post   = { description : req.body.newMessage ,  name : req.body.name, imageUrl:req.file } ;  
     
    if (req.file) {
        post.imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
      } 

    console.log(post)


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
            console.log("Connexion à Mysql reussi !");
        }
    })  

    db.query('INSERT INTO message (`description`, `name`, `imageUrl`, `like`, `usersLiked`, `usersDisliked`) VALUES (?)',
    [[
        post.description,
        post.name,
        post.imageUrl,
        post.like,
        post.usersLiked,
        post.usersDisliked,        
    ]], function(err, responseDdd, fields){
    
        if(err){throw err;}else{ console.log("envoyé a la bbd")}
     })

    db.end();
 };

 exports.deleteMessage =  (req, res, next ) => {
     //recup Id user
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, codeToken);
    const decodedID = decodedToken.userId;

    const db = mysql.createConnection({
        host : '127.0.0.1', //localhost
        user : 'root', //nom_utilisateur
        password : 'loulou', //mot_de_passe_utilisateur
        database : "groupomania" // nom_BDD
    })

    db.connect(function(err){
        if(err){
            console.log("Connexion à Mysql échoué !")
            throw err;
        }else{
            console.log("Connexion à Mysql reussi !");
        }
    })


    // recherche du name de l'idDuMesssage 
    db.query(`SELECT * FROM message WHERE userid = ${req.query.idMessage}`, function(err, responseDdd, fields){
        if(!err){
           let message = responseDdd[0];
            //recherche du name de l'user
            db.query(`SELECT * FROM user WHERE id = ${decodedID}`, function(err, responseDdd2, fields){
                if(!err){
                    let user = responseDdd2[0]
                    //comparaison pour supression
                     if( user.username == message.name ){
                        db.query(`DELETE FROM message WHERE userid = ${req.query.idMessage}`,
                            function(err, responseDdd3, fields){
                                if(!err){
                                    try{
                                        const filename = message.imageUrl.split('/images')[1] 
                                        fs.unlink(`./images/${filename}`, () => { 
                                            res.status(200).json({ message:'supression du message'});
                                        })
                                    }catch{ res.status(200).json({ message:'supression du message'});}
                                }else{
                                    console.log(err);
                                }
                             }) 
                    }else{ res.status(401).json({ message: 'vous ne pouvez pas supprimer ce message'}); }

                }else{
                    console.log(err);
                }
            })
        }else{
            console.log(err);
        }
    })
 };


 exports.getAllMessageName = (req, res, next) =>{

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
            console.log("Connexion à Mysql reussi !");
        }
    })  

    db.query(`SELECT * FROM message WHERE name = '${req.params.name}'`, function(err, responseDdd, fields){
            if(!err){
                 res.send(responseDdd).status(200);
            }else{console.log(err);}
     })

    db.end();
 }