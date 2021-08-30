// This contain all the test to add new order
// Dev&Design

// Import tests requirements
const expect = require('chai').expect;
const request = require('supertest');

// Setup start mongoose in memory
const setup = require('../test-helper');

// Import models for pre post data
const Restaurant = require('../../src/db/models/restaurantModels');
const Customer = require('../../src/db/models/customerModels');
