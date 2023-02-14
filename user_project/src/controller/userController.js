import { connection } from "../database.js";

async function getGeral(req, res){
    try{
        const result = await connection.query("SELECT * FROM usuario ORDER BY id;");
        res.send(result.rows);
    }catch{
        res.sendStatus(500);
    }
}

async function getWithId(req, res){
    try{

        const id = req.params.id
        const result = await connection.query('SELECT * FROM usuario where id = $1', [id]);
        res.send(result.rows);
    }catch{
        res.sendStatus(500);
    }
}

async function postUser(req, res){
    const {autor, ano_lancamento, titulo} = req.body
    try{
        await connection.query('INSERT INTO usuario(nome, email, cpf, senha) VALUES ($1, $2, $3, $4) RETURNING *',
        [nome, email, cpf, senha]);
        res.sendStatus(200);
    }catch{
        res.sendStatus(500);
    }
}

async function updateItem(req, res){
    const id = parseInt(req.params.id);
    const {autor, ano_lancamento, titulo} = req.body;
    try{
        await connection.query('UPDATE usuario SET nome = $1, email= $2, cpf= $3, senha= $4 WHERE id= $5',
        [nome, email, cpf, senha, id]);
        res.sendStatus(200);
    }catch{
        res.sendStatus(500)
    }
}

async function deleteItem(req, res){
    const id = parseInt(req.params.id)
    try{
        await connection.query('DELETE FROM usuario WHERE id = $1',[id]);
        res.sendStatus(200);
    }catch{
        res.sendStatus(500);
    }
}

export { getGeral };