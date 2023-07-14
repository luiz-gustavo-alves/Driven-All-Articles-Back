import db from "../database/db.js";
import { ObjectId } from "mongodb";

export const addProduct = async (req, res) => {

    let productID = req.params;
    productID = new ObjectId(productID);

    try {
        const product = await db.collection("products").findOne({ _id: productID });
        const shoppingCart = await db.collection("shoppingCart").findOne({ _id: productID });

        if (shoppingCart) {
            return res.status(409).send("Este produto já está no carrinho de compras!");
        }

        if (product.quantity <= 0) {
            return res.status(401).send("Este produto não está mais disponível!");
        }

        await db.collection("products").updateOne({ _id: productID }, { $inc: { quantity: -1} });

        delete product.quantity
        await db.collection("shoppingCart").insertOne({...product});

        res.send({...product});

    } catch (err) {
        res.status(500).send(err.message);
    }
}