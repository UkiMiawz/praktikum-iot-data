#!/usr/bin/python
spi = spidev.SpiDev()
spi.open(0,0)

GPIO.setmode(GPIO.BOARD)
GPIO.setup(11,GPIO.OUT)
GPIO.setup(13,GPIO.OUT)

while True:
        # get 1 byte from TLC
        fromTLC = spi.xfer2([0x00])
        print fromTLC[0]
        if(fromTLC[0] == 0):
                GPIO.output(11,GPIO.LOW)
                GPIO.output(13,GPIO.LOW)
        elif(fromTLC[0]>191):
                GPIO.output(11,GPIO.HIGH)
                GPIO.output(13,GPIO.LOW)
        else:
                GPIO.output(13,GPIO.HIGH)
                GPIO.output(11,GPIO.LOW)
        time.sleep(1)
