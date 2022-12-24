var express = require("express");
var router = express.Router();

const VenuesController = require("../controllers/venues");

router.get("/", VenuesController.findAll);
router.post("/", VenuesController.addVenues);
router.get("/:id", VenuesController.findById);
router.put("/:id", VenuesController.updateData);
router.delete("/:id", VenuesController.deleteData);

module.exports = router;
