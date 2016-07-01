var App = function () {
    var dialTemperature;
    var dialHumidity;
    var dialLight;

    var currentTemperature = 0;
    var currentHumidity =0;
    var currentLight = 0; 

    var previousTemperature = 0;
    var previousHumidity = 0;

    function initWindow(){ 
        
        setTimeout(function(){ 
            updateIsland();
            setDealHeight();
        },100);
       
    	$(".mainLoading").hide();
    	$(".main").removeClass("hidden");
        
    	$( window ).resize(function() { 
            updateIsland();
    	    Charts.updateCharts();
            setTimeout(function(){
                setDealHeight();
            },100); 
    	});

    	$(".charts a").click(function() { 
    	  	$("#modalAnalytics").modal('show');
    	  	$("a[data-name='"+$(this).attr("data-toggle")+"']").click();
    	});

    	$('.date-picker').datepicker({ autoclose: true});

    }

    function setDealHeight(){
        $( ".dial .gauge" ).each(function( index ) {
            if(($(this).parent().height() < $(this).height()) && $(this).parent().height() < 140){ 
                $(this).parent().css({"width": $(this).parent().height()+ $(this).parent().height()/1.6});
            }else{
                $(this).parent().css({"width":"80%"});   
            } 
             $(this).css({"top":(($(".dial").height()-$(this).height())/2)+$(this).height()/22});
        });
    }

    //this is a comment change

	function  creatStatusBarWidget(){
		dialTemperature = new JustGage({
            id: 'dialTemperature', 
            valueFontFamily: "caviar_dreamsregular",
            valueFontColor: "white", 
            labelFontColor: "white",
            gaugeColor: "transparent",
            valueFontSize: "80px",
            titlePosition: "below", 
            value: 0,
            min: 0,
            max: 50,
            startAnimationTime: 400,
            refreshAnimationTime: 400,
            symbol: '°', 
            gaugeWidthScale: 0.3,
            startAnimationTime: 2000,
            startAnimationType: ">",
            refreshAnimationTime: 1000,
            humanFriendly: true,
            relativeGaugeSize: true, 
            color: '#8e8e93',
            customSectors: [{
                  color : "#FFD600",
                  lo : 0,
                  hi : 17
                },{
                  color : "#00ff00",
                  lo : 18,
                  hi : 28
                },{
                  color : "#ff0000",
                  lo : 29,
                  hi : 50
                }],

        });

        dialHumidity = new JustGage({
            id: 'dialHumidity', 
            valueFontFamily: "caviar_dreamsregular",
            valueFontColor: "white", 
            labelFontColor: "white",
            gaugeColor: "transparent",
            titlePosition: "below",
            value: 0,
            min: 0,
            max: 100,
            startAnimationTime: 400,
            refreshAnimationTime: 400,
            symbol: '%', 
            gaugeWidthScale: 0.3,
            startAnimationTime: 2000,
            startAnimationType: ">",
            refreshAnimationTime: 1000,
            humanFriendly: true,
            relativeGaugeSize: true, 
            color: '#8e8e93',
            customSectors: [{
                  color : "#FFD600",
                  lo : 0,
                  hi : 59
                },{
                  color : "#00ff00",
                  lo : 60,
                  hi : 90
                },{
                  color : "#ff0000",
                  lo : 91,
                  hi : 100
                }],
        });
 

        dialLight = new JustGage({
            id: 'dialLight', 
            gaugeColor: "transparent",
            titlePosition: "below",
            valueFontFamily: "caviar_dreamsregular",
            valueFontColor: "white",
            labelFontColor: "white", 
            value: 0,
            min: 0,
            max: 4000, 
            relativeGaugeSize: true, 
            startAnimationTime: 400,
            refreshAnimationTime: 400,
            gaugeWidthScale: 0.3,  
            startAnimationTime: 2000,
            startAnimationType: ">",
            refreshAnimationTime: 1000,
            color: '#8e8e93',
            textRenderer: lightRangeValues,
            humanFriendly: true,
            customSectors: [{
                  color : "#FFD600",
                  lo : 0,
                  hi : 90
                },{
                  color : "#00ff00",
                  lo : 91,
                  hi : 110
                },{
                  color : "#ff0000",
                  lo : 110,
                  hi : 40000
                }],
        });
	}


	function setTemperature(val){  
        currentTemperature = val;
            if(currentTemperature<29){
                imageObj.src = "./images/nebel.png";  
            }else{
                imageObj.src = "./images/hell.png";
            }
		dialTemperature.refresh(currentTemperature); 
        updateChampiState();
	}

	function setLight(val){ 
		currentLight = val;
		dialLight.refresh(currentLight);
		if(currentLight > 110){
			$(".sunshine").css({"opacity": "1.0" });
		}else if(currentLight < 90){
			$(".sunshine").css({"opacity": "0.0" });
		}else{
			$(".sunshine").css({"opacity": "0.3" });
		}
        updateChampiState();
	}

	function setHumidity(val){
        previousHumidity = dialHumidity.config.value; 
		currentHumidity = val;
		dialHumidity.refresh(currentHumidity);  
        if(previousHumidity < currentHumidity ){ 
            if(currentTemperature<29){
                imageObj.src = "./images/nebel.png";
            }else{
                imageObj.src = "./images/hell.png";
            }
           contextGlobalHumidity.clearRect(0, 0, canvasWidth, canvasHeight); 
        } 
        $("#globalMist").css({"opacity": (currentHumidity/100) });  
        $(".mist, .mist, .backCloud, .frontCloud").css({"opacity": (currentHumidity/100) }); 
		updateChampiState();
	}
 

	function updateChampiState(){ 
		if(currentTemperature < 18 ){
			$(".mushrooms").attr("src","images/champiFrozen.svg");
		}else if(currentTemperature > 28 ){
			$(".mushrooms").attr("src","images/champiOnfire.svg"); 
		}else if (currentLight > 100){
			$(".mushrooms").attr("src","images/champiIrritated.svg");
		}else if(currentHumidity < 60 ){
			$(".mushrooms").attr("src","images/champiThirsty.svg");
		}else {
			$(".mushrooms").attr("src","images/champiHappy.svg");
		}
        updateIsland(); 
	}

    // Max intensity measured 4000 lux
    // Mushrooms need around 100 lux in order to grow properly
    function lightRangeValues(val) {
        if (val < 90) {
            return 'Low';
        } else if (val > 110) {
            return 'High';
        } else {
            return 'OK';
        }
    }

    function updateIsland(){
        setTimeout(function(){
            $(".island").css({"top": (($(window).height()/2)-($(".mushrooms").height()/2))});   
        },100);  
    }

    function refreshValues(){ 
            $.ajax({  
                url: KEEN_GET_LASTEST_TEMPERATURE, 
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                crossDomain: true, 
                success: function (data) { 
                    if(data != null){
                        console.log("Temperature: "+data.result[0].temperature);
                        setTemperature(data.result[0].temperature);
                        setLastContactWithServer(data.result[0].keen.timestamp);
                    }  
                },
                error: function(requestObject, error, errorThrown) {
                        console.log(error);
                        console.log(errorThrown);
                }
            }); 

            $.ajax({  
                url: KEEN_GET_LASTEST_HUMIDITY, 
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                crossDomain: true, 
                success: function (data) {
                    if(data != null){
                        console.log("Humidity: "+data.result[0].humidity);
                        setHumidity(data.result[0].humidity);
                        setLastContactWithServer(data.result[0].keen.timestamp);
                    }  
                },
                error: function(requestObject, error, errorThrown) {
                        console.log(error);
                        console.log(errorThrown);
                }
            }); 

            $.ajax({  
                url: KEEN_GET_LASTEST_LUX, 
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                crossDomain: true, 
                success: function (data) {
                    if(data != null){
                        console.log("light: "+data.result[0].lux);
                        setLight(data.result[0].lux);
                        setLastContactWithServer(data.result[0].keen.timestamp);
                    }  
                },
                error: function(requestObject, error, errorThrown) {
                        console.log(error);
                        console.log(errorThrown);
                }
            });  
            setTimeout(function(){
                refreshValues();
            },9000); 
    }


    function setLastContactWithServer(date){
        date = moment.tz(date, TIMEZONE);
        $(".time").html(date.format("hh:mm:ss"));
        $(".date").html(date.format("MMM.DD.YYYY").toUpperCase()); 
    }

    return {
        //main function to initiate the module
        init: function () {
        	initWindow();
        	creatStatusBarWidget();  
        	refreshValues();
        },

        update: function(){
        	refreshValues();
        },
        temperature: function(val){
            setTemperature(val);
        },
        humidity: function(val){
            setHumidity(val);
        },
    };

}();

