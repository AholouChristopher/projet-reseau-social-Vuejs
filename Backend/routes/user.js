const auth = require ('../middleware/auth');
const express =  require('express');
const router = express.Router();

const userCtrl = require('../controleurs/user')


// route pour les users
router.post("/signin", userCtrl.signin);

// route pour ecrire un users
router.post("/signup", userCtrl.signup)

router.get("/", auth, userCtrl.getOneUser)

router.delete("/", auth, userCtrl.deleteCompteUser);


module.exports =  router;