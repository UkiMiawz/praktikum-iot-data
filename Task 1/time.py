import time
import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BOARD)
# Pin 11 (GPIO 17) as output
GPIO.setup(11, GPIO.OUT)
# infinite loop
while 1:
 # LED off
 GPIO.output(11, GPIO.LOW)
 # wait 1 sec
 time.sleep(1)
 # LED on
 GPIO.output(11, GPIO.HIGH)
 # wait 1 sec
 time.sleep(1)