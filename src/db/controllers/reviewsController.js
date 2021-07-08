const { Reviews } = require('../models/reviewsModels');
const Restaurant = require('../models/restaurantModels');

// Return all Reviews from target restaurant ID
const getAllReviews = (req, res) => {
  Restaurant.findById(req.params.restaurantId)
    .then(restaurant => {
      const reviews = restaurant.reviews;
      res.status(200).json(reviews)
    })
    .catch(err => {
      if (err) {
        res.status(500).json(err);
      }
    })
};

const getReviewId = async (req, res) => {
  await Restaurant.findById(req.params.restaurantId)
    .then(restaurant => {
      const review = restaurant.reviews.id(req.params.reviewId);
      if (review === null) {
        res.status(404).json('That review id does not exist.')
      }
      res.json(review)
    })
    .catch(err => {
      if (err) {
        res.status(500).json(err);
      }
    })
};

//  post a new Review on target restaurant ID
const postReview = async (req, res) => {
  body = req.body;
  await Restaurant.findById(req.params.restaurantId)
    .then(restaurant => {
      restaurant.reviews.push(req.body);
      restaurant.save()
        .then(() => {
          res.status(201).json('Thank you for posting your review.')
        })
    })
    .catch(err => {
      if (err) {
        console.log(err)
        res.status(500).json(err);
      }
    })
};

// Update target review
const updateReview = async (req, res) => {
  await Restaurant.findById(req.params.restaurantId)
    .then(restaurant => {
      const review = restaurant.reviews.id(req.params.reviewId);
      if (review === null) {
        res.status(404).json('That review does not exist.');
      }
      review.comment = req.body.comment;
      restaurant.save();
      res.status(200).json('Your comment has been updated.');
    })  
    .catch(err => {
      if (err) {
        res.status(500).json(err);
      }
    })
};

// Delete target review
const deleteReview = (req, res) => {
  Restaurant.findById(req.params.restaurantId)
    .then(restaurant => {
      const review = restaurant.reviews.id(req.params.reviewId);
      if (review === null) {
        res.status(404).json('That review does not exist');
      }
      review.remove();
      restaurant.save();
      res.sendStatus(204);
    })
    .catch(err => {
      if (err) {
        res.status(500).json(err)
      }
    })
};

module.exports = {
  getAllReviews,
  getReviewId,
  postReview,
  updateReview,
  deleteReview
}