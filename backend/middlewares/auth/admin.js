const admin = (req, res, next) => {
  const type = req.user.type;
  if (type !== "admin")
    return res
      .status(403)
      .json({ errorMessage: "access denied -admin", data: null });

  next();
};
module.exports = admin;
