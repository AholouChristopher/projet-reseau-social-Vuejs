const mysql= require("mysql")


exports.getAllMessage = (req, res, next )=>{
    /* console.log("requete pour avoir les message reçu") */
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

    db.query('SELECT * FROM message', function(err, responseDdd, fields){
            /* console.log(responseDdd); */
            if(!err){
                 res.send(responseDdd).status(200);
            }else{console.log(err);}
     })

    db.end();
};

exports.createMessage = (req, res, next ) =>{
    var  post   = { description : req.body.newMessage ,  name : req.body.name, imageUrl:null, like:0, usersLiked:null,usersDisliked:null} ;  
    console.log(post);

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
            /* console.log(responseDdd); */
        if(err){throw err;}else{console.log(responseDdd);}
     })

    db.end();
 };
