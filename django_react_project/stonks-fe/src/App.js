import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";
import axios from "axios";
// Images
import giveUp from "./assets/give-up.png";
import keepMining from "./assets/keep-mining.png";
import memeMan from "./assets/Meme Man Outlined HD.png";

function determineImg(goodStock) {
  if (goodStock) {
    return keepMining;
  } else {
    return giveUp;
  }
}

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .get(`http://localhost:8000/api/elastic_sentiment/${searchQuery}`)
      .then((response) => {
        setLoading(false);
        setData(response.data);
        console.log(response);
        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });

    setSearchQuery("");
  };

  let goodStock = true;
  let currentImg = determineImg(goodStock);

  return (
    <div className="fluid-container">
      <div class="Top">
        <img className="App-logo" src={memeMan} alt="Meme Man" />

        <form onSubmit={handleSearch} id="stockForm">
          <Form.Control
            className="Form-control"
            type="text"
            placeholder="Enter stock"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading}
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
            {!isLoading ? "Search" : null}
          </Button>
        </form>

        <div className="data-display">{JSON.stringify(data, null, 2)}</div>
      </div>
      <div class="Name">
        <h2>Name: {data?.ticker_details?.name}</h2>
      </div>
      <div class="Ticker">
        <h2>Ticker: {data?.ticker_details?.ticker}</h2>
      </div>
      <div class="Description">
        <h2>Description</h2>
        <p>{data?.ticker_details?.description}</p>
      </div>
      <div class="Prediction">
        Prediction
        <div>{/* <img src={currentImg} alt="mining" /> */}</div>
      </div>
      <div class="Articles">
        <h2>Articles</h2>
        <div>
          <ul>
            <li>
              <a href="https://www.benzinga.com/news/earnings/23/11/35559421/us-stocks-on-track-for-solid-start-amid-lingering-fed-optimism-traders-eye-earnings-from-market-bel">
                "Green Wave Boosts Stocks, Bonds As Traders Embrace Fed's
                Stance, Await Apple Earnings: What's Driving Markets Thursday?"
              </a>
            </li>
            <li>
              <a href="https://www.benzinga.com/23/11/35567958/apple-earnings-and-jobs-report-ahead-market-mechanics-taking-over">
                "Apple Earnings And Jobs Report Ahead, Market Mechanics Taking
                Over"
              </a>
            </li>
            <li>
              <a href="https://www.benzinga.com/news/earnings/23/11/35565159/apple-gears-up-for-q4-print-these-most-accurate-analysts-revise-forecasts-ahead-of-earnings-call">
                "Apple Gears Up For Q4 Print; These Most Accurate Analysts
                Revise Forecasts Ahead Of Earnings Call"
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="Stock-Data">
        <h2>Stock Data</h2>
        <div>
          <ul>
            <li>
              <b>Open:</b> 171
            </li>
            <li>
              <b>Close:</b> 173.97
            </li>
            <li>
              <b>Volume:</b> 56934906
            </li>
            <li>
              <b>High:</b> 174.23
            </li>
            <li>
              <b>Low:</b> 170.12
            </li>
            <li>
              <b>AfterHours:</b> 174.75
            </li>
            <li>
              <b>PreMarket:</b> 170.6
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
