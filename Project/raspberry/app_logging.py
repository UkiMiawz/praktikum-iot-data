import os
import logging
import socket
from logging.handlers import SysLogHandler
from settings import *

# script to connect to papertrail for logging purpose

papertrail_port= PAPERTRAIL_PORT
papertrail_host= PAPERTRAIL_HOST

class ContextFilter(logging.Filter):
    #host or system name
    hostname = "raspberrypi-mr-garcia"

    def filter(self, record):
        record.hostname = ContextFilter.hostname
        return True

def get_logger():
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)

    f = ContextFilter()
    logger.addFilter(f)

    syslog = SysLogHandler(address=(papertrail_host, papertrail_port))

    #logging message format
    formatter = logging.Formatter('%(asctime)s raspberrypi-mr-garcia FUNGAPI: %(message)s', datefmt='%b %d %H:%M:%S')

    syslog.setFormatter(formatter)
    logger.addHandler(syslog)

    return logger