import urlparse
import paho.mqtt.client as mqtt
import Adafruit_DHT
import traceback
import time
import app_logging
import tsl2591

from keen.client import KeenClient
from settings import *

mqtt_host = MQTT_HOST
mqtt_port = MQTT_PORT
humidity_topic = HUMIDITY_TOPIC
temperature_topic = TEMPERATURE_TOPIC
lux_topic = LUX_TOPIC

keen_project_id = KEEN_PROJECT_ID
keen_write_key = KEEN_WRITE_KEY
keen_read_key = KEEN_READ_KEY
keen_master_key = KEEN_MASTER_KEY

sensor = Adafruit_DHT.DHT11
pin = 4

logger = app_logging.get_logger()

def on_publish(mosq, obj, mid):
    logger.info("mid: " + str(mid))

try:

    #mqtt client
    mosquitto_client = mqtt.Client()
    url = urlparse.urlparse("mqtt://{host}:{port}".format(host=mqtt_host, port=mqtt_port))
    mosquitto_client.connect(url.hostname, url.port)

    #keen client
    keen_client = KeenClient(
        project_id=keen_project_id,  # your project ID for collecting cycling data
        write_key=keen_write_key,
        read_key=keen_read_key,
        master_key=keen_master_key
    )

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

        #publish to eclipse messaging
        mosquitto_client.on_publish = on_publish
        mosquitto_client.publish(humidity_topic, '{{"humidity": {humidity}}}'.format(humidity=humidity,))
        mosquitto_client.publish(temperature_topic, '{{"temperature": {temperature}}}'.format(temperature=temperature,))
        mosquitto_client.publish(lux_topic, '{{"lux": {0:0.2f}}}'.format(lux))

        #separate events into each topic
        keen_client.add_event(KEEN_HUMIDITY_TOPIC, {
            "humidity": humidity
        })

        keen_client.add_event(KEEN_TEMPERATURE_TOPIC, {
            "temperature": temperature
        })

        keen_client.add_event(KEEN_LUX_TOPIC, {
            "lux": float('{0:0.2f}'.format(lux))
        })

        time.sleep(TIME_INTERVAL)

except:

    trace = traceback.format_exc()
    logger.error("Unexpected error: %s" % trace)
    raise