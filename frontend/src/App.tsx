import React from 'react'
import './App.css'

const App = () => {
  const [ipAddress, setIpAddress] = React.useState('')
  const [result, setResult] = React.useState<string[] | null>(null)
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setResult(null)
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`http://localhost:3000/dns?ip=${encodeURIComponent(ipAddress)}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error)
      } else {
        setResult(data.hostnames)
      }
    } catch {
      setError('Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="glow glow-1" />
      <div className="glow glow-2" />

      <div className="card">
        <div className="logo">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>

        <h1>IP → DNS Lookup</h1>
        <p className="subtitle">Resolve any IP address or CIDR range to its DNS hostname</p>

        <form onSubmit={handleSubmit} className="search-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="e.g. 8.8.8.8 or 104.237.160.0/19"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
            <button type="submit" disabled={loading || !ipAddress.trim()}>
              {loading ? (
                <span className="spinner" />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              )}
            </button>
          </div>
        </form>

        {result && (
          <div className="result">
            <div className="result-header">
              <span className="badge success">Found</span>
              <span className="result-ip">{ipAddress}</span>
            </div>
            <ul>
              {result.map((name, i) => (
                <li key={i}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {error && (
          <div className="result error">
            <div className="result-header">
              <span className="badge fail">Error</span>
            </div>
            <p className="error-text">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
