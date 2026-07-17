import { useEffect, useState } from 'react';
import { fetchResource } from '../api.js';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource('workouts')
      .then(setWorkouts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="container py-4">
      <h2>Workouts</h2>
      <p className="text-muted">Workout plans and difficulty levels from the backend.</p>
      {loading && <div>Loading workouts...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th>Focus</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr>
                  <td colSpan="4">No workouts found.</td>
                </tr>
              ) : (
                workouts.map((workout) => (
                  <tr key={workout._id || workout.id}>
                    <td>{workout.title}</td>
                    <td>{workout.difficulty}</td>
                    <td>{workout.durationMinutes} min</td>
                    <td>{workout.focus || 'General'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
