import Adafruit_DHT
import traceback
import time
import app_logging
import tsl2591
import pyrebase

from datetime import datetime
from settings import *

# script to listen to sensors data and send them to firebase
# this script also subscribe to settings value to determine min and max value for the light automation triggers

#determine DHT sensor type and pin number
sensor = Adafruit_DHT.DHT11
pin = 4

logger = app_logging.get_logger()

value = 0

#thresholds for light automation trigger
lux_min = LUX_MIN
lux_max = LUX_MAX

#handles lux parameters data changes from the subscriber
#these parameters are thresholds for light automation trigger
def stream_handler(post):
	global lux_min
	global lux_max
	try:
		logger.info("Incoming change in parameters")
		lux_min = post["data"]["param_lux"]["min"]
		lux_min = post["data"]["param_lux"]["max"]
	except:
		trace = traceback.format_exc()
		logger.error("Unexpected error: %s" % trace)

try:

	#firebase database settings
	config = {
		"apiKey": FIREBASE_API_KEY,
		"authDomain": FIREBASE_AUTH_DOMAIN,
		"databaseURL": FIREBASE_DATABASE_URL,
		"storageBucket": FIREBASE_STORAGE_BUCKET,
		"serviceAccount": FIREBASE_SERVICE_ACCOUNT,
	}

	firebase = pyrebase.initialize_app(config)
	db = firebase.database()

	#get parameters value from firebase
	last_parameters = db.child("fungi_parameters").order_by_child("timestamp").limit_to_last(1).get()
	for last_value in last_parameters.each():
		lux_max = last_value.val()["param_lux"]["max"]
		lux_min = last_value.val()["param_lux"]["min"]

	#create a subscriber for parameters
	print "Listening to stream"
	my_stream = db.child("fungi_parameters").stream(stream_handler, None)

	while True:

		logger.info('Lux Max : ' + str(lux_max))
		logger.info('Lux Min : ' + str(lux_min))

		#generate data from sensors
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

		#count start time
		start_timestamp = time.time()

		#save to firebase database
		#time metadata for the data
		current_timestamp = time.time()
		current_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

		#push humidity data
		data = {
			"humidity": humidity,
			"timestamp": current_timestamp,
			"created_at": current_datetime,
		}
		logger.info("Adding humidity data to firebase")
		logger.info(data)
		db.child(FIREBASE_HUMIDITY_DATA).push(data)

		#push temperature data
		data = {
			"temperature": temperature,
			"timestamp": current_timestamp,
			"created_at": current_datetime,
		}
		logger.info("Adding temperature data to firebase")
		logger.info(data)
		db.child(FIREBASE_TEMPERATURE_DATA).push(data)

		#push lux data
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

		#read through data fetched from firebase
		for last_value in last_light_automation.each():

			last_value = last_value.val()["value"]
			update_value = last_value

			#check if need to turn on light if its turned off before, vice versa
			if last_value == 0:
				if lux < lux_min:
					logger.info("Need to turn on light")
					update_value = 1
			else:
				if lux > lux_max:
					logger.info("Need to turn off light")
					update_value = 0

		logger.info("Last light automation value " + str(last_value))
		logger.info("New light automation value " + str(update_value))

		#only push data to database when the value changes
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

		#sleep before the next sensor read
		time.sleep(TIME_INTERVAL)

except:
	trace = traceback.format_exc()
	logger.error("Unexpected error: %s" % trace)
	raise
