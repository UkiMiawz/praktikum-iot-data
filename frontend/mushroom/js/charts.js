var Charts = function () {
    var chartTemperature;
    var chartHumidity;
    var chartLight;

    var temperatureData = []; 
    var humidityData = []; 
    var lightData = [];    

    function initTemperatureChart(){  
        refTemperatureChart = new Firebase(COLLECTION_TEMPERATURE);
        refTemperatureChart.limitToLast(MAX_CHART_ITEMS).once('value').then(function(snapshot) { 
            $("#tabTemperature .chartLoading").hide();     
            $.each(snapshot.val(), function(i, item) {  
                temperatureData.push([Math.ceil(item.timestamp), item.temperature]);   
                data = [{ data: temperatureData, label: "Temperature (º)" },]; 
                temperature(data);  
            });  
        });  
    }

    function addTemperature(time,val){ 
        if(temperatureData.length <= MAX_CHART_ITEMS){
            temperatureData.shift();
        } 
        temperatureData.push([time,val]);  
        data = [{ data: temperatureData, label: "Temperature (°)" }]; 
        temperature(data); 
    }

    function temperature(data) {  
        var options = {
            lines: { show: true },
            points: { show: true},
            canvas: true,
            colors: ["#E81E03"],
            xaxes:  [ {
                mode: "time",
                tickSize: [2, "second"],
                tickFormatter: function (v, axis) {  
                    return moment.tz(moment.unix(v),TIMEZONE).format("HH:mm");
                },
            } ], 
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
        updateChart("chartTemperature"); 

    } 

     function initHumidityChart(){  
        refHumidityChart = new Firebase(COLLECTION_HUMIDITY);
        refHumidityChart.limitToLast(MAX_CHART_ITEMS).once('value').then(function(snapshot) { 
            $("#tabHumidity .chartLoading").hide();    
            $.each(snapshot.val(), function(i, item) {  
                humidityData.push([Math.ceil(item.timestamp), item.humidity]);   
                data = [{ data: humidityData, label: "Humidity (%)" },]; 
                humidity(data);
            }); 

        });  
    }

    function addHumidity(time,val){ 
        if(humidityData.length <= MAX_CHART_ITEMS){
            humidityData.shift();
        } 
        humidityData.push([time,val]);  
        data = [{ data: humidityData, label: "Humidity (%)" }]; 
        humidity(data);  
    }

    function  humidity() {  
        var options = {
            lines: { show: true },
            points: { show: true},
            canvas: true,
            colors: ["#007DF9"],
            xaxes:  [ {
                mode: "time",
                tickSize: [2, "second"],
                tickFormatter: function (v, axis) {  
                    return moment.tz(moment.unix(v),TIMEZONE).format("HH:mm");
                },
            } ], 
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
        updateChart("chartHumidity");              
    }

    function initLightChart(){  
        refLuxChart = new Firebase(COLLECTION_LUX);
        refLuxChart.limitToLast(MAX_CHART_ITEMS).once('value').then(function(snapshot) { 
            $("#tabLight .chartLoading").hide();    
            $.each(snapshot.val(), function(i, item) {  
                lightData.push([Math.ceil(item.timestamp), item.lux]);   
                data = [{ data: lightData, label: "Light (lx)" },]; 
                light(data);
            }); 

        }); 
    }

    function addLight(time,val){
        if(lightData.length <= MAX_CHART_ITEMS){
            lightData.shift();
        } 
        lightData.push([time,val]);  
        data = [{ data: lightData, label: "Light (°)" }]; 
        light(data);  
    }

    function  light(data) { 
        var options = {
            lines: { show: true },
            points: { show: true}, 
            colors: ["#FFDE1D"],
            xaxes:  [ {
                mode: "time",
                tickSize: [2, "second"],
                tickFormatter: function (v, axis) {  
                    return moment.tz(moment.unix(v),TIMEZONE).format("HH:mm");
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
        updateChart("chartLight");           
    }

    function updateChart(chart){ 
        switch(chart){
            case "chartTemperature": 
                chart = chartTemperature;
                break;
            case "chartHumidity": 
                chart = chartHumidity;
            break;
                case "chartLight": 
                chart = chartLight;
            break;
        }  
        setTimeout(function(){
            if(chart !== undefined){
                chart.resize(); 
                chart.setupGrid();
                chart.draw();
            }
        },200); 
    }

    return {
        init: function () { 
            initTemperatureChart();
            initHumidityChart();
            initLightChart();
        }, 
        addTemperatureValueChart: function(time,val){
            if(temperatureData.length > 0){ 
                addTemperature(time, val);
            }  
        }, 
        addHumidityValueChart: function(time,val){
            if(humidityData.length > 0){ 
                addHumidity(time, val);
            } 
        }, 
        addLightValueChart: function(time,val){  
            if(lightData.length > 0){ 
                addLight(time, val);  
            } 
        }, 
        updateCharts: function(){  
            updateChart("chartTemperature");
            updateChart("chartHumidity");
            updateChart("chartLight");       
        }, 

        updateChart: function(chart){
            updateChart(chart);
        } 
    };

}();

 




 
 