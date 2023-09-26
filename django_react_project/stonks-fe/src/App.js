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
    return keepMining
  } else {
    return giveUp
  }
}

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

  // Update this later to change depending on stock status
  let goodStock = true
  let currentImg = determineImg(goodStock)

  return (
    <div className="container">
      <img class="App-logo" src={memeMan} alt="Meme Man" />
      <h1>Stonks</h1>
      <Form.Control type="text" placeholder="Enter stock" />
      <div>
        <img src={currentImg} alt="mining" />
      </div>
      <div>
        {JSON.stringify(data)}
      </div>
    </div>
  );
}

export default App;
