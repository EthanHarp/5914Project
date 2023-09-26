import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/get_data/')
      .then((response) => {
        console.log(response);
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
      <div>
        {JSON.stringify(data)}
      </div>
    </div>
  );
}

export default App;
