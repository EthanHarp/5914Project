from django.shortcuts import render
from django.http import JsonResponse
import json

def get_data(request):
    # Read the JSON file and parse its contents
    with open('data/response1.json', 'r') as json_file:
        data = json.load(json_file)

    return JsonResponse(data)