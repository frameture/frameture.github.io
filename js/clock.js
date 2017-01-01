/**
 * Clock module.
 */
function Clock() {
  /**
   * main() method provides the interface for creating the time-date node.
   */
  this.main = function() {
    if (!document.querySelector("#time-date"))
      createClock(); // if there is not clock, create one
    startTime(); // update the clock and
    setInterval(function() { startTime(); }, 1000); // updating the clock
  }

  /**
   * Function creates new DOM elements representing the digital clock.
   */
  function createClock() {
    var timeDateNode = createDOMElement("div", "time-date");
    timeDateNode.appendChild(createDOMElement("div", "time"));
    timeDateNode.appendChild(createDOMElement("div", "date"));
    document.body.insertBefore(timeDateNode, document.querySelector(".main-content"));
  }

  function createDOMElement(tag, id) {
    var node = document.createElement(tag);
    node.id = id;
    return node;
  }

  /**
  * Function sets the values of "time" and "date" elements to present
  * current values. Powered by a Timer.
  */
  function startTime() {
    var today = new Date();
    var seconds = zeroPaddedTime(today.getSeconds(), false),
        minutes = zeroPaddedTime(today.getMinutes(), false),
        hours =   zeroPaddedTime(today.getHours(), true),
        day =  today.getDate(),
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
  }

  /**
  * Function checks whether the specified "time" parameter is
  * less than 10, if so, function returns zero padded time (e.g. "07").
  * If isHourBool boolean value is true, the 'time' parameter
  * is treated as a hour value and returned as a value from range
  * ' 1 - 12 '.
  */
  function zeroPaddedTime(time, isHourBool) {
    if (isHourBool === true) {
      time = (time === 0) ? 12 : time;
      time = (time > 12) ? time - 12 : time;
    }
    return time < 10 ? "0" + time : time;
  }
}
