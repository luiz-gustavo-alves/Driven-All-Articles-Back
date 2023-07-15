// esse arquivo aqui serve para executar o ligin
// esse arquivo é chamado la em Routes
// esse arquivo aqui é enviado por um post para faser o login

import bcrypt from "bcrypt";
import db from "../database/db.js";
import { v4 as uuid } from "uuid";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const filename = `${uuid()}-${file.originalname}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

export async function register(req, res) {
    const { name, email, password } = req.body;

    try {
        const user = await db.collection("users").findOne({ email });
        if (user) {
            return res.status(409).send("E-mail já cadastrado!");
        }

        const cryptedPassword = bcrypt.hashSync(password, 10);

        upload.single("image")(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).send("Erro durante o upload da imagem.");
            } else if (err) {
                return res.status(500).send("Ocorreu um erro no servidor.");
            }

            const image = req.file ? req.file.filename : '';

            db.collection("users").insertOne({
                name,
                email,
                password: cryptedPassword,
                image
            });

            res.sendStatus(201);
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
}


export async function login(req, res) {

    const { email, password } = res.locals.data;

    try {
        // validar o usuario
        // verificar pelo email 
        const user = await db.collection("users").findOne({ email });
        // se o usuario fornecido nao estiver no sevidor - vericiar se a senha esta correta
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(404).send({ message: "E-mail ou senha incorretos!" })
        };

        await db.collection("sessions").findOneAndDelete({ userID: user._id });

        const token = uuid();
        await db.collection("sessions").insertOne({ userID: user._id, token });

        res.send({ name: user.name, image: user.image, token: token });

    } catch (err) {
        res.status(500).send(err.message);
    }
}