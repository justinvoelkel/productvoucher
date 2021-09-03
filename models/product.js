const joi = require('joi')

const schema = joi.object({
  sku: joi
    .string()
    .alphanum()
    .length(10)
    .required()
})

module.exports = schema
