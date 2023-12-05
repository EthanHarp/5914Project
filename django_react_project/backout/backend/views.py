from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
#from backend.Polygon import getTickerDetails, getNewsForTicker, getDailyOpenClose
from backend.Polygon import getElasticSearchSearch
import json
import os
from elasticsearch import Elasticsearch
# from backend.sentiment_test import test_sentiment_docked
from backend.sentiment import bulk_sentiment_analyze

def get_data(request, ticker):
    current_directory = os.path.dirname(__file__)

    try:
        #ticker_details = getTickerDetails(ticker)
        #news_for_ticker = getNewsForTicker(ticker)
        #daily_open_close = getDailyOpenClose(ticker)

        #combined_response = {
        #    "ticker_details": ticker_details,
        #    "news_for_ticker": news_for_ticker,
        #    "daily_open_close": daily_open_close,
        #}

        return JsonResponse(getElasticSearchSearch())
    except Exception as e:
        #print("get data", ticker)
        return JsonResponse({"error": str(e)}, status=500)
    sample_data = {
            "title": "Here is Why Growth Investors Should Buy Meta Platforms (META) Now",
            "description": "Meta Platforms (META) possesses solid growth attributes, which could help it handily outperform the market.",
            "link": "https://www.zacks.com/stock/news/2184848/here-is-why-growth-investors-should-buy-meta-platforms-meta-now"
        }
    #return(JsonResponse(sample_data))

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

# def test_sentiment(request):
#     test_sentiment_docked()

def elastic_sentiment(request, ticker):
    es = Elasticsearch(['http://es01:9200/'])  # Assuming 'elasticsearch' is the Docker service name

    # Perform a highlighted search query
    body = {
        "query": {
            "match": {"description": ticker}
        },
        "highlight": {
            "fields": {
                "description": {"fragment_size": 250, "number_of_fragments": 50}
            }
        }
    }

    try:
        response = es.search(index='newsgroup', body=body)
        
        # Extract unique highlighted snippets from the response
        unique_highlighted_results = set()
        for hit in response['hits']['hits']:
            highlighted_snippets = hit.get('highlight', {}).get('description', [])
            unique_highlighted_results.update(highlighted_snippets)

        highlighted_results = list(unique_highlighted_results)
        # Now, you can pass the highlighted results to another function
        results = bulk_sentiment_analyze(highlighted_results)
        avg_score = 0
        for r in results:
            if r['label'] == 'positive':
                avg_score += r['score']
            if r['label'] == 'negative':
                avg_score -= r['score']
        # Most Strong Article
        return JsonResponse({"avg_score": avg_score,
                             "highlighted_results": highlighted_results,
                             })
    except Exception as e:
        return JsonResponse({"error": f"Error in Elasticsearch request: {e}"}, status=500)


# def use_elasticsearch():
#     # http://es01:9200
