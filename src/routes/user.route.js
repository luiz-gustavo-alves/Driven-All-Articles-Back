import { Router } from "express";
import { getUserById } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/user-info/:id", getUserById);

export default userRouter;