import { Router } from "express";
import { followUser, unfollowUser } from "../controllers/follows.controllers.js";

const followsRouter = Router();
followsRouter.post("/users/:userId/follow", followUser);
followsRouter.delete("/users/:userId/unfollow", unfollowUser);

export default followsRouter;