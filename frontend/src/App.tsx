import React from 'react'

const App = () => {
  const [ipAddress, setIpAddress] = React.useState('')
  const [result, setResult] = React.useState<string[] | null>(null)
  const [error, setError] = React.useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setResult(null)
    setError('')

    try {
      const res = await fetch(`http://localhost:3000/dns/${ipAddress}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error)
      } else {
        setResult(data.hostnames)
      }
    } catch {
      setError('Failed to connect to server')
    }
  }

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>IP to DNS Lookup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter IP address (e.g. 8.8.8.8)"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          style={{ padding: '10px', width: '70%', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', marginLeft: '8px' }}>
          Lookup
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '8px' }}>
          <strong>DNS Names:</strong>
          <ul>
            {result.map((name, i) => <li key={i}>{name}</li>)}
          </ul>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#ffe0e0', borderRadius: '8px', color: 'red' }}>
          {error}
        </div>
      )}
    </div>
  )
}

export default App
