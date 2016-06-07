import urlparse
import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish
from settings import *

test_topic = TEST_TOPIC

client = mqtt.Client()
url = urlparse.urlparse("mqtt://{host}:{port}".format(host=MQTT_HOST, port=MQTT_PORT))
client.connect(url.hostname, url.port)

def on_publish(mosq, obj, mid):
    print("mid: " + str(mid))

client.on_publish = on_publish
client.publish(test_topic, "lalalalala")
