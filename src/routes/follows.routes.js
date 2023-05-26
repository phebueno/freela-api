import { Router } from "express";
import { followUser, getFollowers, getFollows, unfollowUser } from "../controllers/follows.controllers.js";
import { validateAuth } from "../middlewares/validateAuth.middleware.js";

const followsRouter = Router();

followsRouter.get("/users/:userId/followers", getFollowers);
followsRouter.get("/users/:userId/follows", getFollows);
followsRouter.post("/users/:userId/follow", validateAuth, followUser);
followsRouter.delete("/users/:userId/unfollow", validateAuth, unfollowUser);

export default followsRouter;