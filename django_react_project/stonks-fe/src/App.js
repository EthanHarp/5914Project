import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Images
import giveUp from './assets/give-up.png'
import keepMining from './assets/keep-mining.png'
import memeMan from './assets/Meme Man Outlined HD.png'

function determineImg(goodStock) {
  if (goodStock) {
    return keepMining;
  } else {
    return giveUp;
  }
}

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/get_data/')
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = () => {
    axios
      .get(`http://localhost:8000/api/get_data/${searchQuery}`)
      .then((response) => {
        // setData(response.data);
        console.log(response);
        // Handle the response data as needed
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });

    setSearchQuery('');
  };

  let goodStock = true;
  let currentImg = determineImg(goodStock);

  return (
    <div className="container">
      <img className="App-logo" src={memeMan} alt="Meme Man" />
      <h1>Stonks</h1>
      <Form.Control
        className="Form-control"
        type="text"
        placeholder="Enter stock"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        <img src={currentImg} alt="mining" />
      </div>
      <div className="data-display">
        {JSON.stringify(data, null, 2)}
      </div>
    </div>
  );
}

export default App;
