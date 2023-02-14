import joi from 'joi';

const userSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    cpf: joi.string().required(),
    senha: joi.string().required(),
});

export { userSchema };