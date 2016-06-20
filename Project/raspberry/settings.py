import os

#AWS Settings
MQTT_HOST= os.getenv('CLOUDMQTT_HOST', 'iot.eclipse.org')
MQTT_PORT= os.getenv('CLOUDMQTT_PORT', '1883')
TEST_TOPIC= os.getenv('TEST_TOPIC', 'ukimiawz/test')
HUMIDITY_TOPIC= os.getenv('HUMIDITY_TOPIC', 'groupB/humidity')
TEMPERATURE_TOPIC= os.getenv('TEMPERATURE_TOPIC', 'groupB/temperature')
LUX_TOPIC= os.getenv('LUX_TOPIC', 'groupB/lux')

KEEN_PROJECT_ID= os.getenv('KEEN_PROJECT_ID', '5742044f07271914d3cbbf93')
KEEN_WRITE_KEY= os.getenv('KEEN_WRITE_KEY', 'c0b97b6bafa5637e49569cae3a36601e26d1c58dcbcf45ee93614f3676bf8b25620d53d7296c8371be8a1123a997c1cd8338d0c0b75b9ab06357f9b8fb403d21b1c0f5136bbfb7d5714c80b14565f42309b0e00a5af2412649395f00673d44cc')
KEEN_READ_KEY= os.getenv('KEEN_READ_KEY', '352bdc4a87f11ece4fc71eeebbbafcae7f48d33e01a123c8f647380f7d51ff2ae810013d8deef886545f049a06ab4bffe492f355baf59c19df52fe00e0ac42f3eb5010516316e10eb4f5f9350f0fccf3c860ee4b1673775925e32b53c6207e81')
KEEN_MASTER_KEY= os.getenv('KEEN_MASTER_KEY', '2DD188E4FFD58E64D915A96B68C350E481E32197EED068E7BF13B31869790B59')

KEEN_HUMIDITY_TOPIC= os.getenv('KEEN_HUMIDITY_TOPIC', 'fungi_humidity')
KEEN_TEMPERATURE_TOPIC= os.getenv('KEEN_TEMPERATURE_TOPIC', 'fungi_temperature')
KEEN_LUX_TOPIC= os.getenv('KEEN_LUX_TOPIC', 'fungi_lux')

PAPERTRAIL_PORT= os.getenv('PAPERTRAIL_PORT', 24525)
PAPERTRAIL_HOST= os.getenv('PAPERTRAIL_HOST', 'logs4.papertrailapp.com')

TIME_INTERVAL= os.getenv('TIME_INTERVAL', 60)