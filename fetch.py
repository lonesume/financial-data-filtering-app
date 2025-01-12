import json
from fastapi.responses import FileResponse
import requests
import os 
from dotenv import load_dotenv
from typing import Union

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request
load_dotenv(override=True)

finModelAPIKey= os.environ['FIN_MODEL_PREP_API']

endpointFinModel=f"https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey={finModelAPIKey}"

app = FastAPI()
# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/api/fetch-data/")
def handle_data(minRevenue: float = float('-inf'), maxRevenue: float = float('inf')
):

    finModelAPIEND= os.environ['FIN_MODEL_PREP_API_ENDPOINT']

    fetch = requests.get(endpointFinModel)
    elm = open("elements.json","r")
    readingElm = elm.read()
    jsonElm = json.loads(readingElm)
    elm.close()
    
    elements = jsonElm
    
    
    # elements= fetch.json()
    # s = open("elements.json",'w')
    # s.write(str(elements))
    # s.close()


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
        
        
    # minRev = 274_515_000_001
    # maxRev =  391_034_999_999          
    
    filtered_statements = [statement for statement in statements if statement['revenue'] > minRevenue and statement['revenue'] < maxRevenue]
    
    return filtered_statements



app.mount("/assets", StaticFiles(directory="./frontend/dist/assets"), name="static")

# Serve frontend static files and handle client-side routing
@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    if full_path.startswith("api/"):
        raise HTTPException(status_code=404, detail="Not found")
    return FileResponse("./frontend/dist/index.html")
