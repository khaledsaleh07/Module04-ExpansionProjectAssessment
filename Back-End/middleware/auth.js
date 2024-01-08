import jwt from "jsonwebtoken";

export const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("request by:", req.user);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }

  next();
};