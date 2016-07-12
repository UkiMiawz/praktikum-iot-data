import pyrebase
import traceback
import app_logging
from settings import *
import automation_light

logger = app_logging.get_logger()
log_text = "Stream - "

def stream_handler(post):
    logger.info(log_text + "Change in automation " + post["data"]["name"])
    if post["data"]["name"] == FIREBASE_LIGHT_NAME:
        value = post["data"]["value"]
        automation_light.turn_on(value)

try:

    #firebase database
    config = {
        "apiKey": FIREBASE_API_KEY,
        "authDomain": FIREBASE_AUTH_DOMAIN,
        "databaseURL": FIREBASE_DATABASE_URL,
        "storageBucket": FIREBASE_STORAGE_BUCKET,
        "serviceAccount": FIREBASE_SERVICE_ACCOUNT,
    }

    firebase = pyrebase.initialize_app(config)
    db = firebase.database()

    print "Listening to stream"
    my_stream = db.child("fungi_automation").stream(stream_handler, None)

except:

    trace = traceback.format_exc()
    logger.error("Unexpected error: %s" % trace)
    raise