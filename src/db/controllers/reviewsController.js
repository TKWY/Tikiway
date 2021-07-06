const { Reviews } = require('../models/reviewsModels');

// Return all Reviews from target restaurant ID
const getAllReviews = (req, res) => {
  Reviews.find()
    .then(reviews => {
      res.status(200).json(reviews);
    })
    .catch(err => {
      if (err) {
        res.status(500).json(err);
      }
    })
};

//  post a new Review on target restaurant ID
const postReview = (req, res) => {
  body = req.body;
  newReview = new Reviews(body);
  newReview.save()
    .then(review => {
      res.status(201).json(review);
    })
    .catch(err => {
      if (err) {
        res.status(500).json(err);
      }
    })
};

// Update target review
const updateReview = (req, res) => {
  body = req.body;
  Reviews.findByIdAndUpdate(req.params.reviewId, body)
    .then(review => {
      res.status(203).json(review);
    })
    .catch(err => {
      res.status(500).json(err);
    })
};

// Delete target review
const deleteReview = (req, res) => {
  body = req.body;
  Reviews.findByIdAndDelete(req.params.reviewId, body)
    .then(() => {
      res.status(200).json('Review has been deleted');
    })
    .catch(err => {
      res.status(500).json(err);
    })
};

module.exports = {
  getAllReviews,
  postReview,
  updateReview,
  deleteReview
}