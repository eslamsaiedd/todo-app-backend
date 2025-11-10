const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']

    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    const token = authHeader.split(' ')[1]

  try {
    const currentUser = jwt.verify(token, process.env.jwt_secret_key);
    req.user = currentUser; 
    console.log("currentUser",currentUser);
    
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
module.exports = verifyToken;
