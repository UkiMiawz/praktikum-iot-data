import pyrebase
import traceback
import app_logging
from settings import *
import automation_light

# subscriber script for light automation

logger = app_logging.get_logger()
log_text = "Stream - "

#handler to handle new input in light automation value
def stream_handler(post):
    try:
        logger.info(log_text + "Change in automation " + post["data"]["name"])
        if post["data"]["name"] == FIREBASE_LIGHT_NAME:
            value = post["data"]["value"]
            #send value to light switch script
            automation_light.turn_on(value)
    except:
        trace = traceback.format_exc()
        logger.error("Unexpected error: %s" % trace)

try:

    #firebase database configuration
    config = {
        "apiKey": FIREBASE_API_KEY,
        "authDomain": FIREBASE_AUTH_DOMAIN,
        "databaseURL": FIREBASE_DATABASE_URL,
        "storageBucket": FIREBASE_STORAGE_BUCKET,
        "serviceAccount": FIREBASE_SERVICE_ACCOUNT,
    }

    firebase = pyrebase.initialize_app(config)
    db = firebase.database()

    #create subscriber and it will run async-ly
    print "Listening to stream"
    my_stream = db.child("fungi_automation").stream(stream_handler, None)

except:
    trace = traceback.format_exc()
    logger.error("Unexpected error: %s" % trace)
    raise