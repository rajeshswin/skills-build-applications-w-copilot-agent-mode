import { useEffect, useState } from 'react';
import { fetchResource } from '../api.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource('users')
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="container py-4">
      <h2>Users</h2>
      <p className="text-muted">Profiles fetched from the backend API.</p>
      {loading && <div>Loading users...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Fitness Goal</th>
                <th>Experience Level</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4">No users found.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id || user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.fitnessGoal}</td>
                    <td>{user.experienceLevel}</td>
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
