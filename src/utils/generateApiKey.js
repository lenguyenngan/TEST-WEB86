import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const generateApiKey = (userId, email) => {
  const payload = {
    userId,
    email,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  return token;
};

export default generateApiKey;
