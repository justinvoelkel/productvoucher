const app = require('./app')
const request = require('supertest')
const joi = require('joi')
const { product: productSchema } = require('./db/schema')

it('Testing to see if Jest works', () => {
  expect(1).toBe(1)
})

describe('GET /voucher/:code/product', function() {

  it('[happy] responds with 200 when code is valid', function(done) {
    request(app)
      .get('/voucher/1234567890/product')
      .expect((res) => {
        const obj = res.body
        expect(Object.hasOwnProperty.call(obj, 'products')).toBe(true)
        expect(obj.products.length).toBeGreaterThan(0)
        obj.products.forEach(product => {
          const { value, error } = productSchema.validate(product)
          expect(error).toBe(undefined)
        })
      })
      .expect(200, done)
  })

  it('[sad] responds with 400 when code does not validate', function(done) {
    request(app)
      .get('/voucher/12345/product')
      .expect(400, done)
  })

  it('[sad] responds with 400 when code has already been used', function(done) {
    request(app)
      .get('/voucher/0987654321/product')
      .expect(400, done)
  })
})
