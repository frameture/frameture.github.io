'use strict';

 function ProgrammingLog() {
   var CONTENT = [
     "I have gone through the " + 
     "'Creative, Serious and Playful Science of Android Apps' course by " + 
     "University of Illinois. It was measurably difficult to fathom the " + 
     "concepts of Android app development without prior programming and " + 
     "Java knowledge.",
     
     "As I got some programming skills, I have learnt some <a href=" +
     "'https://docs.mql4.com/' target='_blank'>MQL4 language</a> and let my " + 
     "computer help me, and test my trading strategies automatically. I have" +
     " been writing trading robots only in procedural programming, which " + 
     "helped me to set my mindset into 'step-by-step' mode.",
     
     "Unraveling period. Thorough, assiduous and complete study of <a href=" +
     "'http://math.hws.edu/javanotes/index.html' target='_blank'>Introduction" + 
     " to Programming Using Java</a> textbook. It has been intense and fruitful" + 
     " time working with this book. This masterpiece explained me previously " + 
     "vague aspects and gave me solid foundation and understanding of programming.", 
     
     "Having gained ample programming and Java skills. I went through <a href=" +
     "'https://www.coursera.org/learn/android-programming' target='_blank'>" + 
     "Programming Mobile Applications for Android Handheld Systems: Part 1 " +
     "</a> and <a href='https://www.coursera.org/learn/android-programming-2'" + "target='_blank'>Part 2</a> courses by University of Maryland. In order " +
     "to supplement my knowledge I took also <a href=" +
     "'https://www.udacity.com/course/android-development-for-beginners--ud837'" +
     "target='_blank'>Android Development for Beginners</a> course and Android Basics:" + 
     "<a href='https://www.udacity.com/course/android-basics-multi-screen-apps--ud839'" +
     "target='_blank'>Multi-Screen Apps</a> and <a href=" +
     "'https://www.udacity.com/course/android-basics-networking--ud843' " +
     "target='_blank'>Networking</a> by Udacity & Google.",
     
     "While previous Java studying, the textbook included many exercises " +
     "which I have solved that time. Nonetheless, to solidify the knowledge " +
     "I have gone again through all exercises. I have refactored all of them " + 
     "to different extent. Refactored solutions to the exercises are uploaded on my " +
     "<a href='https://github.com/frameture/introduction-to-programming-using-java'" +
     "target='_blank'>repository</a>.",
     
     "Knowing HTML and CSS is a must in web development. I tried different " +
     "resources including: <a href='https://www.codeschool.com/' target='_blank'>" +
     "Code School</a>, <a href='http://www.w3schools.com/' target='_blank'>" +
     "w3schoools</a> and <a href='https://www.codecademy.com/' target='_blank'>" +
     "Codecademy</a>.",
     
     "To add responsiveness to the web - we have to know JavaScript. I have " +
     "studied <a href='http://eloquentjavascript.net/' target='_blank'>" +
     "Eloquent JavaScript</a> by Marijn Haverbeke. It was quite strange " +
     "experience learning JavaScript (untyped, interpreted and functional " +
     "language) while having background in Java (strongly typed, compiled and " +
     "object-oriented language). To better understand the language I have " +
     "been solving JavaScript coding challenges on <a href=" +
     "'https://www.codewars.com/users/frameture' target='_blank'>Code Wars</a>."
   ];
   
  ProgrammingLog.prototype.main = function() {
    var axis = new Axis();
    axis.addLog("First Jump Into Programming", CONTENT[0] , new Date(2015,7), 
                new Date(2015, 9));
    axis.addLog("Automated Trading", CONTENT[1], new Date(2015, 9), 
                new Date(2015, 11));
    axis.addLog("Java", CONTENT[2], new Date(2015, 11), new Date(2016, 5));
    axis.addLog("Android", CONTENT[3], new Date(2016, 5), new Date(2016, 8));
    axis.addLog("Repetition - Way For Sustainable Knowledge", CONTENT[4], 
                new Date(2016, 8), new Date(2016, 11));
    axis.addLog("HTML & CSS", CONTENT[5], new Date(2016, 8), new Date(2016, 9));
    axis.addLog("JavaScript", CONTENT[6], new Date(2016, 9), new Date(2017, 0));
    axis.draw();
  } 
}

