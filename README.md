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

- git clone https://github.com/Nikita-Pandit/Notification_Service
- cd Notification_Service

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
   
   Example Document
   
   ![Image](https://github.com/user-attachments/assets/81671cfe-6602-4add-bc70-b03d0deff03b)
   
   Once the user is inserted, copy the _id generated — you’ll use this in Postman to send a notification.
  
---

## 🧪 How to Use the API (via Postman)

### 🔹 Send a Notification

- POST http://localhost: your port number/api/notifications

![Image](https://github.com/user-attachments/assets/06aa067b-0a66-4ba6-918f-058a5d7cd211)

![Image](https://github.com/user-attachments/assets/f75a9bb0-3af7-4ec4-92a3-a6a0b5d4e700)

### 🔹 Get Notifications for a User

- GET http://localhost:3000/api/users/<user_id>/notifications
- Returns a list of all notifications sent to that user.

  Example:

  ![Image](https://github.com/user-attachments/assets/ea025746-6a75-425d-8319-2b2302cd3ae7)

## 🧠 Assumptions

The following assumptions were made during development:

 1. ***Users are manually inserted into the database***
    
    - There is no signup/login system.
    - Users are inserted manually into the MongoDB `users` collection via MongoDB Atlas UI, Compass, or shell.
      
 2. Client must provide a valid userId
    
    - The client (e.g., Postman) must use a valid `_id` from the `users` collection when calling the `POST /api/notifications` endpoint.

 3. Email and SMS are simulated via console.log

    -  Email and SMS functionalities are simulated using `console.log()` statements.
    -    Real services like SendGrid or Twilio are not integrated, as they are outside the assignment scope.
   
 4. In-App notifications are stored in the database only

    - In-app notifications are represented as documents in the MongoDB `notifications` collection.
    - There is no frontend to display them; retrieval is through the API.

  5. RabbitMQ must be running and reachable

     - Either via CloudAMQP (recommended) or a local Docker container.
     - Environment variable `RABBITMQ_URL` must point to the correct broker URL.

  6. Retry logic is handled within the consumer logic only

     - If processing a message fails, it is retried up to 3 times.
     - Beyond that, the message is discarded, and no dead-letter queue is implemented.

  7. **This is a backend-only project**

     - There is no frontend UI for users or admins.
     - Postman or any HTTP client is expected for testing.

   8. **Minimal validation and error handling are implemented**

      - Basic validation exists, but production-grade validation, authentication, and authorization are out of scope. 
      
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

  
   

