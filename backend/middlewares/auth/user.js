const user = (req, res, next) => {
  const type = req.user.type;

  if (type !== "user" && type !== "admin")
    return res
      .status(403)
      .json({ errorMessage: "access denied -user", data: null });

  next();
};
module.exports = user;
