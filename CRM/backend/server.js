const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const customers = [
  {id: 1, name: 'Anna Andersson', address: 'Gravvägen 1', phone: '070-1234567', email: 'anna@example.com', service: 'Gravrengöring', notes: 'Behöver plantering', history: []},
  {id: 2, name: 'Björn Berg', address: 'Minneslund 5', phone: '070-7654321', email: 'bjorn@example.com', service: 'Plantering', notes: '', history: []},
];

// Mock login endpoint
app.post('/login', (req, res) => {
  const {username, password} = req.body;
  if(username === 'admin' && password === 'password') {
    res.json({success: true});
  } else {
    res.status(401).json({success: false, message: 'Fel användarnamn eller lösenord'});
  }
});

// Get customers
app.get('/customers', (req, res) => {
  res.json(customers);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});