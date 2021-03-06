import os

#all of the constants needed by the scripts
#read from os environment values if exists

FIREBASE_HUMIDITY_DATA= os.getenv('FIREBASE_HUMIDITY_TOPIC', 'fungi_humidity')
FIREBASE_TEMPERATURE_DATA= os.getenv('FIREBASE_TEMPERATURE_TOPIC', 'fungi_temperature')
FIREBASE_LUX_DATA= os.getenv('FIREBASE_LUX_TOPIC', 'fungi_lux')

FIREBASE_API_KEY= os.getenv('FIREBASE_API_KEY', 'AIzaSyBnL_5ytcAcj6Pgdg2Rtq0ApHyOhNXqiis')
FIREBASE_AUTH_DOMAIN= os.getenv('FIREBASE_AUTH_DOMAIN', 'fungi-5edf1.firebaseapp.com')
FIREBASE_DATABASE_URL= os.getenv('FIREBASE_DATABASE_URL', 'https://fungi-5edf1.firebaseio.com')
FIREBASE_STORAGE_BUCKET= os.getenv('FIREBASE_STORAGE_BUCKET', 'fungi-5edf1.appspot.com')
FIREBASE_SERVICE_ACCOUNT= os.getenv('FIREBASE_SERVICE_ACCOUNT', 'Fungi-0228318210c6.json')

FIREBASE_AUTOMATION_DATA=os.getenv('FIREBASE_AUTOMATION_DATA', 'fungi_automation')
FIREBASE_LIGHT_NAME=os.getenv('FIREBASE_LIGHT_NAME', 'light')

PAPERTRAIL_PORT= os.getenv('PAPERTRAIL_PORT', 24525)
PAPERTRAIL_HOST= os.getenv('PAPERTRAIL_HOST', 'logs4.papertrailapp.com')

TIME_INTERVAL= os.getenv('TIME_INTERVAL', 05)

LUX_MIN=os.getenv('FIREBASE_LUX_MIN', 90)
LUX_MAX=os.getenv('FIREBASE_LUX_MAX', 110)
