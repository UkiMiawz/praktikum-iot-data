spi = spidev.SpiDev()
# choose device, CS 0, 1
spi.open(bus,device)
# send bytes , recieve data
response = spi.xfer2([some bytes])
eg :
response = spi.xfer2([0,1,2])