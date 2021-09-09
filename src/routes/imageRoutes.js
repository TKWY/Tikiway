const express = require('express');
const Router = express.Router();
const uploadS3 = require('../services/imageUpload');
const imageController = require('../db/controllers/imageController');

Router.post('/upload', uploadS3.single('file'), imageController.imageUpload)

module.exports = Router;
