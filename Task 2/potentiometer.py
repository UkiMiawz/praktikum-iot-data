#!/usr/bin/python
import spidev
import time
# create SPI instance, open bus
spi = spidev.SpiDev()
spi.open(0,0)
while True:
	# get 1 byte from TLC
	fromTLC = spi.xfer2([0x00])
	print fromTLC[0]
	time.sleep(0.5)