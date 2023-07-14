import { Router } from "express"
import productsRouter from "./products.routes.js"

const router = Router();

router.use(productsRouter);

export default router;