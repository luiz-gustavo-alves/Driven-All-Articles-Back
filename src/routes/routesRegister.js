// esse arquivo serve pra chamar dentro da pasta controllers o que eu quero
// lebrando que essa pasta vai ser enviada para a pasta indexRotas

import { Router } from "express";
import { register } from "../controllers/controlRegister.js";
import { validateJoiGorAll } from "../middlewares/validateJoi.js";
import { signUpSchema } from "../schemas/auth.schema.js";


const registerRouter = Router();

// fazer o cadastro
registerRouter.post("/cadastro", validateJoiGorAll(signUpSchema), register);

export default registerRouter;