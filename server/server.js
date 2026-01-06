const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Workout = require('./models/Workout');

// Initialize Express app
const app = express();


app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fitnessDB';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  });


app.get('/', (req, res) => {
  res.json({ message: 'Fitness Tracker API is running!' });
});

app.post('/api/workouts', async (req, res) => {
  try {
    const { exerciseName, duration, caloriesBurned, workoutDate } = req.body;

    // Validation
    if (!exerciseName || !duration || caloriesBurned === undefined || !workoutDate) {
      return res.status(400).json({ 
        success: false, 
        error: 'Exercise name, duration, calories burned, and workout date are required' 
      });
    }

    const newWorkout = new Workout({
      exerciseName,
      duration,
      caloriesBurned,
      workoutDate
    });

    // Save to MongoDB
    const savedWorkout = await newWorkout.save();

    res.status(201).json({
      success: true,
      message: 'Workout logged successfully',
      data: savedWorkout
    });

  } catch (error) {
    console.error('Error saving workout:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to log workout'
    });
  }
});

// GET route - Retrieve all workouts
app.get('/api/workouts', async (req, res) => {
  try {
    
    const workouts = await Workout.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: workouts.length,
      data: workouts
    });

  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch workouts'
    });
  }
});

// PUT route - Update workout progress
app.put('/api/workouts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { exerciseName, duration, caloriesBurned, workoutDate } = req.body;

    // Find and update the workout
    const updatedWorkout = await Workout.findByIdAndUpdate(
      id,
      { exerciseName, duration, caloriesBurned, workoutDate },
      { new: true, runValidators: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({
        success: false,
        error: 'Workout not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Workout updated successfully',
      data: updatedWorkout
    });

  } catch (error) {
    console.error('Error updating workout:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update workout'
    });
  }
});

// DELETE route - Delete workout
app.delete('/api/workouts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedWorkout = await Workout.findByIdAndDelete(id);

    if (!deletedWorkout) {
      return res.status(404).json({
        success: false,
        error: 'Workout not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Workout deleted successfully',
      data: deletedWorkout
    });

  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete workout'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
