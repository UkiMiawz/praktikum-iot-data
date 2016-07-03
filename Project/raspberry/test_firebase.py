import pyrebase
import time
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
data = {
    "name": "banana",
    "timestamp": time.time(),
    "created_at": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
}
db.child("banana").push(data)