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

- git clone https://github.com/your-username/notification-service.git
- cd notification-service

### 🔹 2. Install Dependencies

- npm install

### 🔹 3. Setup Environment Variables
- Create your .env file
- Then open .env and fill in the values like below:
  ![Image](https://github.com/user-attachments/assets/dcf9672a-425e-40d3-adaf-6d0a25d90b80)

### 🔹 4. Start the Server
- npm start
- You’ll see logs confirming MongoDB and RabbitMQ are connected.

  ---

## 4️⃣ Add User to MongoDB (Manually)

Before sending notifications, you must manually add a user to the MongoDB users collection.

### 🔹 How to Add a User
 You can use:
 - MongoDB Compass
 - MongoDB Atlas Web UI
 - Mongo Shell
 - Example Document
   
   ![Image](https://github.com/user-attachments/assets/81671cfe-6602-4add-bc70-b03d0deff03b)
   Once the user is inserted, copy the _id generated — you’ll use this in Postman to send a notification.
  
---

## 🧠 Assumptions

- Email and SMS are mocked by logging to the console.
- In-App notifications are stored directly in MongoDB.
- Users must already exist in the database.

---

## 📤 Deployment

You can deploy this service to:
- Render
- Railway
- Heroku (for backend only)
- Vercel (if you use frontend)

Make sure to add environment variables in the platform's dashboard.

---

## 🧑 Author

- Name: Nikita Pandit
- GitHub: @nikita000pandit
- Submitted for: PepSales Backend Internship Assignment — May 2025

  
   

