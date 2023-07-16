import db from "../database/db.js";

export async function checkout(req, res) {
    const { name, address, complement, zipcode, cardname, cardnumber, expdate, seccode } = res.locals.data

    try {
        await db.collection("sales").insertOne({
            name,
            address,
            complement,
            zipcode,
            cardname,
            cardnumber,
            expdate,
            seccode
        }
        )
        res.sendStatus(201)
    } catch {
        res.status(500).send(err.message);
    }

}