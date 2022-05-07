const express =  require('express');
const router = express.Router();

const chatCtrl = require('../controleurs/chat')

// route pour avoir les messages
router.get("/", chatCtrl.getAllMessage);

// route pour ecrire un message 
router.post("/", chatCtrl.createMessage )

module.exports =  router;