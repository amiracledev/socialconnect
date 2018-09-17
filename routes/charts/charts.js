const express = require("express");
const router = express.Router();

const winLoss = require("./chartTypes/winLoss");

router.use('/winloss', winLoss);


module.exports = router;