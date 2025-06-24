const express = require("express");
const router = express.Router();
const wrapAsync = require("../views/utils/wrapAsync");
const Listing = require("../models/listing");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage });
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const ListingController = require("../controllers/listing.js");

// NEW ROUTE
router.get("/new", isLoggedIn, ListingController.renderNewForm);

router
  .route("/")
  .get(wrapAsync(ListingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(ListingController.createListing)
  );
// INDEX ROUTE
// CREATE ROUTE

//EDIT ROUTE
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.renderEditForm)
);
// EDIT ROUTE

router
  .route("/:id")
  .delete(isLoggedIn, isOwner, wrapAsync(ListingController.destroyListing))
  .get(wrapAsync(ListingController.showListings))
  .put(
    isLoggedIn,
    isOwner,
     upload.single("listing[image]"),
    validateListing,
    wrapAsync(ListingController.updateListing)
  );
// DELETE ROUTE
// SHOW ROUTE
//UPDATE ROUTE

module.exports = router;
