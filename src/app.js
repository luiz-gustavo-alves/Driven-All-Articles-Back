import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectToDatabase } from "./database/db.js";
import { configDotenv } from "dotenv";

/* API configuration*/
dotenv.config();
connectToDatabase();

const app = express();
app.use(express.json());
app.use(cors());

/* Entrypoints (rotas) */
// app.use();

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));