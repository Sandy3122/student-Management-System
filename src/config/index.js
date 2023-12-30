const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    mongoURI: process.env.MONGOURI || 'mongodb+srv://Sandeep1999:Sandeep3122@sandeep.nlcna.mongodb.net/studentManagementSystem?retryWrites=true&w=majority',
    secretKey: process.env.SECRET_KEY,
  };
