module.exports = async (req, res, next) => {
  const isAdmin = (req.user.role = "ADMIN");

  if (isAdmin) {
    return next();
  }

  return res
    .status(200)
    .json({ message: "Only admins access to this route !!" });
};
