import pyrebase
import time
from settings import *

config = {
    "apiKey": "AIzaSyBnL_5ytcAcj6Pgdg2Rtq0ApHyOhNXqiis",
    "authDomain": "fungi-5edf1.firebaseapp.com",
    "databaseURL": "https://fungi-5edf1.firebaseio.com",
    "storageBucket": "fungi-5edf1.appspot.com",
    "serviceAccount": "Fungi-0228318210c6.json",
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

current_timestamp = time.time()

data = {
    "name": FIREBASE_LIGHT_NAME,
    "value": 1,
    "timestamp": current_timestamp
}
db.child(FIREBASE_AUTOMATION_DATA).push(data)