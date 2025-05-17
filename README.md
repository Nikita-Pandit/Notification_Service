# 📬 Notification Service

A backend service that allows sending notifications (Email, SMS, and In-App) to users. Built with Node.js, MongoDB, and RabbitMQ, it uses asynchronous queuing and retry logic to ensure reliable delivery.

---

## 🚀 Features

- 📧 Supports Email, SMS, and In-App notifications
- 🔁 Retry logic for failed notifications (up to 3 times)
- 🕓 Asynchronous processing using RabbitMQ
- 📂 MongoDB-based storage for notifications
- 📡 RESTful API endpoints

---

## 🛠️ Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- RabbitMQ (via CloudAMQP or Docker)
- Nodemailer (for email mock)
- Console-based SMS mock
- REST API

---

## 📁 Project Structure

