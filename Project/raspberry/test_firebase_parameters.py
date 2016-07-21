import pyrebase
import time
from settings import *
from datetime import datetime

# Script test for automation parameters data push

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
    "client": "test",
    "timestamp": current_timestamp,
    "created_at": current_datetime,
    "param_humidity": {
        "max": 90,
        "min": 60
    },
    "param_lux": {
        "max": 20,
        "min": 600
    },
    "param_temperature": {
        "max": 28,
        "min": 20
    },
}
db.child(FIREBASE_AUTOMATION_DATA).push(data)