const notification = require("../models/notification");
const user=require("../models/user")
const sendEmail = (to, message) => {
  console.log(`Email to ${to}: ${message}`)
};
const sendSMS = (to, message) => console.log(`SMS to ${to}: ${message}`);

exports.processNotification = async ({ userID, type, message }) => {
  const users = await user.findOne({_id:userID});
  if (!users) throw new Error("User not found");

  switch (type) {
    case "email":
      sendEmail(users.email, message);
      break;
    case "sms":
      sendSMS(users.phone, message);
      break;
    case "in-app":
      // In-app notifications are stored directly in DB
      break;
    default:
      throw new Error("Unknown notification type");
  }

  await notification.create({ userID, type, message });
};
