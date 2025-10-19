import React, {useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function DetailModal({item, onClose}){
  return (
    <div className={`modal fade ${item ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{background: item ? 'rgba(0,0,0,0.4)' : 'transparent'}}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detail</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <pre style={{whiteSpace:'pre-wrap'}}>{item ? JSON.stringify(item, null, 2) : ''}</pre>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App(){
  const [detail, setDetail] = useState(null)

  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-white border-bottom">
        <div className="container">
          <Link className="navbar-brand" to="/">Octofit</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/activities">Activities</Link>
            <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
            <Link className="nav-link" to="/teams">Teams</Link>
            <Link className="nav-link" to="/users">Users</Link>
            <Link className="nav-link" to="/workouts">Workouts</Link>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={
            <div className="card p-4">
              <h1 className="card-title">Welcome to Octofit Tracker</h1>
              <p className="small-muted">Use the navigation to browse data pulled from the backend API.</p>
            </div>
          } />
          <Route path="/activities" element={<Activities onShowDetail={setDetail} />} />
          <Route path="/leaderboard" element={<Leaderboard onShowDetail={setDetail} />} />
          <Route path="/teams" element={<Teams onShowDetail={setDetail} />} />
          <Route path="/users" element={<Users onShowDetail={setDetail} />} />
          <Route path="/workouts" element={<Workouts onShowDetail={setDetail} />} />
        </Routes>
      </div>

      {detail && <DetailModal item={detail} onClose={() => setDetail(null)} />}
    </Router>
  )
}
