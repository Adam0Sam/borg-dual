jQuery(document).ready(function() {

jQuery("#platform-submitbtn").css( "display", "none");


    jQuery("#platform-submitbtn").click(function(event) {
        jQuery('input[name=task_time]').val(jQuery("#platform-clock").text());
        jQuery("#platform-clock").css( "display", "none");
        //jQuery("#platform-task-frame").contents().find('form').submit();
        jQuery("#platform-taskform").submit();
    });
    
    jQuery("#platform-nextbtn").click(function(event) {
    
    jQuery('#platform-task-frame').contents().find('.platform_taskcontainer').css( "display", "none");
        window.curtask++;
    //jQuery('#platform-task-frame').contents().find(window.tasklist[window.curtask]).css( "display", "block");
    jQuery('#platform-task-frame').contents().find('#'+window.tasklist[window.curtask]).css( "display", "block");
    
        
      if ((window.tasklist.length-1) == window.curtask) {
jQuery("#platform-nextbtn").css( "display", "none");      
jQuery("#platform-submitbtn").css( "display", "block");      
      };

    });        
}); 

