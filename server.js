
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// const notificationRoutes = require("./routes/notificationRoutes");
// const amqp = require("amqplib");
// require("dotenv").config();




// // RabbitMQ setup
// let channel, connection;
// async function connectRabbitMQ() {
//   try {
//     connection = await amqp.connect(process.env.RABBITMQ_URL);
//     channel = await connection.createChannel();
//     await channel.assertQueue("notificationQueue");
//     console.log("Connected to RabbitMQ");
    
//     // Consumer
//     channel.consume("notificationQueue", async (msg) => {
//       if (msg !== null) {
//         const data = JSON.parse(msg.content.toString());
//         const { processNotification } = require("./services/notificationServices");
//         try {
//           await processNotification(data);
//           channel.ack(msg);
//         } catch (err) {
//           console.error("Retrying message", err);
//           if (data.retries < 3) {
//             data.retries++;
//             channel.sendToQueue("notificationQueue", Buffer.from(JSON.stringify(data)));
//             channel.ack(msg);
//           } else {
//             console.error("Max retries reached, discarding message");
//             channel.ack(msg);
//           }
//         }
//       }
//     });
//   } catch (error) {
//     console.error("Failed to connect to RabbitMQ", error);
//   }
// }
// connectRabbitMQ();

// app.use("/api", notificationRoutes);

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// module.exports = { channel };





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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
