import { Router } from "express";
import { getAllUsers, getUserProfile } from "../controllers/users.controllers.js";

const usersRouter = Router();
usersRouter.get("/users/:id", getUserProfile);
usersRouter.get("/users", getAllUsers);

export default usersRouter;