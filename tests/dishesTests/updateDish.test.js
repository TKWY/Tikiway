const setup = require('../test-helper');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

const url = '/api/restaurants';
const newRestaurant = {
  name: `Pizz'Burger`,
  description: `Pizz'burger c'est des pizzas, mais pas que, c'est aussi des burgers, des tacos, et des kebabs...`,
};

const newMenu = {
  category: 'Midi'
};

const newDish = {
  name: 'Steak frite',
  description: 'Steak et frite accompagné de sa sauce barbecue fait maison',
  price: 1200,
  promoPrice: 1100
};

const updateDish = {
  name: 'Poulet frite'
}

describe('Update dish', function() {
  setup();
  it('Return code 201', async() => {
    const postRestaurant = await request(app).post(url)
      .send(newRestaurant);
    const postMenu  = await request(app).post(url+`/${postRestaurant.body._id}/menu`)
      .send(newMenu);
    const postDish = await request(app).post(url+`/${postRestaurant.body._id}/menu/${postMenu.body._id}/dish`)
      .send(newDish);
    const res = await request(app).put(url+`/${postRestaurant.body._id}/menu/${postMenu.body._id}/dish/${postDish.body._id}`)
      .send(updateDish)
    expect(res.statusCode).to.equal(201);
  })

  it('Return name property', async() => {
    const postRestaurant = await request(app).post(url)
      .send(newRestaurant);
    const postMenu  = await request(app).post(url+`/${postRestaurant.body._id}/menu`)
      .send(newMenu);
    const postDish = await request(app).post(url+`/${postRestaurant.body._id}/menu/${postMenu.body._id}/dish`)
      .send(newDish);
    const res = await request(app).put(url+`/${postRestaurant.body._id}/menu/${postMenu.body._id}/dish/${postDish.body._id}`)
      .send(updateDish)
    expect(res.body).has.property('name', 'Poulet frite');
  })
})