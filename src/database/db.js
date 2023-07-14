/* Connection to mongoClient database */
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

export async function connectToDatabase() {
    try {
        await mongoClient.connect();
        console.log("Conectado com banco de dados.");
    } catch (err) {
        console.log(err.message);
    }
}

export const db = mongoClient.db();