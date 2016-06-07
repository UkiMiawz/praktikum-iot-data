import os
import logging
import socket
from logging.handlers import SysLogHandler
from settings import *

papertrail_port= PAPERTRAIL_PORT
papertrail_host= PAPERTRAIL_HOST

class ContextFilter(logging.Filter):
    hostname = socket.gethostname()

    def filter(self, record):
        record.hostname = ContextFilter.hostname
        return True

def get_logger():
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)

    f = ContextFilter()
    logger.addFilter(f)

    syslog = SysLogHandler(address=(papertrail_host, papertrail_port))
    formatter = logging.Formatter('%(asctime)s %(hostname)s FUNGAPI: %(message)s', datefmt='%b %d %H:%M:%S')

    syslog.setFormatter(formatter)
    logger.addHandler(syslog)

    return logger