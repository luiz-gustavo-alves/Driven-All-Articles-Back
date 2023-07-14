import db from "../database/db.js";
import dayjs from "dayjs";

export const createProduct = async (req, res) => {

    const { userId } = res.locals.session;

    try {
        const newProduct = {

            ...res.locals.data,
            userId: userId,
            day: dayjs().locale('pt-br').format('DD/MM')
        }

        await db.collection("products").insertOne(newProduct);
        res.send(newProduct);

    } catch (err) {
        res.status(500).send(err.message);
    }
}