import pyrebase
import time
from settings import *
from datetime import datetime

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
current_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

data = {
    "name": FIREBASE_LIGHT_NAME,
    "value": 1,
    "timestamp": current_timestamp,
    "created_at": current_datetime,
}
db.child(FIREBASE_AUTOMATION_DATA).push(data)