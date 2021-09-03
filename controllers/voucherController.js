const { voucher:voucherSchema } = require('../models')
const { voucher:voucherRepo } = require('../db/memory')
const { voucherRedemption:voucherRedemptionSchema } = require('../models')
const { voucherRedemption:voucherRedemptionRepo } = require('../db/memory')

// Note - In a real world app this is probably better suited
// for a middleware or part of a data access layer that
// would throw an error to be bubbled and handled in this controller.
const checkVoucherValidAndUnused = (code) => {
  let status = {valid: true, message: 'ok'}
  // ensure the voucher code is valid format
  const { value, error } = voucherSchema.extract('code').validate(code)
  if(error) {
    status.valid = false
    status.message = error.details
    return status
  }
  // check to see if the voucher has been redeemed
  const redemptions = voucherRedemptionRepo.selectVoucherRedemptions(code)
  if(redemptions) {
    status.valid = false
    status.message = 'this voucher has already been redeemed'
    return status
  }
  return status
}

exports.voucher_products = (req, res) => {
  const code = req.params.code
  const status = checkVoucherValidAndUnused(code)
  if(!status.valid) {
    return res.status(400).send(status.message)
  }
  // finally select the related products to this voucher code
  const products = voucherRepo.selectVoucherProducts(code)
  res.json({
    products
  })
}

// TODO - this controller is too long. Move to data access.
exports.voucher_redeem = (req, res) => {
  const code = req.params.code
  const body = req.body
  // still need to check validity of code
  const status = checkVoucherValidAndUnused(code)
  // need to check that the sku passed is valid product for this code
  const products = voucherRepo.selectVoucherProducts(code)
  // if there are no products bail early
  if(!products.length) {
    return res.status(400).send('No products found for this code')
  }
  const productValid = products
        .find(product => product.sku === body.product)
  if(!status.valid || !productValid) {
    return res.status(400).send('Invalid code or product sku')
  }
  // get voucher and add to the redemption
  const voucher = voucherRepo.selectVoucher(code)
  // merge voucher into request body
  const data = Object.assign({}, { code }, req.body)
  // ensure the redemption data passed in the request body is valid
  const { value, error } = voucherRedemptionSchema.validate(data)
  if(error) {
    return res.status(400).json(error.details)
  }

  try {
    voucherRedemptionRepo.createVoucherRedemption(data)
  } catch (e) {
    return res.status(400).send(e.message)
  }
  res.send()
}
