import { useEffect, useState } from 'react';
import { fetchResource } from '../api.js';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource('activities')
      .then(setActivities)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="container py-4">
      <h2>Activities</h2>
      <p className="text-muted">Recent activity logs from the OctoFit Tracker API.</p>
      {loading && <div>Loading activities...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="4">No activities found.</td>
                </tr>
              ) : (
                activities.map((activity) => (
                  <tr key={activity._id || activity.id}>
                    <td>{activity.userId?.name || activity.userId || 'Unknown'}</td>
                    <td>{activity.type}</td>
                    <td>{activity.durationMinutes} min</td>
                    <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleString() : 'N/A'}</td>
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
