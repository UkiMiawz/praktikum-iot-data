var Automation = function () {

    function  initAutomation() { 
        $("#triggerLightBtn").on("click",function(){ 
            var ref = new Firebase(DATABASE);
            var usersRef = ref.child("fungi_automation");
            usersRef.set({
              light: {
                value: parseInt($("#triggerLightBtn").attr("value") == 1? 0:1 ),
                last_update: moment().unix()
              }, 
            });
        });
    } 

    return {
        init: function () { 
            initAutomation();
        },

        
    };

}();