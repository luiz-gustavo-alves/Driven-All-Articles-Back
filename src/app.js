import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectToDatabase } from "./database/db.js";

import authRouter from "./routes/auth.route.js";
import productsRouter from "./routes/products.route.js";

/* API configuration*/
dotenv.config();
connectToDatabase();

const app = express();
app.use(express.json());
app.use(cors());

/* Entrypoints (rotas) */
app.use([authRouter, productsRouter]);

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));