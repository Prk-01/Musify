#APi for front end to interact with the server

# Import the required libraries
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse,RedirectResponse
import json
import uvicorn


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
data=None

try:
    with open('data/data.json', 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    # I know its a bad practice to use print but i am just trying to see if the file is not found
    # and we will have this file as is uploaded manully for now
    print("Database not found")

#Lets get those routes
#Default route redirect to docs
#For testing purposes we could remove it in production
@app.get("/")
async def root():
    return RedirectResponse("/docs")

#Get ALL raw data
@app.get("/data")
async def get_raw():
    return JSONResponse(
        status_code=200,
        content={"data": data}
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