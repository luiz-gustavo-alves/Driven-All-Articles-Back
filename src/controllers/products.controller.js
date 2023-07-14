import db from "../database/db.js";
import dayjs from "dayjs";

export const createProduct = async (req, res) => {

    try {

        // TODO: Check token

        const newProduct = {

            ...res.locals.data,
            // userID: res.locals.session._id,
            day: dayjs().locale('pt-br').format('DD/MM')
        }

        await db.collection("products").insertOne(newProduct);
        res.send(newProduct);

    } catch (err) {
        res.status(500).send(err.message);
    }
}