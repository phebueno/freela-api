import { Router } from "express";
import authRouter from "./auth.routes.js";
import followsRouter from "./follows.routes.js";
import postsRouter from "./posts.routes.js";
import usersRouter from "./users.routes.js";

const router = Router();
router.use(authRouter);
router.use(usersRouter);
router.use(postsRouter);
router.use(followsRouter);

export default router;