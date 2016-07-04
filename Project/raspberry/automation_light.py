import sys
import time
import RPi.GPIO as GPIO
import app_logging

logger = app_logging.get_logger()

def turn_on(parameter):
	GPIO.setwarnings(False)
	GPIO.setmode(GPIO.BOARD)
	# Pin 11 (GPIO 17) as output
	GPIO.setup(11, GPIO.OUT)
	logger.info("Automation light: checking parameter")

	msg = sys.argv[1]
	if(parameter==1):
		#LED on
		logger.info("Automation light: turning on")
		GPIO.output(11, GPIO.HIGH)
	else:
		#LED off
		logger.info("Automation light: turning off")
		GPIO.output(11, GPIO.LOW)
