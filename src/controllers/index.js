const {
	getBalanceAndPrice,
	getNormalTransactions,
} = require("./ether.controller");

module.exports = {
	EtherController: {
		getBalanceAndPrice,
		getNormalTransactions,
	},
};
