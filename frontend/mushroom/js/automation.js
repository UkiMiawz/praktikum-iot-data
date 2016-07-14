var Automation = function () {

    function  initAutomation() { 
        var ref = new Firebase(DATABASE);
        $("#triggerLightBtn").on("click",function(){  
            var automation = ref.child("fungi_automation");
            automation.set({
              light: {
                value: parseInt($("#triggerLightBtn").attr("value") == 1? 0:1 ),
                last_update: moment().unix()
              }, 
            });
        });

        $("#updateParameters").on("click",function(){  
            if(isFormCorrect()){
                var ref = new Firebase(DATABASE);
                var parametesRef = ref.child("fungi_parameters");
                parametesRef.set({
                  temperature: {
                    max: parseInt($("#max_temperature").val()),
                    min: parseInt($("#min_temperature").val()),
                    last_update: moment().unix()
                  }, 
                  humidity: {
                    max: parseInt($("#max_humidity").val()),
                    min: parseInt($("#min_humidity").val()),
                    last_update: moment().unix()
                  }, 
                  lux: {
                    max: parseInt($("#max_lux").val()),
                    min: parseInt($("#min_lux").val()),
                    last_update: moment().unix()
                  }, 
                });
                $("#settings").modal("hide");  
            } 
            
        });
    }

    function isFormCorrect(){
        var error = 0;
        $("#settings").find("input").each(function( index ) {
            var min = parseInt($(this).attr("min"));
            var max = parseInt($(this).attr("max"));
            var val = parseInt($(this).val());
            if(isNaN(val) || val < min || val > max ){
                $(this).addClass("error");
                error++;
            }else{
                $(this).removeClass("error");
            }
        }); 
        return error > 0? false :true;
    } 

    function loadParameters(){ 
        var refParam = new Firebase(FUNGI_PARAMETERS);
        refParam.on("value", function(snapshot, prevChildKey) {  
            MIN_TEMP = snapshot.val().temperature.min;
            MAX_TEMP = snapshot.val().temperature.max; 
            MIN_HUMIDITY = snapshot.val().humidity.min;
            MAX_HUMIDITY = snapshot.val().humidity.max; 
            MIN_LIGHT = snapshot.val().lux.min;
            MAX_LIGHT = snapshot.val().lux.max;

            $("#max_temperature").val(MAX_TEMP);
            $("#min_temperature").val(MIN_TEMP);
            $("#max_humidity").val(MAX_HUMIDITY);
            $("#min_humidity").val(MIN_HUMIDITY);
            $("#max_lux").val(MAX_LIGHT);
            $("#min_lux").val(MIN_LIGHT);
            App.refresh();  
        });  
    }

    return {
        init: function () { 
            initAutomation();
            loadParameters();
        },  
    };

}();