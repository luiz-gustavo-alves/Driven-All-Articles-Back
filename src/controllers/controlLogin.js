// esse arquivo aqui serve para executar o ligin
// esse arquivo é chamado la em Routes
// esse arquivo aqui é enviado por um post para faser o login

import bcrypt from 'bcrypt';
import { db } from '../database/db.js';
import { v4 as uuid } from 'uuid';


export async function login(req, res) {
    const { email, password } = req.body

    try {
        // validar o usuario
        // verificar pelo email 
        const user = await db.collection("users").findOne({ email });
        // se o usuario fornecido nao estiver no sevidor
        if (!user) {
            return res.status(404).send({ message: "Unregistered user" })
        };
        // vericiar se a senha esta correta
        const correctPassword = bcrypt.compareSync(password, user.password)
        if (!correctPassword) {
            return res.status(401).send({ message: "Incorrect password" });
        };
       
        const token = uuid();

        await db.collection("assignment").insertOne({
            token,
            idUsuario: user._id,
            email
        })
        return res.status(200).send({ token: token, name: user.name });
    } catch (erro) {
        res.status(500).send(erro.message);
    }
}