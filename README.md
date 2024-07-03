# Welcome to Musify (Test Project)
### This a music platform where you can listen to your favourite albums and tracks.

# How to run the application
## With docker
* Clone the repository
* Open the File
```bat
cd Musify
```
* If you have docker run:
```bat
docker compose up
```


## With out docker
* Clone the repository
* Open the File
```bat
cd Musify
```
* Run server
```bat
cd server
pip install --no-cache-dir -r requirements.txt 
python api.py
```

* Run client (Node)
```bat
cd client
npm install 
npm run dev
```








