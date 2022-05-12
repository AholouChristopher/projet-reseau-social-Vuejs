const mysql= require("mysql")


exports.getAllMessage = (req, res, next )=>{
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
