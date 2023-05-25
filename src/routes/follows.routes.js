import { Router } from "express";
import { followUser, getFollowers, getFollows, unfollowUser } from "../controllers/follows.controllers.js";

const followsRouter = Router();

followsRouter.get("/users/:userId/followers", getFollowers);
followsRouter.get("/users/:userId/follows", getFollows);
followsRouter.post("/users/:userId/follow", followUser);
followsRouter.delete("/users/:userId/unfollow", unfollowUser);

export default followsRouter;