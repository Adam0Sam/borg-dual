jQuery(document).ready(function() {


 /*
    jQuery("#platform-submitbtn").click(function(event) {
        jQuery("#platform-clock").css( "display", "none");
        jQuery("#platform-task-frame").contents().find('form').submit();
        jQuery("#platform-taskform").submit();
    });
    
    jQuery("#platform-nextbtn").click(function(event) {
    window.curtask++;
        jQuery("#platform-task-frame").attr('src', 'http://skdn.com/bebras/tasks/serialtask.php?task='+window.tasklist[window.curtask]);
      if ((window.tasklist.length-1) == window.curtask) {
jQuery("#platform-nextbtn").css( "display", "none");      
jQuery("#platform-submitbtn").css( "display", "block");      
      };

    });
    
   */ 
   
   jQuery('#header-inside').bind('mouseleave', function(event) {
     jQuery(".menudrdwn").hide("fast");
    });
   
   jQuery('#menut1 a').bind('mouseenter', function(event) {
   if (jQuery("#menu1").is(":hidden")) {
     jQuery(".menudrdwn").hide("fast");
     jQuery("#menu1").show("fast");    }
    });  
    
     jQuery('#menu1').bind('mouseleave', function(event) {
     jQuery("#menu1").hide("fast");
    });

    
    jQuery('#menut2 a').bind('mouseenter', function(event) {
    if (jQuery("#menu2").is(":hidden")) {
     jQuery(".menudrdwn").hide("fast");
     jQuery("#menu2").show("fast");      }
    });
    
     jQuery('#menu2').bind('mouseleave', function(event) {
     jQuery("#menu2").hide("fast");
    });

    
    jQuery('#menut3 a').bind('mouseenter', function(event) {
    if (jQuery("#menu3").is(":hidden")) {
     jQuery(".menudrdwn").hide("fast");
     jQuery("#menu3").show("fast");      }
    });
    
         jQuery('#menu3').bind('mouseleave', function(event) {
         
     jQuery("#menu3").hide("fast");
    });

    
    jQuery('#menut4 a').bind('mouseenter', function(event) {
     jQuery(".menudrdwn").hide("fast");
    });    
    
    
    
    
    
    
        
    
    
    
    
    
    
/* 


    jQuery("#menut1 a").hoverIntent( makeTall("#menu1"), makeShort );
    jQuery("#menut2 a").hoverIntent( makeTall("#menu2"), makeShort );
    jQuery("#menut3 a").hoverIntent( makeTall("#menu3"), makeShort );
    jQuery("#menut4 a").hoverIntent( makeTall("#menu4"), makeShort );    
    
    
    
        function makeTall(what){
        jQuery(this).find( what ).fadeIn("fast");
        }
        function makeShort(){
        jQuery(".menudrdwn").hide("fast");
        }
        
        
______________________________        
        
jQuery(document).on('mouseover', "#menut1", function() { 
     jQuery(this).find( ".menudrdwn" ).fadeOut("fast"); 
     jQuery(this).find( "menu1" ).fadeIn("fast");
}).on('mouseout', "#menut1", function() { 
     jQuery(this).find( ".menudrdwn" ).fadeOut("fast"); 
});

    
    jQuery(document).on('mouseover', "#menut2", function() { 
     jQuery(this).find( ".menudrdwn" ).fadeOut("fast"); 
     jQuery(this).find( "menu2" ).fadeIn("fast");
}).on('mouseout', "#menut2", function() { 
     jQuery(this).find( ".menudrdwn" ).fadeOut("fast"); 
});

    
    jQuery(document).on('mouseover', "#menut3", function() { 
     jQuery(this).find( ".menudrdwn" ).fadeOut("fast"); 
     jQuery(this).find( "menu3" ).fadeIn("fast");
}).on('mouseout', "#menut3", function() { 
     jQuery(this).find( ".menudrdwn" ).fadeOut("fast"); 
});

    
    jQuery(document).on('mouseover', "#menut4", function() { 
     jQuery(this).find( ".menudrdwn" ).fadeOut("fast"); 
     jQuery(this).find( "menu4" ).fadeIn("fast");
}).on('mouseout', "#menut4", function() { 
     jQuery(this).find( ".menudrdwn" ).fadeOut("fast"); 
});


______________________________________________________


jQuery('#menut1').bind('mouseenter', function(event) {
     jQuery(".menudrdwn").hide("fast");
     jQuery("#menu1").show("fast");
    });
    
     jQuery('#menu1').bind('mouseleave', function(event) {
     jQuery("#menu1").hide("fast");
    });

    
    jQuery('#menut2').bind('mouseenter', function(event) {
     jQuery(".menudrdwn").hide("fast");
     jQuery("#menu2").show("fast");
    });
    
     jQuery('#menu2').bind('mouseleave', function(event) {
     jQuery("#menu2").hide("fast");
    });

    
    jQuery('#menut3').bind('mouseenter', function(event) {
     jQuery(".menudrdwn").hide("fast");
     jQuery("#menu3").show("fast");
    });
    
         jQuery('#menu3').bind('mouseleave', function(event) {
     jQuery("#menu3").hide("fast");
    });

    
    jQuery('#menut4').bind('mouseenter', function(event) {
     jQuery(".menudrdwn").hide("fast");
    });    
    
    
    __________________________________________________


  jQuery('#menut1').bind('mouseenter', function(event) {
     jQuery(".menudrdwn").stop().hide("slow");
     jQuery("#menu1").stop().show("fast");
    });
    
     jQuery('#menu1').bind('mouseleave', function(event) {
     jQuery("#menu1").stop().hide("slow");
    });

    
    jQuery('#menut2').bind('mouseenter', function(event) {
     jQuery(".menudrdwn").stop().hide("slow");
     jQuery("#menu2").stop().show("fast");
    });
    
     jQuery('#menu2').bind('mouseleave', function(event) {
     jQuery("#menu2").stop().hide("slow");
    });

    
    jQuery('#menut3').bind('mouseenter', function(event) {
     jQuery(".menudrdwn").stop().hide("slow");
     jQuery("#menu3").stop().show("fast");
    });
    
         jQuery('#menu3').bind('mouseleave', function(event) {
     jQuery("#menu3").stop().hide("slow");
    });

    
    jQuery('#menut4').bind('mouseenter', function(event) {
     jQuery(".menudrdwn").stop().hide("slow");
    });  
    
    
    
    __________________________________________________________________












  jQuery('#menut1').bind('mouseenter mouseleave', function(event) {
    switch(event.type) {
        case 'mouseenter':
           // when user enters the div
           jQuery("#menu1").show("fast");
        break;
        case 'mouseleave':
          // leaves
          jQuery("#menu1").hide("slow");
        break;
    }
});*/
    
    
    
    
    
            
}); 

