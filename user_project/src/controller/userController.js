import { connection } from "../database.js";

async function getGeral(req, res){
    try{
        const result = await connection.query("SELECT * FROM usuario ORDER BY id;");
        res.send(result.rows);
    }catch{
        res.sendStatus(500);
    }
}

export { getGeral };