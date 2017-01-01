// TODO: make ".main-content".width responsive to the width of the svg;
// TODO: Log.draw() - fix -ongoing logs - semiCircle-drawing
// TODO: Change text in intro.
// TODO: Change interests - to 'What am I passionate about?'
// TODO: Size of right submenu - depends on text size. ? - var for size
// ? certificates

'use strict';

  var em = Math.floor($(".main-content").outerWidth(false) / 33);

  function registerBodyListeners() {
    $("body").click(hideRightSubMenu);
    addEventListener("scroll", hideRightSubMenu);
  }

function hideRightSubMenu() {
  var $rightSubMenu = $(".sub-menu-right");
  if ($rightSubMenu.css("right") == "0px") {
    var rightIn = em * (-20);
    $rightSubMenu.animate({ right: rightIn }, 200);
  }
}

function Log(title, text, startDate, endDate) {
  this.startDate = startDate;
  this.endDate = endDate ? endDate : null;
  this.title = title;
  this.text = text;
}

Log.prototype.draw = function(axis, svg, svgCenterX, axisMonths) {
  var monthHeight = 2 * axis.emUnit;
  var startPoint = newPoint(this, axis.emUnit * .2, axis.emUnit * .05);
  var startY = setY(axis, this.startDate)
  startPoint.setAttribute("cy", startY);
  svg.appendChild(startPoint);
  
  if (this.endDate == null) { // This log has no closing point.
    var semi = newSemiCircle(this, svgCenterX, startY);
    svg.appendChild(semi);
    return;
  }
  
  var endPoint = newPoint(this, axis.emUnit * .2, axis.emUnit * .05)
  var endY = setY(axis, this.endDate)
  endPoint.setAttribute("cy", endY);
  svg.appendChild(endPoint);
  svg.appendChild(newSemiCircle(this, svgCenterX, startY, endY));
  
  // Nested -- in Log.draw()
  
  function newPoint(log, radius, strokeWidth) {
    var point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
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
    
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
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
    return HEIGHTS[title] * em;
  }
  
}

function Axis() {
  this.logs = [];
  this.endYear = new Date().getFullYear();
  this.endMonth = new Date().getMonth();
  this.startYear = this.endYear;
  this.startMonth = this.endMonth;
  this.emUnit = Math.floor($(".main-content").outerWidth(false) / 33);
  em = this.emUnit;
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
  var monthHeight = 2 * this.emUnit;
  var axisMonths = calcAxisMonths(this);
  var svgHeight = (axisMonths + .5) * monthHeight;
  console.log("months in the log:", axisMonths, "svgHeight = ", svgHeight);
  var svg = document.querySelector(".pro-log svg");
  svg.setAttribute("height", svgHeight);
  var svgCenterX = $("svg").outerWidth(false) / 2;
  svg.appendChild(newSVGAxis(this, svgCenterX, axisMonths));
  drawLogs(this, svg, svgCenterX, axisMonths);
  drawSeparators(this, svg, svgCenterX, axisMonths);
  registerBodyListeners();
  svg.addEventListener("click", function(e) { 
    e.stopPropagation();
  });
  var $page = $(".main-content");
  // Incerase the height of the page in regards to the height of the log.
  $page.css("height", svgHeight + parseInt($page.css("height"), 10));
  
  $(".sub-menu-right").click(function(e) { e.stopPropagation() });
  $(".pro-log .sub-menu-close").click(hideRightSubMenu);
  
/* No more drawing. */
/* ---------- Nested functions ---------- */
  
  function calcAxisMonths(axis) {
    var yearDiff = axis.endYear - axis.startYear;
    var monthDiff = axis.endMonth - axis.startMonth;
    console.log("yearDiff:", yearDiff, axis.endYear, axis.startYear);
    console.log("monthDiff:", monthDiff, axis.endMonth, axis.startMonth);
    
    if (yearDiff == 0 )
      return (1 + monthDiff);
    else if (yearDiff == 1)
      return ((12 - axis.startMonth) + (axis.endMonth + 1));
    else
      return (((yearDiff - 1) * 12) + ((12 - axis.startMonth) + (axis.endMonth + 1)));
  }
  
  function newSVGAxis(axis, cx, axisMonths) {
    console.log("cx", cx);

    var arrowWidth = axis.emUnit * .15;
    var arrowHeight = axis.emUnit * 1.1;
    var axisHeight = axisMonths * monthHeight;
    var startY = arrowHeight;
    var lineWidth = axis.emUnit * .05;
        
    var points = [(cx - arrowWidth) + "," + startY,
                  cx + "," + (startY - arrowHeight),
                  (cx + arrowWidth) + "," + startY,
                  (cx + lineWidth) + "," + startY,
                  (cx + lineWidth) + ',' + axisHeight,
                  (cx - lineWidth) + ',' + axisHeight,
                  (cx - lineWidth) + "," + startY
                 ];

    var arrow = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    arrow.setAttribute("points", points.toString());
    arrow.style.fill = "azure";
    arrow.style.stroke = "rgb(0, 191, 255)";
    return arrow;
  }
  
  function drawSeparators(axis, svg, svgCenterX, axisMonths) {
    var em = axis.emUnit;
    var r = .14 * em;
    var line = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    line.setAttribute("r", r);
    line.setAttribute("cx", svgCenterX);
    line.style.fill = "rgb(0, 191, 255)"
    
    for  (var i = axisMonths; i > 0; i--) {
      var l = line.cloneNode(true);
      l.setAttribute("cy", i * monthHeight);
      svg.appendChild(l);
    }
  }  
  
  function drawLogs(axis, svg, svgCenterX) {
    axis.logs.forEach(function(log) {
      log.draw(axis, svg, svgCenterX, axisMonths);
    })
  }
}