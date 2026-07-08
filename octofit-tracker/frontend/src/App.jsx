import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="text-uppercase text-primary fw-semibold">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold">Modern fitness tracking for every team.</h1>
              <p className="lead text-muted mt-3">
                Create profiles, log activities, and keep your crew motivated with a polished multi-tier experience.
              </p>
              <div className="d-flex gap-3 mt-4">
                <a className="btn btn-primary btn-lg" href="https://vite.dev/guide/" target="_blank" rel="noreferrer">
                  Explore the app shell
                </a>
                <a className="btn btn-outline-secondary btn-lg" href="https://react.dev/" target="_blank" rel="noreferrer">
                  Learn React 19
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
