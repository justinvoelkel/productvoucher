const joi = require('joi')
const product = require('./product')
const voucher = require('./voucher')

const schema = joi.object({
  voucher: voucher,
  product: product,
  image_url: joi.string().required(),
  shipping_Address: joi.object({
    street: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().length(2).required(),
    zip: joi.string().length(5).required()
  })
})
