import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const codeSpaceNotice = codespaceName
  ? `Using Codespace API host: https://${codespaceName}-8000.app.github.dev`
  : 'VITE_CODESPACE_NAME is not defined; using http://localhost:8000 as fallback.';

function App() {
  return (
    <div>
      <header className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/activities">
                  Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">
                  Leaderboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teams">
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/workouts">
                  Workouts
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main className="container py-4">
        <div className="alert alert-info mb-4">
          {codeSpaceNotice}
          <br />
          Define `VITE_CODESPACE_NAME` in `.env.local` or the Vite environment for Codespaces support.
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <div className="card shadow-sm border-0">
                <div className="card-body p-5">
                  <p className="text-uppercase text-primary fw-semibold">OctoFit Tracker</p>
                  <h1 className="display-5 fw-bold">Modern fitness tracking for every team.</h1>
                  <p className="lead text-muted mt-3">
                    Navigate the dashboard to review users, activities, teams, workouts, and leaderboard data from the backend API.
                  </p>
                  <div className="d-flex gap-3 mt-4 flex-wrap">
                    <NavLink className="btn btn-primary btn-lg" to="/users">
                      View Users
                    </NavLink>
                    <NavLink className="btn btn-outline-secondary btn-lg" to="/activities">
                      View Activities
                    </NavLink>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
