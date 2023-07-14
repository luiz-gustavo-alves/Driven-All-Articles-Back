// esse arquivo aqui serve para executar todas as funções que eu preciso
// esse arquivo é chamado la em Routes
// esse arquivo aqui é enviado por um post para faser o cadastro


import bcrypt from 'bcrypt';
import { db } from '../database/db.js';


export async function register(req, res) {
    // pegar os dados que a pessoa colocou na tela de cadastro
    const { name, email, password, image } = req.body;

    // verificar se o email ja foi castrado
    const user = await db.collection("users").findOne({ email });
    // se o usuario fornecido estiver no sevidor
    if (user) {
        return res.status(409).send({ message: "A user with this email already exists" })
    };

    // se tudo estiver certo 
    // cripitografas a senha 
    const securePassword= bcrypt.hashSync(password, 2);
    try {
        // enviar os dados pro servidor pra quando o cadastro der certo
        await db.collection("users").insertOne({ name, email, password: securePassword, image });
        return res.sendStatus(201);
    } catch (erro) {
        res.status(500).send(erro.message);
    }

};