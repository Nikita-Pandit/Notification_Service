
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { connectRabbitMQ } = require("./rabbitmq");
const notificationRoutes = require("./routes/notificationRoutes");

app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Connect RabbitMQ and start consuming messages
connectRabbitMQ().then(channel => {
  channel.consume("notificationQueue", async (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      const { processNotification } = require("./services/notificationServices");
      try {
        await processNotification(data);
        channel.ack(msg);
      } catch (err) {
        console.error("Retrying message", err);
        if (data.retries < 3) {
          data.retries++;
          channel.sendToQueue("notificationQueue", Buffer.from(JSON.stringify(data)));
          channel.ack(msg);
        } else {
          console.error("Max retries reached, discarding message");
          channel.ack(msg);
        }
      }
    }
  });
}).catch(err => {
  console.error("Failed to connect to RabbitMQ", err);
});

app.use("/api", notificationRoutes);
app.get('/', (req, res) => {
  res.send('Notification Service Backend is running!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
