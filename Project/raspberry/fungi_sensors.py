import urlparse
import paho.mqtt.client as mqtt
import Adafruit_DHT
import traceback
import time
import app_logging
import tsl2591
import pyrebase

from datetime import datetime
from settings import *

sensor = Adafruit_DHT.DHT11
pin = 4

logger = app_logging.get_logger()

value = 0

def on_publish(mosq, obj, mid):
	logger.info("mid: " + str(mid))

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

	while True:

		#generate data
		humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
		tsl = tsl2591.Tsl2591()
		full, ir = tsl.get_full_luminosity() # read raw values (full spectrum and ir spectrum)
		lux = tsl.calculate_lux(full, ir) # convert raw values to lux

		if humidity is not None and temperature is not None:
			logger.info('Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(temperature, humidity))
		else:
			logger.error('Error failed to get reading from DHT11 sensor. Try again!')
			raise

		if lux is not None:
			logger.info('Lux={0:0.1f}lux'.format(lux))
		else:
			logger.error('Error failed to get reading from TSL2591 sensor. Try again!')
			raise

		#count timer
		start_timestamp = time.time()

		#save to firebase database
		current_timestamp = time.time()
		current_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

		data = {
			"humidity": humidity,
			"timestamp": current_timestamp,
			"created_at": current_datetime,
		}
		logger.info("Adding humidity data to firebase")
		logger.info(data)
		db.child(FIREBASE_HUMIDITY_DATA).push(data)

		data = {
			"temperature": temperature,
			"timestamp": current_timestamp,
			"created_at": current_datetime,
		}
		logger.info("Adding temperature data to firebase")
		logger.info(data)
		db.child(FIREBASE_TEMPERATURE_DATA).push(data)

		data = {
			"lux": lux,
			"timestamp": current_timestamp,
			"created_at": current_datetime,
		}
		logger.info("Adding lux data to firebase")
		logger.info(data)
		db.child(FIREBASE_LUX_DATA).push(data)

		#check last light automation value
		last_light_automation = db.child("fungi_automation").order_by_child("name").equal_to("light").limit_to_last(1).get()

		update_value = 0
		last_value = 0

		for last_value in last_light_automation.each():
			last_value = last_value.val()
			if last_value == 0:
				if lux < LUX_MIN:
					logger.info("Need to turn on light")
					update_value = 1
			else:
				if lux > LUX_MAX:
					logger.info("Need to turn off light")
					update_value = 0

		logger.info("Last light automation value " + str(last_value))
		logger.info("New light automation value " + str(update_value))

		#only update when the value changes
		if(last_value != update_value):
			data = {
				"name": FIREBASE_LIGHT_NAME,
				"value": update_value,
				"timestamp": current_timestamp,
				"created_at": current_datetime,
			}
			db.child(FIREBASE_AUTOMATION_DATA).push(data)

		#count time needed to save to database
		end_timestamp = time.time()
		logger.info("Miliseconds span : " + str(end_timestamp - start_timestamp))


		time.sleep(TIME_INTERVAL)

except:

	trace = traceback.format_exc()
	logger.error("Unexpected error: %s" % trace)
	raise
