import { connection } from "../database.js";

async function getGeral(req, res){
    console.log("OI");
    try{
        const result = await connection.query("SELECT * FROM item ORDER BY id;");
        res.send(result.rows);
    }catch{
        res.sendStatus(500);
    }
}

export { getGeral };