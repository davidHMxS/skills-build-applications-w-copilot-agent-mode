import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function Home() {
  return <div className="container mt-4"><h1>Octofit Tracker</h1><p>Welcome to Octofit!</p></div>
}

export default function App(){
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Octofit</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  )
}
