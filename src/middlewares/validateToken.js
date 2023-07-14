import { db } from '../database/db.js';

export async function validateToken (req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
        return res.sendStatus(401);
    }
    try {
        const assignment = await db.collection("assignment").findOne({ token });
        if (!assignment) {
            return res.sendStatus(401);
        }
        res.locals.token = token
        next();
    } catch (err) {
        res.status(500).send(err.message);
    }

}
// 