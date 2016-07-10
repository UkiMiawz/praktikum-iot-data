import sys
import time
import RPi.GPIO as GPIO

GPIO.setwarnings(False) 
GPIO.setmode(GPIO.BOARD)
# Pin 11 (GPIO 17) as output
GPIO.setup(11, GPIO.OUT)

msg = sys.argv[1]

if(msg=='on'):
	#LED on
	GPIO.output(11, GPIO.HIGH)
else:
 	#LED off
	GPIO.output(11, GPIO.LOW)
