const authorizeRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Akses ditolak, tidak memiliki izin" });
    }
    next();
};

export default authorizeRole;