import { connection } from "../database.js";
import { itemSchema } from "../validation/itemSchema.js";

async function getGeral(req, res){
    try{
        const result = await connection.query("SELECT * FROM item ORDER BY id;");
        res.send(result.rows);
    }catch{
        res.sendStatus(500);
    }
}

async function getWithId(req, res){
    try{

        const id = req.params.id
        const result = await connection.query('SELECT * FROM item where id = $1;', [id]);
        res.send(result.rows);
    }catch{
        res.sendStatus(500);
    }
}

async function postItem(req, res){
    const validate = itemSchema.validate(req.body);
    
    if(validate.error){
        res.sendStatus(400);
        return;
    }

    const {autor, ano_lancamento, titulo} = req.body
    try{
        await connection.query('INSERT INTO item(autor, ano_lancamento, titulo) VALUES ($1, $2, $3) RETURNING *',
        [autor, ano_lancamento, titulo]);
        res.sendStatus(200);
    }catch{
        res.sendStatus(500);
    }
}

async function updateItem(req, res){
    const id = parseInt(req.params.id);
    const validate = itemSchema.validate(req.body);
    
    if(validate.error){
        res.sendStatus(400);
        return;
    }
    const {autor, ano_lancamento, titulo} = req.body;
    try{
        await connection.query('UPDATE item SET autor = $1, ano_lancamento= $2, titulo= $3 WHERE id= $4',
        [autor, ano_lancamento, titulo, id]);
        res.sendStatus(200);
    }catch{
        res.sendStatus(500)
    }
}

async function deleteItem(req, res){
    const id = parseInt(req.params.id)
    try{
        await connection.query('DELETE FROM item WHERE id = $1;',[id]);
        res.sendStatus(200);
    }catch{
        res.sendStatus(500);
    }
}

export { getGeral, getWithId, postItem, updateItem, deleteItem };