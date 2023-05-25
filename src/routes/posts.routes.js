import { Router } from "express";
import { likePost, newPost, unlikePost } from "../controllers/posts.controllers.js";

const postsRouter = Router();
postsRouter.post("/posts/new", newPost);
postsRouter.post("/posts/:postId/like", likePost);
postsRouter.delete("/posts/:postId/unlike", unlikePost);

export default postsRouter;