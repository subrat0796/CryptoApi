const express = require("express");
const cors = require("cors");

const cron = require("node-schedule");

const httpStatus = require("http-status");
const config = require("./config/config");
const morgan = require("./config/morgan");

const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");

const { EtherServices } = require("./services");
const NewEtherServices = new EtherServices();

const app = express();

if (config.env !== "test") {
	app.use(morgan.successHandler);
	app.use(morgan.errorHandler);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// welcome routes
app.get("/", async (req, res) => {
	return res.status(200).json({ message: "Welcome to the assignment backend" });
});

// routes
require("./routes")(app);

// handling invalid requests
app.use((req, res, next) => {
	next(new ApiError(httpStatus.NOT_FOUND, "Not Found"));
});

app.use(errorConverter);
app.use(errorHandler);

async function RunEtherPrice() {
	await NewEtherServices.getEtherPrice();
}

const run = async () => {
	try {
		cron.scheduleJob("10 * * * *", RunEtherPrice);
	} catch (err) {
		console.log(err);
	}
};

run();

module.exports = app;
