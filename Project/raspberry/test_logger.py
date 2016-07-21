import traceback
import app_logging

# Script test for papertrail logger

try:
    logger = app_logging.get_logger()
    logger.info("Test")
    print logger

except:
    trace = traceback.format_exc()
    print "Unexpected error: %s" % trace
    raise