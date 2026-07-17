import { useEffect, useState } from 'react';
import { fetchResource } from '../api.js';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource('leaderboard')
      .then(setEntries)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="container py-4">
      <h2>Leaderboard</h2>
      <p className="text-muted">Top users and their scores from the backend.</p>
      {loading && <div>Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan="4">No leaderboard entries available.</td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr key={entry._id || entry.id}>
                    <td>{entry.rank || '—'}</td>
                    <td>{entry.userId?.name || entry.userId || 'Unknown'}</td>
                    <td>{entry.score}</td>
                    <td>{entry.streak}</td>
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
