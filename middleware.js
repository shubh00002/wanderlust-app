const Listing = require("./models/listing.js");
const Review = require("./models/review.js")
const ExpressError = require("./views/utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.requestUrl = req.originalUrl;
    req.flash("error", "you must be login to create new listings!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.requestUrl) {
    res.locals.redirectUrl = req.session.requestUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

module.exports.validateListing = (req, res, next) => {
  // console.log(req.body);
  let { error } = listingSchema.validate(req.body);
  console.log(error);
  // let errMsg = error.details.map((el) => el.message).join(",");
  if (error) {
    throw new ExpressError(404, error);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  // console.log(req.body);
  let { error } = reviewSchema.validate(req.body);
  console.log(error);
  // let errMsg = error.details.map((el) => el.message).join(",");
  if (error) {
    throw new ExpressError(404, error);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }

  next();
};