// esse arquivo serve pra chamar dentro da pasta controllers o que eu quero
// lebrando que essa pasta vai ser enviada para a pasta indexRotas

import { Router } from "express";
import { login } from "../controllers/controlLogin.js";
import { validateJoiGorAll } from "../middlewares/validateJoi.js";
import { signInSchema } from "../schemas/auth.schema.js";


const loginRouter = Router();

// rota para fazer o login
loginRouter.post("/", validateJoiGorAll(signInSchema), login);

export default loginRouter