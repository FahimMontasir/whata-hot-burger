const manager = (req, res, next) => {
  const type = req.user.type;

  if (type !== "manager" && type !== "admin")
    return res
      .status(403)
      .json({ errorMessage: "access denied -manager", data: null });

  next();
};
module.exports = manager;
