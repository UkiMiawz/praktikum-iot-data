import urlparse
import paho.mqtt.client as mqtt
import Adafruit_DHT
import traceback
import time

from keen.client import KeenClient
from settings import *

mqtt_host = MQTT_HOST
mqtt_port = MQTT_PORT
humidity_topic = HUMIDITY_TOPIC
temperature_topic = TEMPERATURE_TOPIC

keen_project_id = KEEN_PROJECT_ID
keen_write_key = KEEN_WRITE_KEY
keen_read_key = KEEN_READ_KEY
keen_master_key = KEEN_MASTER_KEY

sensor = Adafruit_DHT.DHT11
pin = 4

def on_publish(mosq, obj, mid):
    print("mid: " + str(mid))

try:
    while True:
        #generate data
        humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
        if humidity is not None and temperature is not None:
            print('Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(temperature, humidity))
        else:
            print('Error failed to get reading. Try again!')
            raise

        mosquitto_client = mqtt.Client()
        url = urlparse.urlparse("mqtt://{host}:{port}".format(host=mqtt_host, port=mqtt_port))
        mosquitto_client.connect(url.hostname, url.port)

        mosquitto_client.on_publish = on_publish
        mosquitto_client.publish(humidity_topic, '{{"humidity": {humidity}}}'.format(humidity=humidity,))
        mosquitto_client.publish(temperature_topic, '{{"temperature": {temperature}}}'.format(temperature=temperature,))

        keen_client = KeenClient(
            project_id=keen_project_id,  # your project ID for collecting cycling data
            write_key=keen_write_key,
            read_key=keen_read_key,
            master_key=keen_master_key
        )

        keen_client.add_event("fungi_dht11", {
            "temperature": temperature,
            "humidity": humidity
        })
        time.sleep(10)

except:
    trace = traceback.format_exc()
    print "Unexpected error: %s" % trace
    raise