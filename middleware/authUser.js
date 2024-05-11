const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Token not provided",
    });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.tableId = token_decode.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token expired",
      });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }
    // For other errors, log the error and return a generic error message
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  authMiddleware: authMiddleware,
};
