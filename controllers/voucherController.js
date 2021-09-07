const { voucher:voucherSchema } = require('../db/schema')
const { voucher:voucherDb } = require('../db/memory/')


exports.voucher_products = (req, res) => {
  const code = req.params.code
  // ensure the voucher code is valid format
  const { value, error } = voucherSchema.extract('code').validate(code)
  if(error) {
    res.status(400).send(error.details[0].message)
  }
  // check to see if the voucher has been redeemed
  const redemptions = voucherDb.selectVoucherRedemptions(code)
  if(redemptions) {
    res.status(400).send('this voucher has already been redeemed')
  }
  // finally select the related products to this voucher code
  const products = voucherDb.selectVoucherProducts(code)
  res.json({
    products
  })
}
