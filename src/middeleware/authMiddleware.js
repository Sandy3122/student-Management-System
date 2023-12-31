const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

const verifyAdminToken = (req, res, next) => {
    // console.log('Full Request:', req.headers);
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Extract token without the "Bearer " prefix
    const token = authHeader.split(' ')[1];
    console.log('Received token:', token);
    
    if(!token){
        return res.status(401).json({ message: 'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        console.log("Decoded Token:", decoded);
        if(decoded.role !== 'admin'){
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = decoded;
        next();

    } catch (error) {
        console.log(error.message);
        res.status(401).json({ message: 'Unauthorized' });
    }
}


module.exports = {
    verifyAdminToken
}