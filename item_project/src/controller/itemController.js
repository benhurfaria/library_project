import { connection } from "../database.js";
import { itemSchema } from "../validation/itemSchema.js";


/**
 * @swagger
 * /item:
 *   get:
 *     tags:
 *       - Itens
 *     summary: Pegar todos os itens
 *     produces:
 *       - application/json
 *     responses:
 *       500:
 *         description: Erro interno do servidor
 */

async function getGeral(req, res){
    try{
        const result = await connection.query("SELECT * FROM item ORDER BY id;");
        res.send(result.rows);
    }catch{
        res.sendStatus(500);
    }
}

/**
 * @swagger
 * /item/:id:
 *   get:
 *     tags:
 *       - Item por ID
 *     summary: Pega o item especifico por ID
 *     produces:
 *       - application/json
 *     responses:
 *       500:
 *         description: Erro interno do servidor
 */

async function getWithId(req, res){
    try{

        const id = req.params.id
        const result = await connection.query('SELECT * FROM item where id = $1;', [id]);
        res.send(result.rows);
    }catch{
        res.sendStatus(500);
    }
}

/**
 * @swagger
 * /item:
 *   post:
 *     tags:
 *       - Item
 *     summary: adiciona os itens a biblioteca
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Resposta de sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */


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

/**
 * @swagger
 * /item/:id:
 *   put:
 *     tags:
 *       - Item por ID
 *     summary: Atualizar item por ID
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Resposta de sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */

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

/**
 * @swagger
 * /item/:id:
 *   delete:
 *     tags:
 *       - Item por ID
 *     summary: Deleta item por ID
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Resposta de sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */

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