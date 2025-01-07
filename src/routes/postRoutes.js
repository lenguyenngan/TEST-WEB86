import { Router } from "express";
import Posts from "../models/post.js";
import userMiddleware from "../middleware/checklogin.js";
import { getUserByToken } from "../Service/user.js";
const router = Router();

// Tạo bài post
router.post(
  "/",
  userMiddleware.checkLogin,
  userMiddleware.authorUser,
  async (req, res) => {
    const token = req.headers.authorization?.split("Bearer ")[1];
    const user = await getUserByToken(token);
    console.log(">>>>>", user);
    console.log(">>>>>>>>>>>>>>>>>", req.body);
    const dataPost = await Posts.create({
      userId: user.Id,
      content: req.body.content,
    });
    console.log(dataPost);
    res.status(200).json({
      message: "Create post sucess",
      data: dataPost,
    });
  }
);

// Cập nhật bài post
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const today = new Date();

    const updatedPost = await Posts.findByIdAndUpdate(
      id,
      { content: content, updatedAt: today },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
