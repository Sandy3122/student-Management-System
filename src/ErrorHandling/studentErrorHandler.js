// studentErrorHandlings
const studentErrorHandler = (error, req, res, next) => {
    console.error(error);
  
    if (error.code === 11000 && error.keyPattern.email === 1) {
      return res.status(400).json({ message: "Email already exists" });
    } else if (error.name === 'ValidationError') {
      return res.status(422).json({ message: 'Validation error' });
    } else {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  module.exports = studentErrorHandler;
  