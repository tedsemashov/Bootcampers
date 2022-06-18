const express = require('express');
const {
  getReview,
  addReview,
  getReviews,
} = require('../controllers/reviews');

const Review = require('../models/Review');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');
// const Course = require('../models/Course');

router.route('/')
  .get(advancedResults(Review, { path: 'bootcamp', select: 'name description' }), getReviews)
  .post(protect, authorize('user', 'admin'), addReview);

router.route('/:id')
  .get(getReview);

module.exports = router;
