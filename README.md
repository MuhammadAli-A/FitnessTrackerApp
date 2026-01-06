# Fitness Tracker - MERN Stack Application

A full-stack fitness tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js) that enables users to log their daily workout activities, view their complete workout history, and monitor their fitness progress.


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

