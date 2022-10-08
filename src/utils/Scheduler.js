const cron = require("node-cron");

const SchedulerFunc = (timeString, functionToSchedule) => {
	return cron.schedule(timeString, functionToSchedule);
};

module.exports = SchedulerFunc;