var _EM;
var _SVG = "http://www.w3.org/2000/svg";

function Axis() {
  this.logs = [];
  this.endYear = new Date().getFullYear();
  this.endMonth = new Date().getMonth();
  this.startYear = this.endYear;
  this.startMonth = this.endMonth;
  _EM = Math.floor($(".main-content").outerWidth(false) / 33);
}

Axis.prototype.addLog = function(title, text, startDate, endDate) {
  // Update the starting point of the log.
  if (startDate.getFullYear() < this.startYear) {
    this.startYear = startDate.getFullYear();
    this.startMonth = startDate.getMonth();
  } else if (startDate.getFullYear() == this.startYear 
             && startDate.getMonth() < this.startMonth) {
    this.startMonth = startDate.getMonth();
  }
  this.logs.push(new Log(title, text, startDate, endDate));
}

Axis.prototype.draw = function() {
  var monthHeight = 2 * _EM;
  var axisMonths = calcAxisMonths(this);
  var svgHeight = (axisMonths + .5) * monthHeight;
  var svg = document.querySelector(".pro-log svg");
  svg.setAttribute("height", svgHeight);
  svg.addEventListener("click", function(e) { e.stopPropagation(); });
  
  var $page = $(".main-content");
  // Incerase the height of the page in regards to the height of the log.
  $page.css("height", svgHeight + parseInt($page.css("height"), 10));
  
  var svgCenterX = $("svg").outerWidth(false) / 2;
  svg.appendChild(newSVGAxis(this, svgCenterX, axisMonths));
  drawLogs(this, svg, svgCenterX, axisMonths);
  drawSeparators(this, svg, svgCenterX, axisMonths);
  registerListeners();
    
/* No more drawing. */
/* ---------- Nested functions ---------- */
  
  function calcAxisMonths(axis) {
    var yearDiff = axis.endYear - axis.startYear;
    var monthDiff = axis.endMonth - axis.startMonth;
    
    if (yearDiff == 0 )
      return (1 + monthDiff);
    else if (yearDiff == 1)
      return ((12 - axis.startMonth) + (axis.endMonth + 1));
    else
      return (((yearDiff - 1) * 12) + ((12 - axis.startMonth) + 
                                       (axis.endMonth + 1)));
  }
  
  function newSVGAxis(axis, cx, axisMonths) {
    var arrowWidth = _EM * .15;
    var arrowHeight = _EM * 1.1;
    var axisHeight = axisMonths * monthHeight;
    var startY = arrowHeight;
    var lineWidth = _EM * .05;
        
    var points = [(cx - arrowWidth) + "," + startY,
                  cx + "," + (startY - arrowHeight),
                  (cx + arrowWidth) + "," + startY,
                  (cx + lineWidth) + "," + startY,
                  (cx + lineWidth) + ',' + axisHeight,
                  (cx - lineWidth) + ',' + axisHeight,
                  (cx - lineWidth) + "," + startY
                 ];

    var arrow = document.createElementNS(_SVG, "polygon");
    arrow.setAttribute("points", points.toString());
    arrow.style.fill = "azure";
    arrow.style.stroke = "rgb(0, 191, 255)";
    return arrow;
  }
  
  function drawLogs(axis, svg, svgCenterX) {
    axis.logs.forEach(function(log) {
      log.draw(axis, svg, svgCenterX, axisMonths);
    })
  }
  
  function drawSeparators(axis, svg, svgCenterX, axisMonths) {
    var r = .14 * _EM;
    var line = document.createElementNS(_SVG, "circle");
    line.setAttribute("r", r);
    line.setAttribute("cx", svgCenterX);
    line.style.fill = "rgb(0, 191, 255)"
    
    for  (var i = axisMonths; i > 0; i--) {
      var l = line.cloneNode(true);
      l.setAttribute("cy", i * monthHeight);
      svg.appendChild(l);
    }
  }
  
  function registerListeners() {
    $("body").click(hideRightSubMenu);
    addEventListener("scroll", hideRightSubMenu);
    $(".sub-menu-right").click(function(e) { e.stopPropagation() });
    $(".pro-log .sub-menu-close").click(hideRightSubMenu);
  }

  function hideRightSubMenu() {
    var $rightSubMenu = $(".sub-menu-right");
    if ($rightSubMenu.css("right") == "0px") {
      var rightIn = _EM * (-20);
      $rightSubMenu.animate({ right: rightIn }, 200);
    }
  }  
}

