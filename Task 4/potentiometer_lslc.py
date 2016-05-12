#!/usr/bin/python
import spidev
import time
import sys

# create SPI instance, open bus
spi = spidev.SpiDev()
spi.open(0,0)

while True:
	sys.stdout.flush()
	# get 1 byte from TLC
	fromTLC = spi.xfer2([0x00])
	per=(fromTLC[0]/255.00)*100
	volt = per * 3.3/100
	sys.stdout.write("{value: \"%s\" }\n" %volt)
	sys.stdout.flush()
	time.sleep(1)
