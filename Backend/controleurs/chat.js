const mysql= require("mysql");
const fs = require('fs');
require('dotenv').config();


const jwt = require('jsonwebtoken');
const codeToken = "RANDOM_TOKEN_SECRET";

//process.env
let password = process.env.S3_PASSWORD_LOGIN_SQL;
let login = process.env.S3_USER_LOGIN_SQL;
let iphost = process.env.S3_HOST;


exports.getAllMessage = (req, res, next ) =>{
    const db = mysql.createConnection({
        host : iphost, // S3_HOST localhost
        user : login, // S3_USER_LOGIN_SQL nom_utilisateur
        password : password, // S3_PASSWORD_LOGIN_SQL mot_de_passe_utilisateur
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

    db.query('SELECT * FROM message ORDER BY idMessage  ', function(err, responseDdd, fields){
            if(!err){
                 res.send(responseDdd).status(200);
            }else{console.log(err);}
     })

    db.end();
};

exports.createMessage = (req, res, next ) => {
    var  post   = { description : req.body.newMessage ,  name : req.body.name, imageUrl:req.file } ;  
     
    if (req.file) {
        post.imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
      } 

    console.log(post)


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
            console.log("Connexion à Mysql reussi !");
        }
    })  

    db.query('INSERT INTO message (`description`, `name`, `imageUrl`, `liked`, `usersLiked`, `idUser`) VALUES (?)',
    [[
        post.description,
        post.name,
        post.imageUrl,
        0,
        '[]',// Car Mysql bug avec le JSON a null
        req.query.id        
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
        host : iphost, //localhost
        user : login, //nom_utilisateur
        password : password, //mot_de_passe_utilisateur
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

    db.query(`SELECT * FROM user  WHERE id='${req.query.id}'`,                            
    function(err, rows, fields){
        if(err){
            console.log(err);
        }
        if( req.query.UserIdMessage == req.query.id || rows[0].admin == '1' ){
            db.query(`SELECT * FROM message WHERE idMessage = ${req.query.idMessage}`, function(err, responseDdd2, fields){
                db.query(`DELETE FROM message WHERE idMessage = ${req.query.idMessage}`,
                    function(err, responseDdd3, fields){
                        if(!err){
                            try{
                                const filename = responseDdd2[0].imageUrl.split('/images')[1] 
                                fs.unlink(`./images/${filename}`, () => { 
                                    res.status(200).json({ message:'supression du message'});
                                })
                            }catch{ res.status(200).json({ message:'supression du message'});}
                        }else{
                            console.log(err);
                        }
                    }
                )
            }) 
        }else{ res.status(401).json({ message: 'vous ne pouvez pas supprimer ce message'}); }
    })

};

 exports.getAllMessageName = (req, res, next) => {

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

 exports.UpdtateLike = (req, res, next) => {
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
            console.log("Connexion à Mysql reussi !");
        }
    })
    console.log(req.body.aime)
    if(req.body.aime == 1){
        db.query(`UPDATE message SET usersLiked = JSON_ARRAY_APPEND( usersLiked ,'$' ,${req.query.id}), liked = liked +1 WHERE idMessage = ${req.query.idMessage}`,
        function(err, responseDdd3, fields){
            if(!err){
                        res.status(200).json({ message:' tu as like '});
                    
            }else{
                console.log(err);}
            })
    }
    if(req.body.aime == 0){
        db.query(`SELECT * from message WHERE idMessage = ${req.query.idMessage} `,function(err, responseDdd3, fields){
            var TabElementUserLiked = JSON.parse(responseDdd3[0].usersLiked);
            
            const indexElementASupp = TabElementUserLiked.indexOf(parseInt(req.query.id))
            if (indexElementASupp != -1){
                TabElementUserLiked.splice(indexElementASupp,1);
            }
            var TabElementUserLikedJSON =  JSON.stringify(TabElementUserLiked)
            db.query(`UPDATE message SET usersLiked = '${TabElementUserLikedJSON}' , liked = liked -1 WHERE idMessage = ${req.query.idMessage}`,
                function(err, responseDdd4, fields){
                if(err){
                    console.log(err);
                }
            })      
            if(!err){
                res.status(200).json({ message:' tu as dislike '});
                    
            }else{
                console.log(err);}
        }) 
    }
   
 }
