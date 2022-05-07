const mysql= require("mysql");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signin = (req, res, next ) => {
        post = { email:req.body.email, password: req.body.password}                            

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
                 }else{ console.log("Connexion à Mysql reussi !"); }
            })
            db.query(`SELECT * FROM user  WHERE email='${post.email}'`,                            
                function(err, rows, fields){
                    for (var i = 0; i < rows.length; i++) {
                        result = rows[i]
                    }
                    bcrypt.compare(req.body.password, result.password)
                    .then(valid => {
                            if (!valid) {
                                return res.status(401).json({ error: 'Mot de passe incorrect !' });
                            }
                            return res.status(200).json({
                                token: jwt.sign(
                                    {userId: result.id},
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn:'24h'}
                                )
                            });
                     }).catch(error => res.status(500).json({ error }));
                    
                     if(err){throw err}
                 }
            )
    


    
  //  db.query('SELECT * FROM message', function(err, responseDdd, fields){
            //console.log(responseDdd); 
            //if(!err){
            //     res.send(responseDdd).status(200);
           // }else{console.log(err);}
    // }) 

    db.end();
};

exports.signup =  (req, res, next ) =>  {
    console.log(" tu es renter dans la route sgnup! "); 
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            post = { paswword:hash, email:req.body.email, name:req.body.name};
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
                 }else{ console.log("Connexion à Mysql reussi !"); }
            })
            db.query('INSERT INTO user (`username`, `email`,`password`) VALUES (?)',
                [[
                    post.name,
                    post.email,
                    post.paswword,
                            
                ]], function(err, responseDdd, fields){
                    /* console.log(responseDdd); */
                        if(err){
                             throw err;
                        }else{
                            console.log(responseDdd)
                            db.end(); ;
                        }
            })
        })    
};