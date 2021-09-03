const joi = require('joi')
const product = require('./product')
const voucher = require('./voucher')

const schema = joi.object({
  code: voucher.extract('code').required(),
  product: product.extract('sku').required(),
  image_url: joi.string().uri().required(),
  shipping_address: joi.object({
    street_address: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().length(2).required(),
    zip: joi.string().length(5).required()
  })
})

module.exports = schema
