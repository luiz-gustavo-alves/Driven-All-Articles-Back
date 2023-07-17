import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";

import { validateToken } from "../middlewares/validateToken.js"
import { validateSchema } from "../middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";

const authRouter = Router();

authRouter.post("/", validateSchema(signInSchema), login);
authRouter.post("/cadastro", validateSchema(signUpSchema), register);
authRouter.post("/logout", validateToken, logout);

export default authRouter;