const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    mongoURI: process.env.MONGOURI || 'mongodb+srv://Sandeep1999:Sandeep3122@sandeep.nlcna.mongodb.net/studentManagementSystem?retryWrites=true&w=majority',
    secretKey: process.env.SECRETKEY || '211c1b88471794c20998f2993ed3c17f',
  };
