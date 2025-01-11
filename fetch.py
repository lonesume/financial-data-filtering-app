import requests
import os 
from dotenv import load_dotenv
from typing import Union

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request
load_dotenv()

finModelAPIKey= os.environ['FIN_MODEL_PREP_API']

endpointFinModel=f"https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey={finModelAPIKey}"

app = FastAPI()


@app.get("/api/fetch-data")
def handle_data():

    finModelAPIEND= os.environ['FIN_MODEL_PREP_API_ENDPOINT']

    fetch = requests.get(endpointFinModel)
    elements= fetch.json()

    keys = ['date','symbol','revenue','netIncome','grossProfit','eps','operatingIncome']
    statements =[]
    for element in elements :
        data = {}

        
        for key in keys:
            try:
              data[key] = element[key]
              
            except TypeError as e:
                print("This is ",elements)
                print(f"Error accessing element with key '{key}': {e}")
    # Handle the error appropriately, possibly by assigning a default value or logging the issue.

            # data[key] = element[key]

        statements.append(data)
            
    return statements





