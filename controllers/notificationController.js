// const notification = require("../models/notification");
// const { channel } = require("../server")

// const sendNotification = async (req, res) => {
//   const { userID, type, message } = req.body;
//   const data = { userID, type, message, retries: 0 };
//   channel.sendToQueue("notificationQueue", Buffer.from(JSON.stringify(data)));
//   res.status(202).json({ message: "Notification queued." });
// };


// const getUserNotifications = async (req, res) => {
//   const userID = req.params.id;
//   const notifications = await notification.find({ userID });
//   res.status(200).json(notifications);
// };

// module.exports={sendNotification,getUserNotifications}


const notification = require("../models/notification");
const { getChannel } = require("../rabbitmq");

const sendNotification = async (req, res) => {
  try {
    const { userID, type, message } = req.body;
    const data = { userID, type, message, retries: 0 };

    const channel = getChannel();  // Get the current active channel
    channel.sendToQueue("notificationQueue", Buffer.from(JSON.stringify(data)));

    res.status(202).json({ message: "Notification queued." });
  } catch (error) {
    console.error("Failed to send notification to queue:", error);
    res.status(500).json({ message: "Failed to queue notification" });
  }
};

const getUserNotifications = async (req, res) => {
  try {
    const userID = req.params.id;
    const notifications = await notification.find({ userID });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

module.exports = { sendNotification, getUserNotifications };
