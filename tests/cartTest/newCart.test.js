const setup = require('../test-helper');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app')

const url = '/cart'

describe('add item to cart', function() {
  setup();
  it('Return status code 200', async() =>{
    const postRestaurant = request(app).post(url)
      .send()
  })
})