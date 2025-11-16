const { verifyToken } = require("@clerk/backend");

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
      // audience: "authenticated",  // only if configured
    });

    req.userId = decoded.sub;
    req.auth = decoded;
    next();

  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({
      message: "Invalid token",
      error: err.message
    });
  }
};

module.exports = { authenticateUser };
