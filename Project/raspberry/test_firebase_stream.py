import pyrebase
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

def stream_handler(post):
    print "New post coming"
    print(post["event"]) # put
    print(post["path"]) # /-K7yGTTEp7O549EzTYtI
    print(post["data"]) # {'title': 'Pyrebase', "body": "etc..."}

    print post["data"]["name"]
    if post["data"]["name"] == FIREBASE_LIGHT_NAME:
        print "incoming light data"
        print post["data"]["value"]
        print post["data"]["timestamp"]

print "Listening to stream"
my_stream = db.child("fungi_automation").stream(stream_handler, None)