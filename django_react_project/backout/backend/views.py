from django.shortcuts import render
from django.http import JsonResponse
import json
import os

def get_data(request):
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

    return JsonResponse(data)