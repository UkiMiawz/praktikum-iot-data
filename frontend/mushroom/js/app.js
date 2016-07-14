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
        },600);
        $(".mainLoading").hide();
        $(".main").removeClass("hidden");
        setDealHeight();  
        
    	$( window ).resize(function() { 
            updateIsland();
    	    Charts.updateCharts();
            setTimeout(function(){
                setDealHeight();
            },100); 
    	});

    	$(".charts a.openModal").click(function() { 
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

	function  creatStatusBarWidget(){
		dialTemperature = new JustGage({
            id: 'dialTemperature', 
            valueFontFamily: "caviar_dreamsregular",
            valueFontColor: "white", 
            labelFontColor: "white",
            gaugeColor: "transparent",
            valueFontSize: "80px",
            titlePosition: "below", 
            value: currentTemperature,
            min: 0,
            max: 50,
            
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
                  hi : MIN_TEMP-1
                },{
                  color : "#00ff00",
                  lo : MIN_TEMP,
                  hi : MAX_TEMP
                },{
                  color : "#ff0000",
                  lo : MAX_TEMP+1,
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
            value: currentHumidity,
            min: 0,
            max: 100,
            
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
                  hi : MIN_HUMIDITY-1
                },{
                  color : "#00ff00",
                  lo : MIN_HUMIDITY,
                  hi : MAX_HUMIDITY
                },{
                  color : "#ff0000",
                  lo : MAX_HUMIDITY+1,
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
            value: currentLight,
            min: 0,
            max: 200, 
            relativeGaugeSize: true, 
            gaugeWidthScale: 0.3,  
            startAnimationTime: 2000,
            startAnimationType: ">",
            refreshAnimationTime: 1000,
            color: '#8e8e93', 
            label: "",
            humanFriendly: true,
            customSectors: [{
                  color : "#FFD600",
                  lo : 0,
                  hi : MIN_LIGHT-1
                },{
                  color : "#00ff00",
                  lo : MIN_LIGHT,
                  hi : MAX_LIGHT
                },{
                  color : "#ff0000",
                  lo : MAX_LIGHT+1,
                  hi : 40000
                }],
        });
	}

	function setTemperature(val){  
        currentTemperature = val; 
            if(currentTemperature<(MAX_TEMP+1)){ 
                imageObj.src = "./images/nebel.png";  
            }else{
                imageObj.src = "./images/hell.png";  
            } 
		dialTemperature.refresh(currentTemperature,temperatureRangeValues(currentTemperature)); 
        updateChampiState();
        
	}

	function setLight(val){ 
		currentLight = Math.floor(val);
		dialLight.refresh(currentLight,lightRangeValues(currentLight));
		if(currentLight > MAX_LIGHT){
			$(".sunshine").css({"opacity": "1.0" });
		}else if(currentLight < MIN_LIGHT){
			$(".sunshine").css({"opacity": "0.0" });
		}else{
			$(".sunshine").css({"opacity": "0.3" });
		}
        updateChampiState();
	}

	function setHumidity(val){
        previousHumidity = dialHumidity.config.value; 
		currentHumidity = val;
		dialHumidity.refresh(currentHumidity, humityRangeValues(currentHumidity));  
        if(previousHumidity < currentHumidity ){ 
            if(currentTemperature<MAX_TEMP+1){
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
		if(currentTemperature < MIN_TEMP-1 ){
			$(".mushrooms").attr("src","images/champiFrozen.svg");
		}else if(currentTemperature > MAX_TEMP){
			$(".mushrooms").attr("src","images/champiOnfire.svg"); 
		}else if (currentLight > MAX_LIGHT){
			$(".mushrooms").attr("src","images/champiIrritated.svg");
		}else if(currentHumidity < MIN_HUMIDITY ){
			$(".mushrooms").attr("src","images/champiThirsty.svg");
		}else {
			$(".mushrooms").attr("src","images/champiHappy.svg");
		}
        updateIsland(); 
	}

    // Max intensity measured 4000 lux
    // Mushrooms need around 100 lux in order to grow properly
    function lightRangeValues(val) {
        var text;
        $(".minLight .progressBar").removeClass("Low").removeClass("High").removeClass("OK");
        $(".minLight .valueContainer").html(val);
        if (val < MIN_LIGHT) {

            text = 'Low';
        } else if (val > MAX_LIGHT) {
            text = 'High';
            val=MAX_LIGHT;
        } else {
            text = 'OK';
        }


        $(".minLight .progressBar").addClass(text);
        $(".minLight .progressBar").css({"width": (val*100/400)+"%"});  
         
        return text;
    }

    function temperatureRangeValues(val) {
        var text;
        $(".minTemp .progressBar").removeClass("Low").removeClass("High").removeClass("OK");
        if (val < MIN_TEMP) {
            text = 'Low';
        } else if (val > MAX_TEMP) {
            text = 'High';
        } else {
            text = 'OK';
        }
        $(".minTemp .progressBar").addClass(text);
        $(".minTemp .progressBar").css({"width": (val*2)+"%"});
        $(".minTemp .valueContainer").html(val+"°");
        
        return text;
    }

     function humityRangeValues(val) {
        var text;
        $(".minHumidity .progressBar").removeClass("Low").removeClass("High").removeClass("OK");
        if (val < MIN_HUMIDITY) {
            text = 'Low';
        } else if (val > MAX_HUMIDITY) {
            text = 'High';
        } else {
            text = 'OK';
        }
        $(".minHumidity .progressBar").addClass(text);
        $(".minHumidity .progressBar").css({"width": (val)+"%"});
        $(".minHumidity .valueContainer").html(val+"%");
        return text;
    }

    function updateIsland(){
        setTimeout(function(){
            if($(window).width()>768){
                $(".island").css({"top": (($(window).height()/2)-($(".mushrooms").height()/2))}); 
            }else{
                $(".island").css({"top": 0});
            }
              
        },100);  
    }

    function readFirebase(){  
            var refTemp = new Firebase(COLLECTION_TEMPERATURE);
            refTemp.limitToLast(1).on("child_added", function(snapshot, prevChildKey) { 
                var time = snapshot.val().timestamp;
                var val = snapshot.val().temperature;
                setTemperature(val);
                setLastContactWithServer(time); 
                Charts.addTemperatureValueChart(time,val);
            }); 

            var refHumidity = new Firebase(COLLECTION_HUMIDITY);
            refHumidity.limitToLast(1).on("child_added", function(snapshot, prevChildKey) {
                var time = snapshot.val().timestamp;
                var val = snapshot.val().humidity; 
                setHumidity(val);
                setLastContactWithServer(time);
                Charts.addHumidityValueChart(time,val); 

            }); 

            var refLux = new Firebase(COLLECTION_LUX);
            refLux.limitToLast(1).on("child_added", function(snapshot, prevChildKey) { 
                var time = snapshot.val().timestamp;
                var val = snapshot.val().lux; 
                setLight(val);
                setLastContactWithServer(time);
                Charts.addLightValueChart(time,val); 
            }); 

            var refAutomation = new Firebase(COLLECTION_AUTOMATION_LIGHT);
            refAutomation.on("value", function(snapshot, prevChildKey) { 
                if(snapshot.val().value == 1){ 
                    $("#triggerLightBtn img").attr("src", "./images/lightOn.svg");
                    $("#triggerLightBtn").parent().addClass("active");
                }else{ 
                    $("#triggerLightBtn img").attr("src", "./images/lightOff.svg");
                    $("#triggerLightBtn").parent().removeClass("active");
                }
                $("#triggerLightBtn").attr("value",snapshot.val().value ); 
            });  
    }


    function setLastContactWithServer(date){
        date = moment.tz(moment.unix(date),TIMEZONE);
        $(".time").html(date.format("hh:mm:ss"));
        $(".date").html(date.format("MMM.DD.YYYY").toUpperCase());  
    }

    return {
        //main function to initiate the module
        init: function () {
        	initWindow();
        	creatStatusBarWidget();  
        	readFirebase();
            Charts.init();
        }, 

        refresh: function(){
            $("#dialTemperature").html("");
            $("#dialHumidity").html("");
            $("#dialLight").html("");
            creatStatusBarWidget();  
            updateChampiState();
           
        } ,
        
        temperature: function(val){
            setTemperature(val);
        },
        humidity: function(val){
            setHumidity(val);
        },
        lux: function(val){
            setLight(val);
        },  
    };
}();


