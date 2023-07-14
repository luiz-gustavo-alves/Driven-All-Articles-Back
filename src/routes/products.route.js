import useRouter from "express";
import { createProduct, getProducts } from "../controllers/products.controller.js";

import { validateAuth } from "../middlewares/validateAuth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { productSchema } from "../schemas/product.schema.js";

const productsRouter = useRouter();
productsRouter.use(validateAuth);

productsRouter.post("/create-product", validateSchema(productSchema), createProduct);
productsRouter.get("/home", getProducts);

export default productsRouter;