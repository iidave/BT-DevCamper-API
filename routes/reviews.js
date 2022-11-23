const express = require('express');
const {
  getReviews,
  getReview,
  //   addReview,
  //   updateReview,
  //   deleteReview,
  //   getReviewsInRadius,
} = require('../controllers/reviews');

//Bring in Review model

const Review = require('../models/Review');

const router = express.Router({ mergeParams: true });

//Bring in Advanced Results middleware
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.route('/').get(
  advancedResults(Review, {
    path: 'bootcamp',
    select: 'name description',
  }),
  getReviews
);
//   .post(protect, authorize('publisher', 'admin'), addReview);

router.route('/:id').get(getReview);
//   .put(protect, authorize('publisher', 'admin'), updateReview)
//   .delete(protect, authorize('publisher', 'admin'), deleteReview);

module.exports = router;
