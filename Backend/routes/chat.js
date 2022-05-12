const express =  require('express');
const router = express.Router();


const chatCtrl = require('../controleurs/chat');
const auth = require ('../middleware/auth');
const multer = require ('../middleware/multer-config');


// route pour avoir les messages
router.get("/", auth, chatCtrl.getAllMessage);

// route pour ecrire un message 
router.post("/", auth, multer, chatCtrl.createMessage );

module.exports =  router;