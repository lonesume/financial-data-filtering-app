import requests
import os 
from dotenv import load_dotenv
from typing import Union

from fastapi import FastAPI
load_dotenv()

finModelAPIKey= os.environ['FIN_MODEL_PREP_API']

endpointFinModel=f"https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey={finModelAPIKey}"




app = FastAPI()


def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}




# print("endpoint value:",endpointFinModel)
@app.get("/")
def handle_data():

    finModelAPIEND= os.environ['FIN_MODEL_PREP_API_ENDPOINT']

    fetch = requests.get(endpointFinModel)
    fetchData= fetch.json()
    keys = ['date','symbol','revenue','netIncome','grossProfit','eps','operatingIncome']
    data = {}
    for key in keys:
        data[key] = fetchData[0][key]
        
    return data



# print("This is:",data)


