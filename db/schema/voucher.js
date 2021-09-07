const joi = require('joi')
const product = require('./product')

const schema = joi.object({
  code: joi
    .string()
    .alphanum()
    .length(10)
    .required(),
  products: joi.array().items(product)
}).with('code', 'sku')

module.exports = schema
