const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

// services for ether controller
const { EtherServices } = require("../services");
const NewEtherServices = new EtherServices();

const getNormalTransactions = catchAsync(async (req, res, next) => {
	const { userId } = req.params;

	// calling the services
	const response = await NewEtherServices.getNormalTransactions(userId);

	return res.status(httpStatus.OK).json({
		code: httpStatus.OK,
		status: httpStatus[httpStatus.OK],
		message: "getNormalTransactions",
		data: response,
	});
});

const getBalanceAndPrice = catchAsync(async (req, res, next) => {
	const { userId } = req.params;

	// calling the services
	const result = await NewEtherServices.getBalanceAndPrice(userId);

	return res.status(httpStatus.OK).json({
		code: httpStatus.OK,
		status: httpStatus[httpStatus.OK],
		message: "GetBalanceAndPrice",
		data: result,
	});
});

module.exports = {
	getNormalTransactions,
	getBalanceAndPrice,
};
