    /**
    *  Function adds menu event handlers
    **/

function menuAddHandler(){
    $("#menu-close").click( function(){
        
        $("#sub-menu").animate({
            left: "-14em"
        }, 200);
        
        $("#menu-main").animate({
            left: "-10em"
        }, 200);

        $("#menu-open").animate({
            opacity: "1"
        }, 100);
        
    });
    
    $("#menu-open").click( function(){
        $("#menu-main").animate({
            left: "0"
       }, 200); 
        
        $(this).animate({
            opacity: ".5"
        }, 100);
    });
    
    $("#menu-main").find("li").click(function(){
        var $panel = $("#sub-menu");
        $panel.find("p").html( $(this).html() );
        $panel.find("#sub-menu-content").html(getListItemText($(this)));
        
        $("#sub-menu").animate({
            left: "6.9em"
        }, 200);
        
    });
    
    $("#sub-menu-close").click(function(){
        $("#sub-menu").animate({
            left: "-14em"
        });
    });
}


    /**
        * Getting String-content that will be returned to the calling object.  
    **/
function getListItemText($listItem){
    
    switch($listItem.html()){
        case "About":
            return "This is 'about me' webpage representing my skills in Web Development";
            break;
            
        case "Help":
            return "If you got here by accident, go <a href='http://google.com'>here</a>";
            break;
            
        case "Contact":
            return "If you feel like you want to contact, feel free to get in touch. email: <strong>frameture@gmail.com</strong>";
            break;
            
        case "Content": 
            return "Structure defined in HTML, style given with CSS, digital clock powered by JavaScript and menu tab            written in jQuery / JavaScript";
            break;
            
        default: return "An error occured in the event-handling method. Sorry.";
    }
}
