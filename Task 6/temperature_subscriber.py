import os, urlparse
import paho.mqtt.client as mqtt

# callback for subscribed messages
def on_subscribe(mosq,userdata,message,qos):
	print("Subscribed: " + str(message))

client = mqtt.Client()

client.on_subscribe = on_subscribe

url_str = os.environ.get('CLOUDMQTT_URL', 'mqtt://localhost:1883')
url = urlparse.urlparse(url_str)
client.connect(url.hostname, url.port)

client.subscribe("groupB/temperature",0)

def on_message(mosq, obj, msg):
    print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))
	
client.on_message = on_message

# loop until  an error occurs
response_code = 0
while response_code == 0:
	response_code = client.loop()
