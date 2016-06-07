import os, urlparse
import paho.mqtt.client as mqtt
from settings import *

test_topic = TEST_TOPIC

# callback for subscribed messages
def on_subscribe(mosq,userdata,message,qos):
    print("Subscribed: " + str(message))

client = mqtt.Client()

client.on_subscribe = on_subscribe
url = urlparse.urlparse("mqtt://{host}:{port}".format(host=MQTT_HOST, port=MQTT_PORT))
client.connect(url.hostname, url.port)
client.subscribe(test_topic,0)

def on_message(mosq, obj, msg):
    print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))

client.on_message = on_message

# loop until  an error occurs
response_code = 0
while response_code == 0:
    response_code = client.loop()
