import requests
import random
import json
from datetime import date
from datetime import timedelta
from bs4 import BeautifulSoup
import os

API_KEYS = ["QcM3lMmWYppCbhCPm9n1KLwJGKy3RLb1", "viTVaYWlzaYq9WApiI4xbHKpowbnTTpT", "RVi3LLrhTtCliT_8Tqlm3R1afDMKZXNo", "bMpmXrDdKpyLjRdMxjSeP_JxH8IHPE9j"]

def getTickerDetails(ticker):
    API_URL = "https://api.polygon.io/v3/reference/tickers/"+ticker.upper()+"?apiKey="+random.choice(API_KEYS)+""
    response = requests.get(API_URL).json()
    if (response["status"] == "NOT_FOUND"):
        return {}
    else:
        return response["results"]

def getDailyOpenClose(ticker, date=str(date.today() - timedelta(days = 1))):
    API_URL = "https://api.polygon.io/v1/open-close/"+ticker+"/"+date+"?adjusted=true&apiKey="+random.choice(API_KEYS)+""
    response = requests.get(API_URL).json()
    # return response
    if (response["status"] == "NOT_FOUND"):
        return {}
    else:
        return response
    
def getArticle(article):
    url = article['article_url']
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')
    article_content = ""
    for p in soup.find_all("p"):
        article_content += p.get_text()
    return article_content    

def cleanData():
    for fName in os.listdir('data/'):
        with open("data/"+fName, "r") as file:
            print("Cleaning data for " + fName[0:-4])
            response = json.load(file)
            articles = response['results']
            response.clear()
            for article in articles:
                title = article['title']
                description = article.get('description', '')
                link = article['article_url']
                article_content = getArticle(article)
                article.clear()
                article['title'] = title
                article['description'] = description + " ".join(article_content.split())
                article['link'] = link
            response['articles'] = articles
        json_object = json.dumps(response, indent = 4)
        open("data/"+fName, "w").close()
        with open("data/"+fName, "w") as file:
            file.write(json_object)

def getNewsForTickers():
    TICKERS = ["AAPL", "TSLA", "NVDA", "AMZN", "MSFT", "AMD", "BYND", "META", "GOOGL", "MCD"]

    for ticker in TICKERS:
        print("Getting news for " + ticker)
        API_URL = "https://api.polygon.io/v2/reference/news?ticker="+ticker+"&order=desc&limit=100&apiKey="+random.choice(API_KEYS)+""
        response = requests.get(API_URL).json()
        dumpJSON(response, ticker+".json")

def dumpJSON(response, fName = "sample.json"):
    json_object = json.dumps(response, indent = 4)
    with open("data/"+fName, "w") as outfile:
        outfile.write(json_object)

#getNewsForTickers()
#cleanData()
