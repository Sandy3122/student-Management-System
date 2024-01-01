const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

// Verifying Admin Token
const verifyAdminToken = (req, res, next) => {
    // console.log('Full Request:', req.headers);
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Extracting token without the "Bearer " prefix
    const token = authHeader.split(' ')[1];
    console.log('Received token:', token);

    try {
        const decoded = jwt.verify(token, secretKey);
        console.log("Decoded Token:", decoded);
        if(decoded.role !== 'admin'){
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = decoded;
        next();

    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Unauthorized: Token Expired' });
      } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Unauthorized: Invalid Token' });
      } else {
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized' });
      }
    }
}


// Verifying Student Token
const verifyStudentToken = (req, res, next) => {
  // console.log('Full Request:', req.headers);
  const authHeader = req.headers.authorization;

  if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
  }

  // Extracting token without the "Bearer " prefix
  const token = authHeader.split(' ')[1];
  console.log('Received token:', token);

  try {
      const decoded = jwt.verify(token, secretKey);
      console.log("Decoded Token:", decoded);
      if(decoded.role !== 'student'){
          return res.status(403).json({ message: 'Forbidden' });
      }

      req.user = decoded;
      next();

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Unauthorized: Token Expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Unauthorized: Invalid Token' });
    } else {
      console.error(error);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}

module.exports = {
    verifyAdminToken,
    verifyStudentToken
}