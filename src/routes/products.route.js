import useRouter from "express";
import { createProduct, getProducts } from "../controllers/products.controller.js";

import { validateToken } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { productSchema } from "../schemas/products.schema.js";

const productsRouter = useRouter();
productsRouter.use(validateToken);

productsRouter.post("/create-product", validateSchema(productSchema), createProduct);
productsRouter.get("/home", getProducts);

export default productsRouter;