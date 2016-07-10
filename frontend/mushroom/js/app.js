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

    	$(".charts a.openModal").click(function() { 
    	  	$("#modalAnalytics").modal('show');
    	  	$("a[data-name='"+$(this).attr("data-toggle")+"']").click();
    	});

    	$('.date-picker').datepicker({ autoclose: true});

        $('#popover').popover({ 
            html : true,
            placement: "left",
            viewport: $("#popover").parent(),
            trigger: "click",
            title: function() {
              return $("#popover-head").html();
            },
            content: function() {
              return $("#popover-content").html();
            }
        });

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
            max: 200, 
            relativeGaugeSize: true, 
            startAnimationTime: 400,
            refreshAnimationTime: 400,
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
		dialTemperature.refresh(currentTemperature,temperatureRangeValues(currentTemperature)); 
        updateChampiState();
	}

	function setLight(val){ 
		currentLight = Math.floor(val);
		dialLight.refresh(currentLight,lightRangeValues(currentLight));
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
		dialHumidity.refresh(currentHumidity, humityRangeValues(currentHumidity));  
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

    function temperatureRangeValues(val) {
        if (val < 18) {
            return 'Low';
        } else if (val > 28) {
            return 'High';
        } else {
            return 'OK';
        }
    }

     function humityRangeValues(val) {
        if (val < 60) {
            return 'Low';
        } else if (val > 90) {
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
        }, 
        
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


