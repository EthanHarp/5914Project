import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState } from 'react';
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
  const [isLoading, setLoading] = useState(false);


  const handleSearch = () => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/api/get_data/${searchQuery}`)
      .then((response) => {
        setLoading(false);
        setData(response.data);
        console.log(response);
        // Handle the response data as needed
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching search results:', error);
      });

    setSearchQuery('');
  };

  let goodStock = true;
  let currentImg = determineImg(goodStock);

  return (
    <div className="container-fluid">
      <img className="App-logo" src={memeMan} alt="Meme Man" />
      <h1>Stonks</h1>
      <Form.Control
        className="Form-control"
        type="text"
        placeholder="Enter stock"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button
        disabled={isLoading}
        onClick={!isLoading ? handleSearch : null}
      >
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          hidden={!isLoading}
        />
        {!isLoading ? 'Search' : null}
      </Button>
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
