import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/get_data/') // Replace with your actual API endpoint
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
  }, []);

  return (
    <div className="container">
      <h1>Stonks</h1>
      <Form.Control type="text" placeholder="Enter stock" />
      {/* Render your data in your component */}
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
    
  );
}

export default App;
