const mongoose = require("mongoose");
let initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
  .then(() => {
    console.log("connected to database wanderlust");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const init = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "67fd129639385b3ed60f17ac",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was saved sucessfully");
};

init();
