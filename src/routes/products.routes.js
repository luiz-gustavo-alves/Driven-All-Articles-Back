import useRouter from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createProduct } from "../controllers/products.controller.js";

import { productSchema } from "../schemas/product.schema.js";

const productsRouter = useRouter();

productsRouter.post("/create-product", validateSchema(productSchema), createProduct);

export default productsRouter;