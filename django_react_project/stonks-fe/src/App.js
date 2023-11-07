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


  const handleSearch = () => {
    axios
      .get(`http://localhost:8000/api/get_data/${searchQuery}`)
      .then((response) => {
        setData(response.data);
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
      <div class="Top">
        <img className="App-logo" src={memeMan} alt="Meme Man" />

        <Form.Control
          className="Form-control"
          type="text"
          placeholder="Enter stock"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <div className="data-display">
          {JSON.stringify(data, null, 2)}
        </div>
      </div>
      <div class="Name">
        <h2>Apple</h2>

      </div>
      <div class="Ticker">
        <h2>AAPL</h2>


      </div>
      <div class="Description">
        <h2>Description</h2>
        <p>Apple designs a wide variety of consumer electronic devices, including smartphones (iPhone), tablets (iPad), PCs (Mac), smartwatches (Apple Watch), and AirPods, among others. In addition, Apple offers its customers a variety of services such as Apple Music, iCloud, Apple Care, Apple TV+, Apple Arcade, Apple Fitness, Apple Card, and Apple Pay, among others. Apple's products include internally developed software and semiconductors, and the firm is well known for its integration of hardware, software, semiconductors, and services. Apple's products are distributed online as well as through company-owned stores and third-party retailers.</p>
      </div>
      <div class="Prediction">
        Prediction
        <div>
          {/* <img src={currentImg} alt="mining" /> */}
        </div>
      </div>
      <div class="Articles">
        <h2>Articles</h2>
        <div>
          <ul>
            <li><a href="https://www.benzinga.com/news/earnings/23/11/35559421/us-stocks-on-track-for-solid-start-amid-lingering-fed-optimism-traders-eye-earnings-from-market-bel">"Green Wave Boosts Stocks, Bonds As Traders Embrace Fed's Stance, Await Apple Earnings: What's Driving Markets Thursday?"</a></li>
            <li><a href="https://www.benzinga.com/23/11/35567958/apple-earnings-and-jobs-report-ahead-market-mechanics-taking-over">"Apple Earnings And Jobs Report Ahead, Market Mechanics Taking Over"</a></li>
            <li><a href="https://www.benzinga.com/news/earnings/23/11/35565159/apple-gears-up-for-q4-print-these-most-accurate-analysts-revise-forecasts-ahead-of-earnings-call">"Apple Gears Up For Q4 Print; These Most Accurate Analysts Revise Forecasts Ahead Of Earnings Call"</a></li>
          </ul>
        </div>
      </div>
      <div class="Stock-Data">
      <h2>Stock Data</h2>
        <div>
          <ul>
            <li><b>Open:</b> 171</li>
            <li><b>Close:</b> 173.97</li>
            <li><b>Volume:</b> 56934906</li>
            <li><b>High:</b> 174.23</li>
            <li><b>Low:</b> 170.12</li>
            <li><b>AfterHours:</b> 174.75</li>
            <li><b>PreMarket:</b> 170.6</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
