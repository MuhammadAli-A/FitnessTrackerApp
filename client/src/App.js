import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // State management using React hooks
  const [exerciseName, setExerciseName] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [workoutDate, setWorkoutDate] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [editingId, setEditingId] = useState(null);
  const [stats, setStats] = useState({ totalWorkouts: 0, totalDuration: 0, totalCalories: 0 });


  const API_URL = 'http://localhost:5000/api/workouts';

  
  useEffect(() => {
    fetchWorkouts();
  }, []);

 
  useEffect(() => {
    calculateStats();
  }, [workouts]);

  
  const calculateStats = () => {
    const totalWorkouts = workouts.length;
    const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0);
    const totalCalories = workouts.reduce((sum, workout) => sum + workout.caloriesBurned, 0);
    setStats({ totalWorkouts, totalDuration, totalCalories });
  };

  
  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      
      if (response.data.success) {
        setWorkouts(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching workouts:', error);
      showNotification('Failed to load workouts. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!exerciseName.trim() || !duration || !caloriesBurned || !workoutDate) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    if (exerciseName.trim().length < 2) {
      showNotification('Exercise name must be at least 2 characters', 'error');
      return;
    }

    if (duration < 1) {
      showNotification('Duration must be at least 1 minute', 'error');
      return;
    }

    if (caloriesBurned < 0) {
      showNotification('Calories burned cannot be negative', 'error');
      return;
    }

    try {
      setSubmitting(true);
      
      const workoutData = {
        exerciseName: exerciseName.trim(),
        duration: parseInt(duration),
        caloriesBurned: parseInt(caloriesBurned),
        workoutDate: workoutDate
      };

      if (editingId) {
        // Update existing workout
        const response = await axios.put(`${API_URL}/${editingId}`, workoutData);
        
        if (response.data.success) {
          showNotification('Workout updated successfully!', 'success');
          setEditingId(null);
        }
      } else {
        // Create new workout
        const response = await axios.post(API_URL, workoutData);

        if (response.data.success) {
          showNotification('Workout logged successfully!', 'success');
        }
      }
      
     
      resetForm();
      
    
      fetchWorkouts();
    } catch (error) {
      console.error('Error submitting workout:', error);
      const errorMsg = error.response?.data?.error || 'Failed to save workout. Please try again.';
      showNotification(errorMsg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  
  const resetForm = () => {
    setExerciseName('');
    setDuration('');
    setCaloriesBurned('');
    setWorkoutDate('');
    setEditingId(null);
  };

 
  const handleEdit = (workout) => {
    setExerciseName(workout.exerciseName);
    setDuration(workout.duration.toString());
    setCaloriesBurned(workout.caloriesBurned.toString());
    setWorkoutDate(workout.workoutDate);
    setEditingId(workout._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to delete workout
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this workout?')) {
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      
      if (response.data.success) {
        showNotification('Workout deleted successfully!', 'success');
        fetchWorkouts();
      }
    } catch (error) {
      console.error('Error deleting workout:', error);
      showNotification('Failed to delete workout. Please try again.', 'error');
    }
  };

  // Function to show notification messages
  const showNotification = (msg, type) => {
    setNotification({ message: msg, type });
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Fitness Tracker</h1>
        <p>Track Your Daily Workout Activities and Monitor Your Progress
        </p>
      </div>

      {/* Statistics Dashboard */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-value">{stats.totalWorkouts}</div>
          <div className="stat-label">Total Workouts</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalDuration}</div>
          <div className="stat-label">Minutes Trained</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalCalories}</div>
          <div className="stat-label">Calories Burned</div>
        </div>
      </div>

      <div className="container">
        {/* Workout Form */}
        <section className="workout-form">
          <h2 className="form-title">
            {editingId ? 'Update Workout' : 'Log New Workout'}
          </h2>
          
          {/* Notification Message */}
          {notification.message && (
            <div className={`message ${notification.type}`}>
              {notification.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="exerciseName">Exercise Name: *</label>
                <input
                  type="text"
                  id="exerciseName"
                  value={exerciseName}
                  onChange={(e) => setExerciseName(e.target.value)}
                  placeholder="e.g., Morning Run, Bench Press, Yoga Session"
                  disabled={submitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="workoutDate">Date: *</label>
                <input
                  type="date"
                  id="workoutDate"
                  value={workoutDate}
                  onChange={(e) => setWorkoutDate(e.target.value)}
                  disabled={submitting}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="duration">Duration (minutes): *</label>
                <input
                  type="number"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 30"
                  min="1"
                  disabled={submitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="caloriesBurned">Calories Burned: *</label>
                <input
                  type="number"
                  id="caloriesBurned"
                  value={caloriesBurned}
                  onChange={(e) => setCaloriesBurned(e.target.value)}
                  placeholder="e.g., 250"
                  min="0"
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="button-group">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={submitting}
              >
                {submitting ? 'Saving...' : editingId ? 'Update Workout' : 'Log Workout'}
              </button>
              
              {editingId && (
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={resetForm}
                  disabled={submitting}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Workout History */}
        <section className="workout-list">
          <h2 className="list-title">
            Activity Log
            <span className="workout-count">({workouts.length} Records)</span>
          </h2>

          {loading ? (
            <div className="loading">Loading activity records...</div>
          ) : workouts.length === 0 ? (
            <div className="no-workouts">
              No workout records available. Please add a new workout session using the form above.
            </div>
          ) : (
            workouts.map((workout) => (
              <div key={workout._id} className="workout-item">
                <div className="workout-header">
                  <div className="workout-user">
                    <span className="workout-name">{workout.exerciseName}</span>
                    <span className="workout-type">
                      {new Date(workout.workoutDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <span className="workout-date">
                    {formatDate(workout.createdAt)}
                  </span>
                </div>
                
                <div className="workout-details">
                  <div className="workout-stat">
                    <span>{workout.duration} min</span>
                  </div>
                  <div className="workout-stat">
                    <span>{workout.caloriesBurned} cal</span>
                  </div>
                </div>

                <div className="workout-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(workout)}
                  >
                    Edit
                  </button>
                  <button 
                    className="update-btn"
                    onClick={() => handleEdit(workout)}
                  >
                    Update Progress
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(workout._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
