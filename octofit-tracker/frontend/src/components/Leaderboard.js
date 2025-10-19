import React, {useEffect, useState, useCallback} from 'react'

const resource = 'leaderboard'

export default function Leaderboard({onShowDetail}){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(()=>{
    setLoading(true)
    const codespace = process.env.REACT_APP_CODESPACE_NAME
    const endpoint = `https://${codespace}-8000.app.github.dev/api/${resource}/`
    console.log('Fetching endpoint:', endpoint)

    fetch(endpoint)
      .then(r=> r.json())
      .then(data => {
        console.log('Fetched data for leaderboard:', data)
        const payload = data && data.results ? data.results : data
        setItems(Array.isArray(payload) ? payload : [])
      })
      .catch(err=> {
        console.error('Error fetching leaderboard:', err)
        setItems([])
      })
      .finally(()=> setLoading(false))
  },[])

  useEffect(()=>{ fetchData() },[fetchData])

  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="card-title">Leaderboard</h3>
        <button className="btn btn-outline-primary" onClick={fetchData}>Refresh</button>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={it.id || idx}>
                  <td>{it.rank || idx+1}</td>
                  <td>{(it.user && it.user.username) || it.user || it.name || '-'}</td>
                  <td>{it.score || it.points || '-'}</td>
                  <td>
                    <button className="btn btn-sm btn-primary" onClick={()=> onShowDetail && onShowDetail(it)}>Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
