import { ObjectId } from "mongodb";
import db from "../database/db.js";

export const getUserById = async (req, res) => {

    const { id } = req.params;

    try {

        const products = await db.collection("products").findOne({ userID: new ObjectId(id) });
        const user = await db.collection("users").findOne({ _id: products.userID });

        res.send({ name: user.name, image: user.image });

    } catch (err) {
        res.status(500).send(err.message);
    }
}