const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const User = require("../models/user.models");
const ScheduleAttendanceCheck = () => {
  const yesterday = subDays(new Date(), 1);
  const start = startOfDay(yesterday);
  const end = endOfDay(yesterday);

  cron.schedule("0 0 * * *", async () => {
    try {
      const users = await User.find({ role: "user" });
      users.forEach(async (user) => {
        user.lastActivity = false;
        await user.save();
      });
    } catch (error) {
      console.error("Error in scheduled attendance check:", error);
    }
  });
};

module.exports = ScheduleAttendanceCheck;