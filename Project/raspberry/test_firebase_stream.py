import pyrebase
import time

# Script test for listening to changes in automation

config = {
    "apiKey": "AIzaSyBnL_5ytcAcj6Pgdg2Rtq0ApHyOhNXqiis",
    "authDomain": "fungi-5edf1.firebaseapp.com",
    "databaseURL": "https://fungi-5edf1.firebaseio.com",
    "storageBucket": "fungi-5edf1.appspot.com",
    "serviceAccount": "Fungi-0228318210c6.json",
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

test = "0"

def stream_handler(post):
    global test
    print "New post coming"
    print(post["event"]) # put
    print(post["path"]) # /-K7yGTTEp7O549EzTYtI
    print(post["data"]) # {'title': 'Pyrebase', "body": "etc..."}

    if "name" in post["data"]:
        print "lalala"
    else:
        print "banana"
    test = post["data"]

#get last lux min and max
last_light_automation = db.child("fungi_parameters").order_by_child("timestamp").limit_to_last(1).get()
for last_value in last_light_automation.each():
    print last_value.val()["param_lux"]["max"]
    print last_value.val()["param_lux"]["min"]

print "Listening to stream"
my_stream = db.child("fungi_automation").stream(stream_handler, None)

while True:
    print test
    time.sleep(10)