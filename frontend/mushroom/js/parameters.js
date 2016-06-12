var PROJECT_ID = "5742044f07271914d3cbbf93";
var API_KEY = "352bdc4a87f11ece4fc71eeebbbafcae7f48d33e01a123c8f647380f7d51ff2ae810013d8deef886545f049a06ab4bffe492f355baf59c19df52fe00e0ac42f3eb5010516316e10eb4f5f9350f0fccf3c860ee4b1673775925e32b53c6207e81";
var EVENT_COLLECTION = "fungi_dht11";


var RESULT_SIZE = 1;
var KEEN_GET_LASTEST_VALUES= "https://api.keen.io/3.0/projects/"+PROJECT_ID+"/queries/extraction?api_key="+API_KEY+"&event_collection="+EVENT_COLLECTION+"&timezone=UTC&latest="+RESULT_SIZE+"&timeframe=this_1_years&filters=%5B%5D";

var RESULT_SIZE = 10;
var KEEN_GET_LASTEST_VALUES= "https://api.keen.io/3.0/projects/"+PROJECT_ID+"/queries/extraction?api_key="+API_KEY+"&event_collection="+EVENT_COLLECTION+"&timezone=UTC&latest="+RESULT_SIZE+"&timeframe=this_1_years&filters=%5B%5D";
 
 