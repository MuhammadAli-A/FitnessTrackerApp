const mongoose = require('mongoose');

// Define Mongoose schema for workout
const workoutSchema = new mongoose.Schema({
  exerciseName: {
    type: String,
    required: [true, 'Exercise name is required'],
    trim: true,
    minlength: [2, 'Exercise name must be at least 2 characters']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 minute']
  },
  caloriesBurned: {
    type: Number,
    required: [true, 'Calories burned is required'],
    min: [0, 'Calories cannot be negative']
  },
  workoutDate: {
    type: Date,
    required: [true, 'Workout date is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Workout model
const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
