// TODO: make ".main-content".width responsive to the height of the svg;
// TODO: Log.draw() - fix -ongoing logs - semiCircle-drawing
// TODO: Log.draw() - show contents of logs on "mouseover"

"use strict";

function Log(text, startDate, endDate) {
  this.startDate = startDate;
  this.endDate = endDate ? endDate : null;
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
    console.log(semi);
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
    point.addEventListener("mouseover", function(e) {
      console.log(log.text);
    });
    return point;
  }
  
  function setY(axis, date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var diffYear = year - axis.startYear;
    var monthOnLog;
    if (diffYear == 0)
      monthOnLog = month - axis.startMonth;
    else if (diffYear == 1)
      monthOnLog = 12 - axis.startMonth + month;
    else 
      monthOnLog = (((diffYear - 1) * 12) + ((12 - axis.startMonth) + month));
    return (axisMonths - monthOnLog) * monthHeight;
  }
  
  function newSemiCircle(log, cx, y1, y2) {
    if (y2 == null)
      y2 = monthHeight;

    // TODO: not finished logs - fix closing drawing;
    var notFinishedXOffset = 0;
        var arc = y2 - y1;
    if (axis.logs.indexOf(log) % 2 == 0) {
      arc = (-arc);
    }
    console.log(cx, arc);
    var points = ["M " + cx + " " + y1,
          "Q " + (cx - arc) + " " + (y2 + ((y1 - y2) / 2)),
          (cx + notFinishedXOffset) + " " + y2];
    if (y2 == null) { 
      y2 = monthHeight;
      notFinishedXOffset = (-monthHeight); 
      points = ["M " + cx + " " + y1,
                  "Q " + (cx - arc) + " " + (y2 + ((y1 - y2) / 2)),
                "z " + (cx + notFinishedXOffset) + " " + y2,];
                 // "l " + (cx + notFinishedXOffset) + " " + y2];
    }
    
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    
    console.log(points);
    path.setAttribute("d", points);
    path.setAttribute("fill", "rgba(230, 230, 230, 0.2)");
    path.setAttribute("stroke", "rgb(0, 191, 255)");
    path.addEventListener("mouseover", function(e) {
      console.log(path);
      path.setAttribute("fill", "rgba(100, 100, 100, .4)");
    });
    path.addEventListener("mouseout", function(e) {
      path.setAttribute("fill", "rgba(230, 230, 230, 0.2)");
    });
    return path;
  }
  
}

function Axis() {
  this.logs = [];
  this.endYear = new Date().getFullYear();
  this.endMonth = new Date().getMonth();
  this.startYear = this.endYear;
  this.startMonth = this.endMonth;
  this.emUnit = Math.floor($(".main-content").outerWidth(false) / 33);
}

Axis.prototype.addLog = function(text, startDate, endDate) {
  // Update the starting point of the log.
  if (startDate.getFullYear() < this.startYear) {
    this.startYear = startDate.getFullYear();
    this.startMonth = startDate.getMonth();
  } else if (startDate.getFullYear() == this.startYear 
             && startDate.getMonth() < this.startMonth) {
    this.startMonth = startDate.getMonth();
  }
  this.logs.push(new Log(text, startDate, endDate));
}

Axis.prototype.draw = function() {
  var monthHeight = 2 * this.emUnit;
  var axisMonths = calcAxisMonths(this);
  var svgHeight = (axisMonths + 2) * monthHeight;
  console.log("months in the log:", axisMonths, "svgHeight = ", svgHeight);
  var svg = document.querySelector(".pro-log svg");
  svg.setAttribute("height", svgHeight);
  var svgCenterX = $("svg").outerWidth(false) / 2;
  svg.appendChild(newSVGAxis(this, svgCenterX, axisMonths));
  drawLogs(this, svg, svgCenterX, axisMonths);
  drawSeparators(this, svg, svgCenterX, axisMonths);
  
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
    var arrowHeight = axis.emUnit * 1.5;
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

    arrow.addEventListener("mouseover", function(e) {
      arrow.style.fill = "rgb(0, 191, 255)";
      console.log(e.clientY, e.pageY);
    });
      arrow.addEventListener("mouseout", function(e) {
      arrow.style.fill = "azure";
    });
    return arrow;
  }
  
  function drawSeparators(axis, svg, svgCenterX, axisMonths) {
    var em = axis.emUnit;
    var r = .14 * em;
    var line = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    line.setAttribute("r", r);
    line.setAttribute("cx", svgCenterX);
    line.style.fill = "rgb(0, 191, 255)"
    
    for  (var i = axisMonths - 1; i > 1; i--) {
      var l = line.cloneNode(true);
      l.setAttribute("cy", i * monthHeight);
      svg.appendChild(l);
    }
  }  
  /*  ------------  Separators as lines  -------  */
//  function drawSeparators(axis, svg, svgCenterX, axisMonths) {
//    var em = axis.emUnit;
//    var length = .14 * em;
//    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
//    line.setAttribute("x1", svgCenterX - length);
//    line.setAttribute("x2", svgCenterX + length);
//    line.style.stroke = "rgb(0, 191, 255)"
//    
//    for  (var i = axisMonths - 1; i > 1; i--) {
//      var l = line.cloneNode(true);
//      l.setAttribute("y1", i * monthHeight);
//      l.setAttribute("y2", i * monthHeight);
//      svg.appendChild(l);
//    }
//  }
  
  function drawLogs(axis, svg, svgCenterX) {
    axis.logs.forEach(function(log) {
      log.draw(axis, svg, svgCenterX, axisMonths);
    })
  }
}