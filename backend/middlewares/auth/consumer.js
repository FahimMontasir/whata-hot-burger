const consumer = (req, res, next) => {
  const type = req.user.type;

  if (type !== "consumer" && type !== "admin")
    return res.status(403).json({ message: "access denied -consumer" });

  next();
};
module.exports = consumer;
