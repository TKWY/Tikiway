const express = require('express');
const router = express.Router();
const reviewsController = require('../db/controllers/reviewsController')

router.get('/:restaurantId/reviews', reviewsController.getAllReviews);
router.post('/:restaurantId/reviews', reviewsController.postReview);
router.get('/:restaurantId/reviews/:reviewId', reviewsController.getReviewId);
router.put('/:restaurantId/reviews/:reviewId', reviewsController.updateReview);
router.delete('/:restaurantId/reviews/:reviewId', reviewsController.deleteReview);

module.exports = router;