import useRouter from "express";
import { addProduct } from "../controllers/shoppingCart.controller.js";

import { validateToken } from "../middlewares/validateToken.js";

const shoppingCartRouter = useRouter();
shoppingCartRouter.use(validateToken);

shoppingCartRouter.post("/home/:id/buy", addProduct);

export default shoppingCartRouter;