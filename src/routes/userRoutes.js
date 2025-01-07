import { Router } from "express";
import pkg from "bcryptjs";
const { hash, compare } = pkg;
import User from "../models/user.js";
import generateApiKey from "../utils/generateApiKey.js";

const router = Router();

// Đăng ký người dùng
router.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Kiểm tra tất cả các trường dữ liệu có được cung cấp không
    if (!userName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashedPassword = await hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, userName, email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Đăng nhập người dùng
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const apiKey = generateApiKey(user._id, user.email);
    user.apiKey = apiKey;
    await user.save();

    res.json({
      message: "Login successfully",
      apiKey,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
