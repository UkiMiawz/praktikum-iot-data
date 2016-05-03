#!/usr/bin/python
spi = spidev.SpiDev()
spi.open(0,0)

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(11,GPIO.OUT)
GPIO.setup(13,GPIO.OUT)

while True:
        # get 1 byte from TLC
        fromTLC = spi.xfer2([0x00])
        per=(fromTLC[0]/255.00)*100
        print fromTLC[0]," percentage: ","%.2f"%per,"%"
        if(per == 0):
                GPIO.output(11,GPIO.LOW)
                GPIO.output(13,GPIO.LOW)
        elif(per>75):
                GPIO.output(11,GPIO.HIGH)
                GPIO.output(13,GPIO.LOW)
        else:
                GPIO.output(13,GPIO.HIGH)
                GPIO.output(11,GPIO.LOW)
        time.sleep(1)

