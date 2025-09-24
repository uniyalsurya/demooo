module.exports = function (roles = ["admin"]) {
  if (typeof roles === "string") {
    roles = [roles];
  }
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }
    next();
  };
};