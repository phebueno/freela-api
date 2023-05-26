import { Router } from "express";
import { likePost, newPost, unlikePost } from "../controllers/posts.controllers.js";
import { validateAuth } from "../middlewares/validateAuth.middleware.js";

const postsRouter = Router();
postsRouter.post("/posts/new", validateAuth, newPost);
postsRouter.post("/posts/:postId/like", validateAuth, likePost);
postsRouter.delete("/posts/:postId/unlike", validateAuth, unlikePost);

export default postsRouter;