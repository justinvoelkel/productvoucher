const { products, vouchers, voucherRedemptions, voucherProducts } = require('./data')

exports.selectVoucher = code => {
  // SELECT code FROM voucher where voucher.code = [code]
  return vouchers.find(voucher => voucher.code === code)
}

exports.selectVoucherProducts = (code) => {
  // since one voucher can be associated with many products
  // and a voucher code is not really semantically part of a product
  // this is probably a reasonable candidate for an associative table
  // to map a voucher to products
  // SELECT p.*
  // FROM product p
  // join voucher_product vp on vp.code = [code]
  // where p.sku = vp.sku
  return voucherProducts
    .filter( association => association.code === code)
    .map( association => ({sku: association.sku}))
}
