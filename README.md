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

![Image](https://github.com/user-attachments/assets/ed5c46f8-5054-47ae-acb8-e57e16d520ca)

---

## ⚙️ Setup Instructions

### 🔹 1. Clone the Repository

git clone https://github.com/your-username/notification-service.git
cd notification-service

### 🔹 2. Install Dependencies

npm install


