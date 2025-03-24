import jwt from "jsonwebtoken";

const authenticateJWT = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Akses ditolak" });
  
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = verified;
      next();
    } catch (err) {
      res.status(403).json({ message: "Token tidak valid" });
    }
  };

  export default authenticateJWT