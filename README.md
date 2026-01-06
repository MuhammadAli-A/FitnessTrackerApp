# Fitness Tracker - MERN Stack Application

A full-stack fitness tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js) that enables users to log their daily workout activities, view their complete workout history, and monitor their fitness progress.

---

## � Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Project Overview

The Fitness Tracker is a web-based application designed to help users maintain and track their workout routines. Users can log workout sessions with details like exercise name, duration, calories burned, and date. The application provides a comprehensive dashboard with statistics and a complete workout history with options to edit or delete entries.

### Key Highlights:
- Clean, modern UI with gradient styling
- Real-time statistics dashboard
- Full CRUD operations for workout management
- Responsive design for all devices
- RESTful API architecture
- MongoDB for data persistence

---

## ✨ Features

### 1. **Workout Entry Form**
Log new workout sessions with the following fields:
- **Exercise Name**: Name of the exercise or workout activity
- **Date**: Date when the workout was performed
- **Duration (minutes)**: Length of the workout session
- **Calories Burned**: Estimated calories burned during the workout

### 2. **Statistics Dashboard**
View real-time statistics at a glance:
- **Total Workouts**: Number of workout sessions logged
- **Minutes Trained**: Total time spent exercising
- **Calories Burned**: Total calories burned across all workouts

### 3. **Workout History**
Browse through all logged workouts with:
- Exercise name and workout date
- Duration and calories information
- Timestamp of when it was logged
- **Edit** button to modify workout details
- **Update Progress** button for tracking improvements
- **Delete** button to remove entries

### 4. **CRUD Operations**
- **Create**: Add new workout entries
- **Read**: View all workouts in history
- **Update**: Edit existing workout entries
- **Delete**: Remove unwanted workout records

### 5. **Form Validation**
- Required field validation
- Minimum/maximum value constraints
- Date validation (cannot select future dates)
- Real-time error messages

### 6. **Responsive Design**
- Mobile-friendly interface
- Tablet and desktop optimized
- Touch-friendly buttons and inputs

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React.js** | UI library for building component-based interface |
| **Axios** | HTTP client for making API requests |
| **CSS3** | Styling with modern gradients and animations |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database for data storage |
| **Mongoose** | MongoDB ODM for schema modeling |
| **CORS** | Enable cross-origin requests |
| **dotenv** | Environment variable management |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14.x or higher) - [Download Here](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download Here](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js) or **yarn** package manager
- A code editor like **VS Code** (recommended)
- A web browser (Chrome, Firefox, Safari, or Edge)

### Check Installation:
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check MongoDB version
mongod --version
```

---

## 🔧 Installation & Setup

### Step 1: Clone the Repository (or navigate to project folder)

```bash
cd fitness-tracker
```

### Step 2: Backend Setup

#### Navigate to backend directory:
```bash
cd backend
```

#### Install backend dependencies:
```bash
npm install
```

This will install:
- express
- mongoose
- cors
- dotenv
- nodemon (dev dependency)

#### Create environment file (optional):
Create a `.env` file in the `backend` directory:
```env
MONGODB_URI=mongodb://localhost:27017/fitnessDB
PORT=5000
```

#### Start MongoDB:
Open a new terminal and start MongoDB:
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
# OR
brew services start mongodb-community
```

#### Start the backend server:
```bash
# Production mode
npm start

# Development mode (with auto-restart)
npm run dev
```

The backend server will run at: **http://localhost:5000**

You should see:
```
✅ Connected to MongoDB successfully
🚀 Server is running on http://localhost:5000
```

---

### Step 3: Frontend Setup

Open a **new terminal window/tab** and navigate to the frontend directory:

```bash
cd frontend
```

#### Install frontend dependencies:
```bash
npm install
```

This will install:
- react
- react-dom
- react-scripts
- axios
- es-abstract

#### Start the React development server:
```bash
npm start
```

The frontend will automatically open in your browser at: **http://localhost:3000**

If it doesn't open automatically, navigate to: http://localhost:3000

---

## 🚀 Running the Application

### Quick Start Commands

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

**Terminal 3 - MongoDB (if not running as service):**
```bash
mongod
```

### Stopping the Application

- **Frontend**: Press `Ctrl + C` in the frontend terminal
- **Backend**: Press `Ctrl + C` in the backend terminal
- **MongoDB**: Press `Ctrl + C` or `sudo systemctl stop mongod`

---

## 📁 Project Structure

