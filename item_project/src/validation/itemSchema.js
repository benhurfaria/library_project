import joi from 'joi';

const itemSchema = joi.object({
    autor: joi.string().required(),
    ano_lancamento: joi.string().required(), 
    titulo: joi.string().required(),
    status: joi.boolean().required(),
})

export { itemSchema }