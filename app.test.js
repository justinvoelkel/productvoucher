const app = require('./app')
const request = require('supertest')
const joi = require('joi')
const { product: productSchema } = require('./models')

describe('GET /vouchers/:code/products', function() {

  it('[happy] responds with 200 when code is valid', function(done) {
    request(app)
      .get('/vouchers/1234567890/products')
      .expect((res) => {
        const obj = res.body
        // ensure resonse body contains collection of valid products
        expect(Object.hasOwnProperty.call(obj, 'products')).toBe(true)
        expect(obj.products.length).toBeGreaterThan(0)
        obj.products.forEach(product => {
          const { value, error } = productSchema.validate(product)
          expect(error).toBeUndefined()
        })
      })
      .expect(200, done)
  })

  it('[unhappy] responds with 400 when code does not validate', function(done) {
    request(app)
      .get('/vouchers/12345/products')
      .expect(400, done)
  })

  it('[unhappy] responds with 400 when code has already been used', function(done) {
    request(app)
      .get('/vouchers/0987654321/products')
      .expect('this voucher has already been redeemed')
      .expect(400, done)
  })
})

describe('POST /vouchers/:code/redeem', function() {
  it('[happy] responds with 200 and successfully creates a redemption', function(done) {
    request(app)
      .post('/vouchers/1234567890/redeem')
      .send({
        product: '8fueh73bet',
        image_url: 'https://example.com/image.png',
        shipping_address: {
          street_address: '1234 Main St.',
          city: 'Parts Unknown',
          state: 'OH',
          zip: '12345'
        }
      })
      .expect(200, done)
  })

  it('[unhappy] responds with 400 when trying to redeem the previous voucher again', function(done) {
    request(app)
      .post('/vouchers/1234567890/redeem')
      .send({
        product: '8fueh73bet',
        image_url: 'https://example.com/image.png',
        shipping_address: {
          street_address: '1234 Main St.',
          city: 'Parts Unknown',
          state: 'OH',
          zip: '12345'
        }
      })
      .expect(400, done)
  })

  it('[unhappy] responds with 400 when voucher is invalid format', function(done){
    request(app)
      .post('/vouchers/12345/redeem')
      .expect(400, done)
  })

  it('[unhappy] responds with 400 when voucher is valid but products are not associated', function(done){
    request(app)
      .post('/vouchers/1111111111/redeem')
      .send({
        product: 'xxxxxxxxxx',
        image_url: 'https://example.com/image.png',
        shipping_address: {
          street_address: '1234 Main St.',
          city: 'Parts Unknown',
          state: 'OH',
          zip: '12345'
        }
      })
      .expect(400, done)
  })


})
