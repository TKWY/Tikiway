const express = require('express');
const Router = express.Router();
const uploadS3 = require('../services/imageUpload');
const imageController = require('../db/controllers/imageController');
const resizeImage = require('../services/resizeImage')

Router.post('/upload', uploadS3.single('file'), imageController.imageUpload)

module.exports = Router;
