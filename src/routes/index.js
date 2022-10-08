const EtherRoutes = require("./ether.route");

module.exports = (app) => {
	app.use("/api/ether", EtherRoutes);
};
