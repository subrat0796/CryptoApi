const axios = require("axios");
const httpStatus = require("http-status");

const ApiError = require("../utils/ApiError");

const TransactionQueries = require("../models/transactions.model");
const EtherPriceQueries = require("../models/etherPrice.model");
const {
	ReducedAggregation,
	MappedAggregation,
} = require("../utils/AggregateFunctions");

class Ether {
	constructor() {}

	// get normal transactions done by the user
	async getNormalTransactions(userId) {
		// https://api.etherscan.io/api?module=account&action=txlist&address=0x052854cb136b9a5d62c96dff99459fa1adb167a0&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken
		try {
			var config = {
				method: "get",
				url: `https://api.etherscan.io/api?module=account&action=txlist&address=${userId}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken`,
				headers: {},
			};

			const { data: normalTransactions } = await axios(config);
			if (
				!normalTransactions ||
				!normalTransactions?.result ||
				!Array.isArray(normalTransactions.result)
			) {
				throw new ApiError(
					httpStatus.INTERNAL_SERVER_ERROR,
					normalTransactions?.result || "There was some internal error"
				);
			}

			const mapFunc = async (eachTransaction) => {
				const existingTransaction = await TransactionQueries.findOne({
					hash: eachTransaction?.hash,
				});

				if (!existingTransaction) {
					await TransactionQueries.create({ ...eachTransaction });
				}
			};

			// return normalTransactions.result;
			Array.isArray(normalTransactions?.result) &&
				MappedAggregation(normalTransactions?.result, mapFunc);

			return await TransactionQueries.find({
				$or: [{ to: userId }, { from: userId }],
			});
		} catch (err) {
			console.log(err);

			throw new ApiError(
				httpStatus.INTERNAL_SERVER_ERROR,
				"There was some internal server error"
			);
		}
	}

	// get etherium price
	async getEtherPrice() {
		// https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr
		try {
			var config = {
				method: "get",
				url: "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr",
				headers: {},
			};

			const { data: etherPrice } = await axios(config);

			const price = etherPrice?.ethereum;

			if (price) {
				await EtherPriceQueries.create({
					...price,
				});
			}

			return price;
		} catch (err) {
			throw new ApiError(
				httpStatus.INTERNAL_SERVER_ERROR,
				"There was some internal server error"
			);
		}
	}

	// get latest ether price and user balance
	async getBalanceAndPrice(userId) {
		try {
			const normalTransactions = await this.getNormalTransactions(userId);

			const startValue = 0;
			const reduceFunc = (acc, eachObj) => {
				let { _id, from, to, value } = eachObj;
				if (from === userId) return acc - parseInt(value);
				else if (to === userId) return acc + parseInt(value);
			};

			const finalValue = ReducedAggregation(
				normalTransactions,
				reduceFunc,
				startValue
			);

			const currentEtherPrice = await this.getEtherPrice();

			return {
				currentEtherPrice,
				currentBalance: finalValue,
			};
		} catch (err) {
			throw new ApiError(
				httpStatus.INTERNAL_SERVER_ERROR,
				"There was some internal server error"
			);
		}
	}
}

module.exports = Ether;
