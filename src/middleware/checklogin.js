import jwt from "jsonwebtoken";
const userMiddleware = {
  checkLogin: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split("Bearer ")[1];
      if (!token) throw new Error("Login required");
      next();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  authorUser: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split("Bearer ")[1];
      const user = jwt.verify(token, "web86");
      if (!user) throw new Error("Unvalid User, please try again");
      return next();
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};
export default userMiddleware;
