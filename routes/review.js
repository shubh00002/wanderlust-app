const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../views/utils/wrapAsync");
const ExpressError = require("../views/utils/ExpressError");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js");

const reviewController = require("../controllers/review.js");

// REVIEW ROUTE (POST REVIEW)
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

//  DELETE REVIEWS ROUTE
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
