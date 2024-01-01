// adminErrorHandlings
const adminErrorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.code === 11000 && error.keyPattern.email === 1) {
    return res.status(400).json({ message: "Email already exists" });
  } else if (error.name === "ValidationError") {
    return res.status(422).json({ message: "Validation error" });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token has expired" });
  } else {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Exporting modules
module.exports = adminErrorHandler;
