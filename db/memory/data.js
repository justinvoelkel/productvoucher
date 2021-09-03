const products = [{sku:'8fueh73bet'}, {sku: '97nao84naj'}]

// code can be PK if unique
const vouchers = [
  { code: '1234567890' },
  { code: '0987654321' },
  { code: '1111111111' }
]

const voucherProducts = [
  { code: vouchers[0].code, sku: products[0].sku },
  { code: vouchers[1].code, sku: products[1].sku }
]

// start with one base redemption for initial unhappy path test case
const voucherRedemptions = [
  {
    code: vouchers[1].code,
    sku: products[0].sku,
    image_url: 'https://example.com/test.png',
    shipping_address: {
      street_address: '1234 main st.',
      city: 'test',
      state: 'OH',
      zip: '12345'
    }
  }
]

module.exports = { products, vouchers, voucherRedemptions, voucherProducts }