function Log(title, text, startDate, endDate) {
  this.startDate = startDate;
  this.endDate = endDate ? endDate : null;
  this.title = title;
  this.text = text;
}

Log.prototype.draw = function(axis, svg, svgCenterX, axisMonths) {
  var monthHeight = 2 * _EM;
  var startPoint = newPoint(this, _EM * .2, _EM * .05);
  var endPoint = newPoint(this, _EM * .2, _EM * .05);
  var startY = setY(axis, this.startDate);
  var endY = setY(axis, this.endDate);
  
  startPoint.setAttribute("cy", startY);
  endPoint.setAttribute("cy", endY);
  svg.appendChild(startPoint);
  svg.appendChild(endPoint);
  svg.appendChild(newSemiCircle(this, svgCenterX, startY, endY));
  
  // Nested -- in Log.draw()
  
  function newPoint(log, radius, strokeWidth) {
    var point = document.createElementNS(_SVG, "circle");
    point.setAttribute("r", radius);
    point.setAttribute("stroke-width", strokeWidth);
    point.setAttribute("fill", "azure");
    point.setAttribute("stroke", "rgb(0, 191, 255)");
    point.setAttribute("cx", svgCenterX);
    return point;
  }
  
  function setY(axis, date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var diffYear = year - axis.startYear;
    var monthOnLog;
    if (diffYear === 0)
      monthOnLog = month - axis.startMonth;
    else if (diffYear == 1)
      monthOnLog = 12 - axis.startMonth + month;
    else 
      monthOnLog = (((diffYear - 1) * 12) + ((12 - axis.startMonth) + month));
    return (axisMonths - monthOnLog) * monthHeight;
  }
  
  function newSemiCircle(log, cx, y1, y2) {
    var arc = (axis.logs.indexOf(log) % 2) == 0 ? y1 - y2 : y2 - y1;
    var points = "M" + cx + " " + y1 + " C " + cx + " " + y1 + ", " + 
        (cx - arc) + " " + (y2 + ((y1 - y2) / 2)) + ", " + cx + " " + y2;
    
    var path = document.createElementNS(_SVG, "path");
    path.setAttribute("d", points);
    path.setAttribute("fill", "rgba(240, 255, 255, .3)");
    path.setAttribute("stroke", "rgb(0, 191, 255)");
    path.addEventListener("mouseover", function(e) {
      path.setAttribute("fill", "rgba(0, 191, 255, .4)");
      var $right =  $(".sub-menu-right");
      $right.attr("height", getMenuHeight(log.title));
      if ($right.css("right") < "0px") 
        $right.animate( { right: "0" }, 200);
      $right.find("#title").html(log.title);
      $right.find("#date").html(getDate(log));
      $right.find(".sub-menu-content").html(log.text);
    });
    path.addEventListener("mouseout", function(e) {
      path.setAttribute("fill", "rgba(240, 255, 255, .3)");
    });
    return path;
  }
  
  function getDate(log) {
    var MONTHS = ["January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", 
                  "December"];
    return MONTHS[log.startDate.getMonth()] + " " + log.startDate.getFullYear() 
    + " - " + MONTHS[log.endDate.getMonth()] + " " + log.endDate.getFullYear();
  }
  
  function getMenuHeight(title) {
    var HEIGHTS = { 
      "First Jump Into Programming": 21, 
      "Automated Trading": 22.5, 
      "Java": 24, 
      "Android": 26, 
      "Repetition - Way For Sustainable Knowledge": 22.5, 
      "HTML & CSS": 16.5, 
      "JavaScript": 28.5 
    };
    return HEIGHTS[title] * _EM;
  }
}