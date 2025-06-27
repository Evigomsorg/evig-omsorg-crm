import React, { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({username: '', password: ''});
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Mock login
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === 'admin' && loginData.password === 'password') {
      setUser({username: 'admin'});
      fetchCustomers();
    } else {
      alert('Fel användarnamn eller lösenord');
    }
  };

  // Mock customers
  const fetchCustomers = () => {
    setCustomers([
      {id: 1, name: 'Anna Andersson', address: 'Gravvägen 1', phone: '070-1234567', email: 'anna@example.com', service: 'Gravrengöring', notes: 'Behöver plantering', history: []},
      {id: 2, name: 'Björn Berg', address: 'Minneslund 5', phone: '070-7654321', email: 'bjorn@example.com', service: 'Plantering', notes: '', history: []},
    ]);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Select customer
  const selectCustomer = (id) => {
    const cust = customers.find(c => c.id === id);
    setSelectedCustomer(cust);
  };

  return (
    <div className={`app ${theme}`}>
      {!user ? (
        <form onSubmit={handleLogin} className="login-form">
          <h2>Logga in - Evig Omsorg CRM</h2>
          <input placeholder="Användarnamn" value={loginData.username} onChange={e => setLoginData({...loginData, username: e.target.value})} />
          <input type="password" placeholder="Lösenord" value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})} />
          <button type="submit">Logga in</button>
        </form>
      ) : (
        <div>
          <button onClick={() => setUser(null)}>Logga ut</button>
          <button onClick={toggleTheme}>Byt tema ({theme})</button>
          <h1>Kunder</h1>
          <ul>
            {customers.map(c => (
              <li key={c.id} onClick={() => selectCustomer(c.id)} style={{cursor:'pointer'}}>
                {c.name} - {c.service}
              </li>
            ))}
          </ul>
          {selectedCustomer && (
            <div>
              <h2>{selectedCustomer.name}</h2>
              <p>Adress: {selectedCustomer.address}</p>
              <p>Telefon: {selectedCustomer.phone}</p>
              <p>Email: {selectedCustomer.email}</p>
              <p>Tjänst: {selectedCustomer.service}</p>
              <p>Anteckningar: {selectedCustomer.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;