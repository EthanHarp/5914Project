from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
#from backend.Polygon import getTickerDetails, getNewsForTicker, getDailyOpenClose
import json
import os
from backend.sentiment_test import test_sentiment_docked

def get_data(request, ticker):
    #current_directory = os.path.dirname(__file__)

    #try:
     #   ticker_details = getTickerDetails(ticker)
      #  news_for_ticker = getNewsForTicker(ticker)
       # daily_open_close = getDailyOpenClose(ticker)

        #combined_response = {
         #   "ticker_details": ticker_details,
          #  "news_for_ticker": news_for_ticker,
           # "daily_open_close": daily_open_close,
        #}

        #return JsonResponse(combined_response)
    # except Exception as e:
    print("get data", ticker)
    #    return JsonResponse({"error": str(e)}, status=500)
    sample_data = {
            "title": "Here is Why Growth Investors Should Buy Meta Platforms (META) Now",
            "description": "Meta Platforms (META) possesses solid growth attributes, which could help it handily outperform the market.",
            "link": "https://www.zacks.com/stock/news/2184848/here-is-why-growth-investors-should-buy-meta-platforms-meta-now"
        }
    return(JsonResponse(sample_data))

def get_data_old(request, ticker):
    # # Read the JSON file and parse its contents
    # with open('./data/response1.json', 'r') as json_file:
    #     data = json.load(json_file)

        # Get the directory where views.py is located
    current_directory = os.path.dirname(__file__)
    
    # Construct the path to response1.json within your_app
    file_path = os.path.join(current_directory, 'data', 'response1.json')

    try:
        with open(file_path, 'r') as json_file:
            data = json.load(json_file)
    except FileNotFoundError:
        print("File not found")
    except Exception as e:
        # Handle other exceptions (e.g., JSON decoding error)
        print("Exception occurred")

    return JsonResponse(getDailyOpenClose(ticker), safe=False)
    #return HttpResponse(f'The parameter is: {ticker}')


# def getElasticSearch(ticker):
#     API_URL = "https://api.polygon.io/v3/reference/tickers/"+ticker.upper()+"?apiKey="+random.choice(API_KEYS)+""
#     response = requests.get(API_URL).json()
#     if (response["status"] == "NOT_FOUND"):
#         return {}
#     else:
#         return response["results"]

def test_sentiment(request):
    test_sentiment_docked()

# def use_elasticsearch():
#     # http://es01:9200
