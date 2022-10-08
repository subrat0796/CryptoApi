const express = require("express");
const router = express.Router();

const { EtherController } = require("../controllers");

// get the normal transactions done by the user
router.get(
	"/getNormalTransactions/:userId",
	EtherController.getNormalTransactions
);

// get user balance and current price of ether
router.get("/getBalanceAndPrice/:userId", EtherController.getBalanceAndPrice);

module.exports = router;
