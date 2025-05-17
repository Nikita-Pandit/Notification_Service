const mongoose=require("mongoose")
const notificationSchema=new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  // userID:String,
     type: String,
  message: String,
  status: { type: String, default: "sent" },
  createdAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model("notification", notificationSchema);