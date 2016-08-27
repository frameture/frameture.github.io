    /**
        * Creates and adds nodes that represent the digital clock.
    **/

function start() {
      
    var mainNode = document.createElement("div");
    mainNode.id = "time-date";
    
    if ( ! document.body.contains(mainNode) ) {
        
        var timeNode = document.createElement("div");
        timeNode.id = "time";
        mainNode.appendChild(timeNode);

        var dateNode = document.createElement("div");
        dateNode.id = "date";
        mainNode.appendChild(dateNode);

        document.body.insertBefore(mainNode, document
                            .getElementById("main-content"));
    }
    startTime();
}


    /**
        * Function sets the values of "time" and "date" elements to present 
        * current values. Powered by a Timer with 500 interval.  
    **/

function startTime() {
    
    var today = new Date();
    
    var seconds = checkTime(today.getSeconds(), false),
        minutes = checkTime(today.getMinutes(), false),
        hours = checkTime(today.getHours(), true),
        day = today.getDate(),
        year = today.getFullYear();
    
    var days = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
                
                 "Saturday", "Sunday" ];
    
    var months = [ "January", "February", "March", "April", "May", "June",
                  
                   "July", "August", "September", "October", "November",
                  
                   "December" ];
    
    var weekDay = days[today.getDay()],
        month = months[today.getMonth()];
    
    //getting AM / PM
    var dayState = (today.getHours() < 12) ? "<span>AM</span>" : "<span>PM</span>";
    
    //modifying content of "time" and "date" nodes
    document.getElementById("time")
        .innerHTML = hours + ":" + minutes + ":" + seconds + " " + dayState;
    
    document.getElementById("date")
        .innerHTML = weekDay + ", " + day + " " + month + " " + year;
    
    //firing a timer
    setTimeout(function () { startTime(); }, 500);

}
    /**
       * Function checks whether the specified "time" parameter is 
       * less than 10, if so, function returns String value of "0" + time .
       * If isHourBool boolean value is set to true, the 'time' parameter 
       * is treated as a hour value and returned as  a value from range
       * ' 1 - 12 '.
    **/
    
function checkTime(time, isHourBool) {
    
    if (isHourBool === true) {
        time = (time === 0) ? 12 : time;
        time = (time > 12) ? time - 12 : time;
    }

    if (time < 10) {
        return "0" + time;
    } else {
        return time;
    }

}