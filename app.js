const express = require('express')
const app = express()
const joi = require('joi')
const voucherController = require('./controllers/voucherController')
const { voucher } = require('./db/schema')

app.get('/voucher/:code/product', voucherController.voucher_products)

module.exports = app
