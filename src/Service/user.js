import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const getUserByToken = async (token) => {
  const user = jwt.verify(token, SECRET_KEY);
  return user;
};
export { getUserByToken };
