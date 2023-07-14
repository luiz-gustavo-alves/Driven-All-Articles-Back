import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../database/db.js";

export const signIn = async (req, res) => {

    const { email, password } = res.locals.data;

    try {
        const userDB = await db.collection("users").findOne({ email });
        if (!userDB || !bcrypt.compareSync(password, userDB.password)) {
            return res.status(404).send("E-mail ou senha incorretos.");
        }

        /* If session token exists, deletes token from database. */
        await db.collection("sessions").findOneAndDelete({ userId: userDB._id });

        const token = uuid();
        await db.collection("sessions").insertOne({ userId: userDB._id, token });

        res.send({ username: userDB.name, image: userDB.image, token: token });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const signUp = async (req, res) => {

    const { name, email, password, confirmPassword, image } = res.locals.data;

    if (password !== confirmPassword) {
        return res.status(404).send("Senhas não coincidem!");
    }

    try {
        const userDB = await db.collection("users").findOne({ email });
        if (userDB) {
            return res.status(409).send("E-mail já cadastrado!");
        }

        const cryptedPassword = bcrypt.hashSync(password, Number(10));
        await db.collection("users").insertOne({ name: name, email: email, password: cryptedPassword, image: image });

        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}