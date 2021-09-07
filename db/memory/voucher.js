exports.selectVoucherRedemptions = (code) => {
  // in the real world this would be interacting with a real db
  if(code !== '1234567890') {
    return 1
  }
  return 0
}
exports.selectVoucherProducts = (code) => {
  return [{sku:'8fueh73bet'}, {sku: '97nao84naj'}]
}
