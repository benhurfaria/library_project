import joi from 'joi';

const itemSchema = joi.object({
    autor: joi.string().required(),
    ano_lancamento: joi.date().required(), 
    titulo: joi.string().required(),
})

export { itemSchema }