// esse arquivo serve pra unir todos que eu estou escrevendo Rotas que esta dentro de Routes
// lebrando que todas as Rotas aqui vai pro app

import { Router } from "express";
import loginRouter from "./routesLogin.js";
import registerRouter from "./routesRegister.js";



const router = Router()

router.use(registerRouter);
router.use(loginRouter);


export default router