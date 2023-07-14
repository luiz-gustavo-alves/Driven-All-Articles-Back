import { signIn, signUp } from "../controllers/auth.controller.js";
import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";

const authRouter = Router();

authRouter.post("/", validateSchema(signInSchema), signIn);
authRouter.post("/cadastro", validateSchema(signUpSchema), signUp);

export default authRouter;