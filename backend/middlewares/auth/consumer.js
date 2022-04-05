const consumer = (req, res, next) => {
  const type = req.user.type;

  if (type !== "consumer" && type !== "admin")
    return res
      .status(403)
      .json({ errorMessage: "access denied -consumer", data: null });

  next();
};
module.exports = consumer;
