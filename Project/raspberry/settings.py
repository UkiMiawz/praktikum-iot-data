import os

#AWS Settings
MQTT_HOST= os.getenv('CLOUDMQTT_HOST', 'iot.eclipse.org')
MQTT_PORT= os.getenv('CLOUDMQTT_PORT', '1883')

TEST_TOPIC= os.getenv('TEST_TOPIC', 'ukimiawz/test')