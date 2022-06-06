const express =  require('express');
const router = express.Router();


const chatCtrl = require('../controleurs/chat');
const auth = require ('../middleware/auth');
const multer = require ('../middleware/multer-config');


router.get("/", auth, chatCtrl.getAllMessage);
router.get("/:name", auth, chatCtrl.getAllMessageName);

router.post("/", auth, multer, chatCtrl.createMessage );
router.post("/like", auth, chatCtrl.UpdtateLike );

router.delete("/", auth, chatCtrl.deleteMessage);


module.exports =  router;