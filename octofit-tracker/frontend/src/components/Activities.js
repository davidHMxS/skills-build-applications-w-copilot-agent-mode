import React, {useEffect, useState} from 'react'

const resource = 'activities'

export default function Activities(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const codespace = process.env.REACT_APP_CODESPACE_NAME
    const endpoint = `https://${codespace}-8000.app.github.dev/api/${resource}/`
    console.log('Fetching endpoint:', endpoint)

    fetch(endpoint)
      .then(r=> r.json())
      .then(data => {
        console.log('Fetched data for activities:', data)
        // handle paginated responses with .results
        const payload = data && data.results ? data.results : data
        setItems(Array.isArray(payload) ? payload : [])
      })
      .catch(err=> {
        console.error('Error fetching activities:', err)
        setItems([])
      })
      .finally(()=> setLoading(false))
  },[])

  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="card-title">Activities</h3>
        <div>
          <button className="btn btn-outline-primary" onClick={fetchData}>Refresh</button>
        </div>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>User</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={it.id || idx}>
                  <td>{it.id || idx+1}</td>
                  <td>{it.type || it.activity_type || '-'}</td>
                  <td>{(it.user && it.user.username) || it.user || '-'}</td>
                  <td>{it.duration || it.minutes || '-'}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={()=> onShowDetail && onShowDetail(it)}>Details</button>
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
