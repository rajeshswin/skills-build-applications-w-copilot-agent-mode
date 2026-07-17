import { useEffect, useState } from 'react';
import { fetchResource } from '../api.js';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource('teams')
      .then(setTeams)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="container py-4">
      <h2>Teams</h2>
      <p className="text-muted">Team rosters and sports data fetched from the API.</p>
      {loading && <div>Loading teams...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Team</th>
                <th>Sport</th>
                <th>Members</th>
                <th>Captain</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan="4">No teams found.</td>
                </tr>
              ) : (
                teams.map((team) => (
                  <tr key={team._id || team.id}>
                    <td>{team.name}</td>
                    <td>{team.sport}</td>
                    <td>{team.members}</td>
                    <td>{team.captain || 'TBD'}</td>
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
