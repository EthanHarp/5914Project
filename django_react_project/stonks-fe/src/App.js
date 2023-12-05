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
import sampleData from "./microsoft.json";

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
  const [theName, setTheName] = useState("");

  function updateNameAndSearch(eTarget) {
    setSearchQuery(eTarget);
    setTheName(eTarget);
  }

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

  // const handleSearch = (event) => {
  //   event.preventDefault();
  //   setLoading(true);

  //   // Simulate API call using the imported sample data instead of making an actual HTTP request
  //   setTimeout(() => {
  //     setLoading(false);
  //     setData(sampleData);
  //     console.log(sampleData);
  //   }, 1000);

  //   setSearchQuery("");
  // };

  let goodStock = data?.avg_score < 0 ? false : true;
  let currentImg = determineImg(goodStock);

  // let articleLink =
  //   data.avg_score >= 0
  //     ? data.most_positive_source.link
  //     : data.most_negative_source.link;

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
            onChange={(e) => updateNameAndSearch(e.target.value)}
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
        <h2>Score:</h2>
        <p>{data?.avg_score}</p>
      </div>
      <div class="Ticker">
        <h2>Ticker:</h2>
        <p>{theName}</p>
      </div>
      <div className="Description">
        <h2>Description</h2>
        {data?.avg_score < 0 ? (
          <>
            <p>{data?.most_negative_source?.title}</p>
            <div className="description-container">
              <p>{data?.most_negative_source?.description}</p>
            </div>
          </>
        ) : (
          <>
            <p>{data?.most_positive_source?.title}</p>
            <div className="description-container">
              <p>{data?.most_positive_source?.description}</p>
            </div>
          </>
        )}
      </div>
      <div class="Prediction">
        Prediction
        {<img src={currentImg} alt="mining" />}
      </div>
      <div class="Articles">
        <h2>Article</h2>
        <div>
          <ul>
            <li>
              {data &&
                (data.avg_score >= 0 ? (
                  <a href={data.most_positive_source?.link}>
                    {data.most_positive_source?.title}
                  </a>
                ) : (
                  <a href={data.most_negative_source?.link}>
                    {data.most_negative_source?.title}
                  </a>
                ))}
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
