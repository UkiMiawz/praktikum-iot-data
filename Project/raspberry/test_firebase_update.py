import pyrebase
import time

from datetime import datetime
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
current_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

data = {
    "lux": 40,
    "timestamp": current_timestamp,
    "created_at": current_datetime,
}
db.child(FIREBASE_LUX_DATA).push(data)