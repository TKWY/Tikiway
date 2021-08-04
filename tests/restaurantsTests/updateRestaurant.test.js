const setup = require('../test-helper');
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../app');
const Restaurant = require('../../src/db/models/restaurantModels');

const newRestaurant = {
  name: `Pizz'Burger`,
  description: `Pizz'burger c'est des pizzas, mais pas que, c'est aussi des burgers, des tacos, et des kebabs...`,
  category: 'category'
};

const updateRestaurant = {
  description: `This is the new description`,
  category: 'category'
}

const url = "/api/restaurants"

describe('Update restaurants tests', function() {
  setup();
  it('Return status code 201', async() => {
    try {
      const postRestaurant = await new Restaurant(newRestaurant);
      const saveRestaurant = await postRestaurant.save()
      const res = await request(app).put(url+`/${saveRestaurant._id}`)
        .send(updateRestaurant)
      expect(res.statusCode).to.equal(201)
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }


  })

  it('Return new description', async() => {
    try {
      const postRestaurant = await new Restaurant(newRestaurant);
      const saveRestaurant = await postRestaurant.save()
      const res = await request(app).put(url+`/${saveRestaurant._id}`).send(updateRestaurant);
      return expect(res.body).has.property('description', 'This is the new description');
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  })
})