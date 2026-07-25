import React from 'react'

const App = () => {
  const [ipAddress, setIpAddress] = React.useState('')

 const  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(ipAddress)
    
  }

  return (
    <div>
      

<form onSubmit={handleSubmit}>
  <input 
    type="text" 
    placeholder="Enter IP address" 
    value={ipAddress}
    onChange={(e) => setIpAddress(e.target.value)}
  />
  <button type="submit">Submit</button>
</form>

    </div>
  )
}

export default App