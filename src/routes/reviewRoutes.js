const express = require('express');
const router = express.Router();
const reviewsController = require('../db/controllers/reviewsController')

router.get('/', reviewsController.getAllReviews);
router.post('/', reviewsController.postReview);
router.put('/:reviewId', reviewsController.updateReview);
router.delete('/reviewId', reviewsController.deleteReview);

module.exports = router;