var TIMEZONE = "Europe/Berlin";
var DATABASE = "https://fungi-5edf1.firebaseio.com/";
var COLLECTION_TEMPERATURE= DATABASE+"fungi_temperature";
var COLLECTION_HUMIDITY = DATABASE+"fungi_humidity";
var COLLECTION_LUX = DATABASE+"fungi_lux";
var COLLECTION_AUTOMATION = DATABASE+"fungi_automation";
var COLLECTION_AUTOMATION_LIGHT = COLLECTION_AUTOMATION+"/light";
var FUNGI_PARAMETERS = DATABASE+"fungi_parameters";
var MAX_CHART_ITEMS= 20;



//VARIABLES
var MIN_TEMP = 18;
var MAX_TEMP = 28;

var MIN_HUMIDITY = 60;
var MAX_HUMIDITY = 90;

var MIN_LIGHT = 100;
var MAX_LIGHT = 120;
