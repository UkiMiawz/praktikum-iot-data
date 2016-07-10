import pyrebase
import time

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
    "fungi_automation/light/": {
        "value": 0,
        "last_update": time.time()
    },
    "fungi_automation/water/": {
        "value": 0,
        "last_update": time.time()
    }
}

db.update(data)