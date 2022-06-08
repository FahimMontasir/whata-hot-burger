const admin = (req, res, next) => {
  const type = req.user.type;
  if (type !== "admin")
    return res.status(403).json({ message: "access denied -admin" });

  next();
};
module.exports = admin;
