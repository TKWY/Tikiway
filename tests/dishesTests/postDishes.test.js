const setup = require('../test-helper');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

const url = '/restaurants';
const newRestaurant = {
  name: `Pizz'Burger`,
  description: `Pizz'burger c'est des pizzas, mais pas que, c'est aussi des burgers, des tacos, et des kebabs...`,
};

const newMenu = {
  category: 'Midi'
};

const newDish = {
  name: 'Steack frite',
  description: 'Steak et frite accompagné de sa sauce barbecue fait maison',
  price: 1200,
  promoPrice: 1100
};


describe("Post a new dishe", function() {
  setup();

  it("Return status code 201", async() =>  {
    const postRestaurant = await request(app).post(url)
      .send(newRestaurant);
    const postMenu = await request(app).post(url+`/${postRestaurant.body._id}/menu`)
      .send(newMenu)
    const res = await request(app).post(url+`/${postRestaurant.body._id}/menu/${postMenu.body._id}/dish`)
      .send(newDish)
    expect(res.statusCode).to.equal(201)
    expect(res).has.property('body', 'New dish has been added')
  })
})