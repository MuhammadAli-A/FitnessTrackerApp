const mongoose = require('mongoose');

// Define Mongoose schema for workout
const workoutSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  workoutType: {
    type: String,
    required: [true, 'Workout type is required'],
    trim: true,
    enum: ['Cardio', 'Strength', 'Yoga', 'Sports', 'CrossFit', 'Swimming', 'Cycling', 'Running', 'Walking', 'Other']
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
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Workout model
const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
