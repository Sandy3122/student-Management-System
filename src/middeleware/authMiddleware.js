const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

const verifyAdminToken = (req, res, next) => {
    // Get token from header
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDQwMDQ0MDcsImV4cCI6MTcwNDAwODAwN30.aEvWgpqFLLg1tb20o2f1SzEdZ_gqbgLrBXC4dK3m228';

    // if(!token){
    //     return res.status(401).json({ message: 'Unauthorized'});
    // }
    
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