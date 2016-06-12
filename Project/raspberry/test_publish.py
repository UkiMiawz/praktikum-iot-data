import urlparse
import paho.mqtt.client as mqtt
import time
import datetime

from keen.client import KeenClient
from settings import *

test_topic = TEST_TOPIC
mqtt_host = MQTT_HOST
mqtt_port = MQTT_PORT

keen_project_id = KEEN_PROJECT_ID
keen_write_key = KEEN_WRITE_KEY
keen_read_key = KEEN_READ_KEY
keen_master_key = KEEN_MASTER_KEY

time_format = '%Y-%m-%d %H:%M:%S'

def on_publish(mosq, obj, mid):
    print("mid: " + str(mid))

timestamp = time.time()
date_time = datetime.datetime.fromtimestamp(timestamp).strftime(time_format)

mosquitto_client = mqtt.Client()
url = urlparse.urlparse("mqtt://{host}:{port}".format(host=mqtt_host, port=mqtt_port))
mosquitto_client.connect(url.hostname, url.port)

mosquitto_client.on_publish = on_publish
mosquitto_client.publish(test_topic, "lalalalala")

keen_client = KeenClient(
    project_id=keen_project_id,  # your project ID for collecting cycling data
    write_key=keen_write_key,
    read_key=keen_read_key,
    master_key=keen_master_key
)

print "============================"
print timestamp
print date_time
print "==========================="

keen_client.add_event("banana", {
    "username": "ukimiawz",
    "message": "potato banana"
})