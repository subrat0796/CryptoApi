const mongoose = require("mongoose");

const EtherPriceModel = new mongoose.Schema(
	{
		inr: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("EtherPrice", EtherPriceModel);
