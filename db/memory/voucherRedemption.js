const { voucherRedemptions } = require('./data')

exports.selectVoucherRedemptions = (code) => {
  // in the real world this would be interacting with a real db
  // SELECT COUNT(*) FROM voucher_redemptions where voucher_code = [code]
  return voucherRedemptions.find(redemption => redemption.code === code)
}

exports.createVoucherRedemption = data => {
  voucherRedemptions.push(data)
}
