const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const joi = require('joi')

// app config
app.use(bodyParser.json())

// controllers
const voucherController = require('./controllers/voucherController')

app.get('/vouchers/:code/products', voucherController.voucher_products)
app.post('/vouchers/:code/redeem', voucherController.voucher_redeem)
module.exports = app
