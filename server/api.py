#APi for front end to interact with the server

# Import the required libraries
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse,RedirectResponse
import uvicorn

#Autocomplete functions
from autocomplete.trie_structure import Trie
from autocomplete.trie_functions import get_data,build_trie
from nltk import tokenize
# import nltk
# nltk.download('punkt')


# Initialize the FastAPI app
app = FastAPI()

# Add the CORS middleware to the app to allow cross-origin requests from any domain
#Update when deploying to production or for security reasons
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the data from the JSON file
# Well not decided, if we need a db for this case but we can use the json file for now
# Typically we would use a database

#Default Data Value
data=get_data('data/data.json')
#Default Trie Value
trie=build_trie(data,Trie)


#Lets get those routes
#Default route redirect to docs
#For testing purposes we could remove it in production
@app.get("/")
async def root():
    return RedirectResponse("/docs")

#Get ALL raw data
@app.get("/data")
async def get_raw():
    #Handle if data is not found //data=None

    return JSONResponse(
        status_code=200,
        content={"data": data}
    )

@app.get("/autocomplete/{prefix}")
async def get_autocomplete(prefix:str):
    #Handle if trie is not found
    if trie is None:
        return JSONResponse(
            status_code=500,
            content={"message": "Database not found"}
        )
    prefix=prefix.lower()
    results = trie.autocomplete(prefix)
    sorted_results = sorted(results, key=lambda x: len(x))
    return JSONResponse(
        status_code=200,
        content={"results": sorted_results}
    )

@app.get("/check_input/{prefix}")
async def get_(prefix:str):
    #Handle if trie is not found
    if trie is None:
        return JSONResponse(
            status_code=500,
            content={"message": "Database not found"}
        )
    prefix=prefix.lower()
    results = trie.is_valid(prefix)
    return JSONResponse(
        status_code=200,
        content={"results": results}
    )



# Custom 404 error handler
@app.exception_handler(404)
async def custom_404_handler(*kwargs):
    return JSONResponse(
        status_code=404,
        content={"message": "We dont know what you are looking for, atleast here is a cookie for you!."}
    )


#Lets get this api running
if __name__ == "__main__":
    uvicorn.run('api:app',host="127.0.0.1", port=8000, reload=True)
