const Joi = require('joi')

module.exports = {
    id : Joi.number().optional(),   
    name: Joi.string().min(3).required()
}