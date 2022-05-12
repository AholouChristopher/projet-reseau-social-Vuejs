// verifie le token renvoyer par l'appli F-End
const jwt = require('jsonwebtoken');

let codeToken = "RANDOM_TOKEN_SECRET";

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, codeToken);
        const userId = decodedToken.userId;
        reqId = JSON.parse(req.query.id);// reçoit l'id a traver l'url
 
        if (reqId && reqId != userId) {
            throw 'Invalid user ID';
        } else {
                next();
            }
    } catch {
            res.status(401).json({
                error: new Error('Invalid request!')
            });
        }
};
