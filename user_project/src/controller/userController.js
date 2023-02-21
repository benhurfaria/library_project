import { connection } from "../database.js";
import { userSchema } from "../validation/userSchema.js";
import {v4 as uuid} from "uuid";

async function signOut(req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    console.log(token);
    try {
      await connection.query(
        `
              DELETE FROM sessions WHERE token = $1;
          `,
        [token],
      );
      res.sendStatus(200);
    } catch (err) {
      console.log(err);  
      res.sendStatus(500);
    }
}

async function signIn(req, res){
    const {
        email,
        senha
    } = req.body;
    
    try{
        const result = await connection.query(`SELECT * FROM usuario WHERE email = $1`, [email]);

        const user = result.rows[0];
        
        if(user && user.senha == senha){
            const token = uuid();
            await connection.query(`
            INSERT INTO sessions ("idUser", token) VALUES ($1, $2);`,[user.id, token]
            );
            res.send({token, nome: user.nome});
        } else{
            res.sendStatus(401);
        }
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

async function signUp(req, res) {
    const validation = userSchema.validate(req.body);
    
    if (validation.error) {
      res.sendStatus(400);
      return;
    }
  
    const { nome, email, cpf, senha } = req.body;
    
  
    try {
      await connection.query(
        `
              INSERT INTO usuario (nome, email, cpf, senha) VALUES ($1, $2, $3, $4);
          `,
        [nome, email, cpf, senha],
      );
      res.sendStatus(200);
  
      return;
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
}
/**
 * @swagger
 * /usuario:
 *   get:
 *     tags:
 *       - Usuario
 *     summary: Pegar todos os usuarios
 *     produces:
 *       - application/json
 *     responses:
 *       500:
 *         description: Erro interno do servidor
 */

async function getGeral(req, res){
    try{
        const result = await connection.query("SELECT * FROM usuario ORDER BY id;");
        res.send(result.rows);
    }catch{
        res.sendStatus(500);
    }
}

/**
 * @swagger
 * /usuario/:id:
 *   get:
 *     tags:
 *       - Usuario por ID
 *     summary: Pega o usuario especifico por ID
 *     produces:
 *       - application/json
 *     responses:
 *       500:
 *         description: Erro interno do servidor
 */

async function getWithId(req, res){
    try{

        const id = req.params.id
        const result = await connection.query('SELECT * FROM usuario where id = $1', [id]);
        res.send(result.rows);
    }catch{
        res.sendStatus(500);
    }
}

/**
 * @swagger
 * /usuario:
 *   post:
 *     tags:
 *       - Usuario
 *     summary: adiciona os usuarios a biblioteca
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

async function postUser(req, res){
    const validate = userSchema.validate(req.body);
    if(validate.error){
        res.sendStatus(400);
        return;
    }

    const {nome, email, cpf, senha} = req.body
    
    try{
        await connection.query('INSERT INTO usuario(nome, email, cpf, senha) VALUES ($1, $2, $3, $4) RETURNING *;',
        [nome, email, cpf, senha]);
        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

/**
 * @swagger
 * /usuario/:id:
 *   put:
 *     tags:
 *       - Usuario por ID
 *     summary: Atualizar o usuario por ID
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

async function updateUser(req, res){
    const id = parseInt(req.params.id);

    const validate = userSchema.validate(req.body);
    if(validate.error){
        res.sendStatus(400);
        return;
    }
    
    const {nome, email, cpf, senha} = req.body
    try{
        await connection.query('UPDATE usuario SET nome = $1, email= $2, cpf= $3, senha= $4 WHERE id= $5',
        [nome, email, cpf, senha, id]);
        res.sendStatus(200);
    }catch{
        res.sendStatus(500)
    }
}

/**
 * @swagger
 * /usuario/:id:
 *   delete:
 *     tags:
 *       - Usuario por ID
 *     summary: Deleta usuario por ID
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

async function deleteUser(req, res){
    const id = parseInt(req.params.id)
    try{
        await connection.query('DELETE FROM usuario WHERE id = $1',[id]);
        res.sendStatus(200);
    }catch{
        res.sendStatus(500);
    }
}

export { getGeral, getWithId, postUser, updateUser, deleteUser, signUp, signIn, signOut };

