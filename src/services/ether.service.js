const axios = require("axios");

const TransactionQueries = require("../models/transactions.model");
const EtherPriceQueries = require("../models/etherPrice.model");
const httpStatus = require("http-status");

class Ether {
	constructor() {}

	async getNormalTransactions(userId) {
		// https://api.etherscan.io/api?module=account&action=txlist&address=0x052854cb136b9a5d62c96dff99459fa1adb167a0&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken
		try {
			var config = {
				method: "get",
				url: `https://api.etherscan.io/api?module=account&action=txlist&address=${userId}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken`,
				headers: {},
			};

			const { data: normalTransactions } = await axios(config);

			// return normalTransactions.result;
			normalTransactions?.result?.map(async (eachTransaction) => {
				const existingTransaction = await TransactionQueries.findOne({
					hash: eachTransaction?.hash,
				});

				if (!existingTransaction) {
					await TransactionQueries.create({ ...eachTransaction });
				}
			});

			return await TransactionQueries.find({
				$or: [{ to: userId }, { from: userId }],
			});
		} catch (err) {
			throw new ApiError(
				httpStatus.INTERNAL_SERVER_ERROR,
				"There was some internal server error"
			);
		}
	}
}

module.exports = Ether;
