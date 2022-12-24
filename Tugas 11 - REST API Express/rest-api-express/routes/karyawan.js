var express = require("express");
var router = express.Router();

const KaryawanController = require("../controllers/karyawan");

router.get("/", KaryawanController.findAllData);
router.post("/register", KaryawanController.register);
router.post("/:name/siswa", KaryawanController.addSiswa);

module.exports = router;