```
fitness-tracker/
│
├── backend/                    # Backend application
│   ├── models/
│   │   └── Workout.js         # Mongoose schema for workouts
│   ├── .env.example           # Environment variables template
│   ├── server.js              # Express server and API routes
│   └── package.json           # Backend dependencies
│
├── frontend/                   # Frontend application
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── App.js             # Main React component
│   │   ├── App.css            # Application styling
│   │   └── index.js           # React entry point
│   └── package.json           # Frontend dependencies
│
└── README.md                   # Project documentation
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api/workouts
```

### Endpoints

#### 1. GET - Retrieve All Workouts
```http
GET /api/workouts
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "6789abcd1234567890efgh",
      "exerciseName": "Morning Run",
      "duration": 30,
      "caloriesBurned": 250,
      "workoutDate": "2026-01-06T00:00:00.000Z",
      "createdAt": "2026-01-06T10:30:00.000Z"
    }
  ]
}
```

#### 2. POST - Create New Workout
```http
POST /api/workouts
Content-Type: application/json
```

**Request Body:**
```json
{
  "exerciseName": "Evening Yoga",
  "duration": 45,
  "caloriesBurned": 150,
  "workoutDate": "2026-01-06"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Workout logged successfully",
  "data": {
    "_id": "6789abcd1234567890efgh",
    "exerciseName": "Evening Yoga",
    "duration": 45,
    "caloriesBurned": 150,
    "workoutDate": "2026-01-06T00:00:00.000Z",
    "createdAt": "2026-01-06T18:00:00.000Z"
  }
}
```

#### 3. PUT - Update Workout
```http
PUT /api/workouts/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "exerciseName": "Evening Yoga (Updated)",
  "duration": 60,
  "caloriesBurned": 200,
  "workoutDate": "2026-01-06"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Workout updated successfully",
  "data": { /* updated workout object */ }
}
```

#### 4. DELETE - Delete Workout
```http
DELETE /api/workouts/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Workout deleted successfully",
  "data": { /* deleted workout object */ }
}
```

---

## 🗄️ Database Schema

### Workout Schema (MongoDB)

```javascript
{
  exerciseName: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  caloriesBurned: {
    type: Number,
    required: true,
    min: 0
  },
  workoutDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

### Field Descriptions

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `exerciseName` | String | Yes | Min 2 chars | Name of the exercise |
| `duration` | Number | Yes | Min 1 | Duration in minutes |
| `caloriesBurned` | Number | Yes | Min 0 | Calories burned |
| `workoutDate` | Date | Yes | Valid date | Date of workout |
| `createdAt` | Date | Auto | - | Record creation timestamp |

---

## 🔐 Environment Variables

Create a `.env` file in the **backend** directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/fitnessDB

# Server Port
PORT=5000
```

**Note:** A `.env.example` file is provided in the backend directory as a template.

---

## 📸 Screenshots

### Main Dashboard
- Statistics cards showing total workouts, minutes, and calories
- Workout entry form with all fields
- Complete workout history with action buttons

### Features
- Clean, modern interface
- Purple gradient theme
- Responsive design
- Form validation messages
- Success/error notifications

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. MongoDB Connection Error
**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
- Ensure MongoDB is running: `mongod`
- Check if MongoDB is installed correctly
- Verify connection string in `.env` or `server.js`

#### 2. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find and kill the process using the port
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5000 | xargs kill -9
```

#### 3. Cannot GET /api/workouts
**Error:** Backend not responding

**Solution:**
- Check if backend server is running
- Verify the backend is running on port 5000
- Check the API_URL in `frontend/src/App.js`

#### 4. CORS Error
**Error:** `Access-Control-Allow-Origin`

**Solution:**
- Ensure CORS is enabled in `backend/server.js`
- Verify proxy setting in `frontend/package.json`

#### 5. npm install fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

Built with ❤️ using the MERN stack

---

## 🎯 Future Enhancements

- [ ] User authentication and authorization
- [ ] Personal user profiles
- [ ] Workout goals and targets
- [ ] Progress charts and visualizations
- [ ] Social features (share workouts with friends)
- [ ] Exercise library with instructions and videos
- [ ] Mobile app version (React Native)
- [ ] Export workout data to CSV/PDF
- [ ] Workout reminders and notifications
- [ ] Integration with fitness wearables
- [ ] Meal tracking and nutrition logs
- [ ] AI-powered workout recommendations

---

## 📞 Support

If you encounter any issues or have questions:
- Check the [Troubleshooting](#troubleshooting) section
- Open an issue on GitHub
- Review the API documentation

---

## 🙏 Acknowledgments

- React.js team for the amazing framework
- MongoDB team for the powerful database
- Express.js community
- All open-source contributors

---

**Happy Tracking! Stay Fit! �️‍♂️💪🔥**

---

*Last Updated: January 6, 2026*
