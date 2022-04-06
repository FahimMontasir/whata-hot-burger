const manager = (req, res, next) => {
  const type = req.user.type;

  if (type !== "manager" && type !== "admin")
    return res.status(403).send("access denied -manager");

  next();
};
module.exports = manager;
