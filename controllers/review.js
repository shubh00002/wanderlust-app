const Listing = require("../models/listing")
const Review = require("../models/review")
module.exports.createReview = async (req, res) => {
  // console.log("Request Body:", req.body); // Check if data exists

  let listing = await Listing.findById(req.params.id);
  if (!listing) {
    console.log("Listing not found!");
    return res.status(404).send("Listing not found");
  }

  let newReview = new Review(req.body.review);
  if (!listing.reviews) {
    listing.reviews = [];
  }
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "New Review added");

  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted");
    res.redirect(`/listings/${id}`);
  }