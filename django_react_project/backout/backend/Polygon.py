import requests
import random
import json
from datetime import date
from datetime import timedelta

API_KEYS = ["QcM3lMmWYppCbhCPm9n1KLwJGKy3RLb1", "viTVaYWlzaYq9WApiI4xbHKpowbnTTpT", "RVi3LLrhTtCliT_8Tqlm3R1afDMKZXNo", "bMpmXrDdKpyLjRdMxjSeP_JxH8IHPE9j"]

def getTickerDetails(ticker):
    API_URL = "https://api.polygon.io/v3/reference/tickers/"+ticker.upper()+"?apiKey="+random.choice(API_KEYS)+""
    response = requests.get(API_URL).json()
    if (response["status"] == "NOT_FOUND"):
        return {}
    else:
        return response["results"]

# def getDailyOpenClose(ticker, date=str(date.today() - timedelta(days = 1))):
#     API_URL = "https://api.polygon.io/v1/open-close/"+ticker+"/"+date+"?adjusted=true&apiKey="+random.choice(API_KEYS)+""
#     response = requests.get(API_URL).json()
#     return response

# def getNewsForTicker(ticker, order = "desc", limit = "1000"):
#     API_URL = "https://api.polygon.io/v2/reference/news?ticker="+ticker+"&order="+order+"&limit="+limit+"&apiKey="+random.choice(API_KEYS)+""
#     response = requests.get(API_URL).json()
#     dumpJSON(response, ticker+".json")
#     return response

# def getNewsForTickers():
#     TICKERS = ["AAPL", "TSLA", "NVDA", "AMZN", "MSFT", "AMD", "BYND", "META", "GOOGL", "MCD"]

#     for ticker in TICKERS:
#         print("Getting news for " + ticker)
#         API_URL = "https://api.polygon.io/v2/reference/news?ticker="+ticker+"&order=desc&limit=1000&apiKey="+random.choice(API_KEYS)+""
#         response = requests.get(API_URL).json()
#         dumpJSON(response, ticker+".json")

# def dumpJSON(response, fName = "sample.json"):
#     json_object = json.dumps(response, indent = 4)
#     with open("data/"+fName, "w") as outfile:
#         outfile.write(json_object)

# getNewsForTickers()