var Charts = function () {
    var chartTemperature;
    var chartHumidity;
    var chartLight;

    var temperatureData = []; 
    var humidityData = []; 
    var lightData = [];   

    function convertDateToUnix(date){  
        return moment(date).unix();
    }

    function updateLastValueTemperature(){
        $.ajax({  
            url: KEEN_GET_LASTEST_TEMPERATURE, 
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            crossDomain: true, 
            success: function (data) {
                if(data != null){
                    temperatureData.push(data.result[0].temperature);
                    temperature(); 
                    setTimeout(function(){ 
                        updateLastValueTemperature();
                    },60000);
               }  
            },
            error: function(requestObject, error, errorThrown) {
                   console.log(error);
                   console.log(errorThrown);
            }
        }); 
    }

    function updateLastValueHumidity(){
        $.ajax({  
            url: KEEN_GET_LASTEST_HUMIDITY, 
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            crossDomain: true, 
            success: function (data) {
                if(data != null){
                    humidityData.push(data.result[0].humidity);
                    humidity(); 
                    setTimeout(function(){
                        updateLastValueHumidity();
                    },60000);
                   }  
               },
            error: function(requestObject, error, errorThrown) {
                console.log(error);
                console.log(errorThrown);
           }
        }); 
    }

    function updateLastValueLight(){
        $.ajax({  
            url: KEEN_GET_LASTEST_LUX, 
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            crossDomain: true, 
            success: function (data) {
                if(data != null){  
                    lightData.push([convertDateToUnix(data.result[0].keen.timestamp), data.result[0].lux ]);  
                    light(); 
                    setTimeout(function(){
                        updateLastValueLight();
                    },60000);
                                    }  
            },
            error: function(requestObject, error, errorThrown) {
                    console.log(error);
                    console.log(errorThrown);
            }
        }); 
    }  

    function initData(){
       $.ajax({  
            url: KEEN_GET_VALUES_TEMPERATURE, 
            dataType: "json",
            crossDomain: true, 
            success: function (data) {
                if(data != null){
                    $.each(data.result, function(i, item) { 
                        item.keen.timestamp= convertDateToUnix(item.keen.timestamp); 
                        temperatureData.push([item.keen.timestamp, item.temperature]); 
                    });  
                    temperature(); 
                    updateLastValueTemperature(); 
                    $("#tabTemperature .chartLoading").hide();
                }  
            },
            error: function(requestObject, error, errorThrown) {
                    console.log(error);
                    console.log(errorThrown);
            }
        });
        $.ajax({  
            url: KEEN_GET_VALUES_HUMIDITY, 
            dataType: "json",
            crossDomain: true, 
            success: function (data) {
                if(data != null){
                    $.each(data.result, function(i, item) { 
                        item.keen.timestamp= convertDateToUnix(item.keen.timestamp); 
                        humidityData.push([item.keen.timestamp, item.humidity]); 
                    });   
                    humidity(); 
                    updateLastValueHumidity();
                    $("#tabHumidity .chartLoading").hide();
                }  
            },
            error: function(requestObject, error, errorThrown) {
                    console.log(error);
                    console.log(errorThrown);
            }
        });
        $.ajax({  
            url: KEEN_GET_VALUES_LUX, 
            dataType: "json",
            crossDomain: true, 
            success: function (data) {
                if(data != null){
                    $.each(data.result, function(i, item) { 
                        item.keen.timestamp= convertDateToUnix(item.keen.timestamp);  
                        lightData.push([item.keen.timestamp, item.lux]); 
                    });   
                    light(); 
                    updateLastValueLight();
                    $("#tabLight .chartLoading").hide();
                }  
            },
            error: function(requestObject, error, errorThrown) {
                    console.log(error);
                    console.log(errorThrown);
            }
        });
    }

    function  temperature() {  
        var data = [
                 { data: temperatureData, label: "Temperature (°)" }, 
        ];

        var options = {
            lines: { show: true },
            points: { show: true},
            canvas: true,
            colors: ["#E81E03"],
            xaxes: [ { mode: "time" } ],
            yaxes: [ { min: 0 }, {
                position: "right",
                alignTicksWithAxis: 1,
                tickFormatter: function(value, axis) {
                    return value.toFixed(axis.tickDecimals) + "°";
                }
            } ],
            legend: { position: "sw" }
        }  
        chartTemperature = $.plot("#chartTemperature", data, options); 
    }

    function  humidity() { 
        var data = [
                 { data: humidityData, label: "Humidity (%)" }, 
        ];

        var options = {
            lines: { show: true },
            points: { show: true},
            canvas: true,
            colors: ["#007DF9"],
            xaxes: [ { mode: "time" } ],
            yaxes: [ { min: 0 }, {
                position: "right",
                alignTicksWithAxis: 1,
                tickFormatter: function(value, axis) {
                return value.toFixed(axis.tickDecimals) + "%";
            }
         }],
         legend: { position: "sw" }
        } 
        chartHumidity = $.plot("#chartHumidity", data, options);              
    }

    function  light() { 
        var data = [
                 { data: lightData, label: "Light (lx)" }, 
        ]; 

        var options = {
            lines: { show: true },
            points: { show: true}, 
            colors: ["#FFDE1D"],
            xaxes:  [ {
                mode: "time",
                tickSize: [2, "second"],
                tickFormatter: function (v, axis) {  
                    return moment.tz(moment.unix(v),TIMEZONE).format("HH:mm:ss");
                },
            } ],


            yaxes: [ { min: 0 }, {
                position: "right",
                alignTicksWithAxis: 1,
                tickFormatter: function(value, axis) {
                    return value.toFixed(axis.tickDecimals) + "lx";
                }
            }],
            legend: { position: "sw" }
        } 
        chartLight = $.plot("#chartLight", data, options);
        chartLight.setupGrid();
        chartLight.draw();                
    }

    return {
        init: function () {
            initData();
        },

        updateChartTemperature: function () { 
            if(chartTemperature != undefined){
                setTimeout(function(){
                    chartTemperature.resize(); 
                    chartTemperature.setupGrid();
                    chartTemperature.draw();
                },200);   
            }
                
        },
        updateChartHumidity: function () {
            if(chartHumidity != undefined){
                setTimeout(function(){
                   chartHumidity.resize(); 
                   chartHumidity.setupGrid();
                   chartHumidity.draw();
                },200); 
            } 
          
        },
        updateChartLight: function () { 
            if(chartLight != undefined){
                setTimeout(function(){
                    chartLight.resize(); 
                    chartLight.setupGrid();
                    chartLight.draw();
                },200);
            } 
        },

        updateTimeline: function () { 
            
        },

        updateCharts: function(){ 

            Charts.updateChartTemperature();
            Charts.updateChartHumidity();
            Charts.updateChartLight(); 
        }, 
    };

}();

 




 
 