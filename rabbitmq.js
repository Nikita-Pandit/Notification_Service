
const amqp = require("amqplib");
require("dotenv").config();

let channel;

async function connectRabbitMQ() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue("notificationQueue");
  console.log("Connected to RabbitMQ");
  return channel;
}

function getChannel() {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  return channel;
}

module.exports = {
  connectRabbitMQ,
  getChannel,
};
