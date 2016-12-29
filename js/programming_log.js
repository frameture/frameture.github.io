// TODO: make ".main-content".width responsive to the height of the svg;
// TODO: implement Log.draw();

"use strict";

function Log(text, startDate, endDate) {
  this.startDate = startDate;
  this.endDate = endDate ? endDate : null;
  this.text = text;
}

Log.prototype.draw = function(axis, svg, svgCenterX, axisMonths) {
  console.log(this);
  var log = this;
  var monthHeight = 2 * axis.emUnit;
  var startPoint = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  startPoint.setAttribute("class", "log-point");
  startPoint.setAttribute("fill", "azure");
  startPoint.setAttribute("stroke", "rgb(0, 191, 255)");
  startPoint.setAttribute("cx", svgCenterX);
  startPoint.addEventListener("mouseover", function(e) {
    console.log(log.text);
  });
  var startMonth = this.startDate.getMonth();
  var startYear = this.startDate.getFullYear();
  var diffYear = startYear - axis.startYear;
  console.log("difYear:", diffYear, "startYear:", startYear, "axis.startYear:", axis.startYear);
    console.log("startMonth:", startMonth, "axis.startMonth:", axis.startMonth);
  var monthOnLog;
  if (diffYear == 0)
    monthOnLog = startMonth - axis.startMonth;
  else if (diffYear == 1)
    monthOnLog = 12 - axis.startMonth + startMonth;
  else 
    monthOnLog = (((diffYear - 1) * 12) + ((12 - axis.startMonth) + startMonth));
 startPoint.setAttribute("cy", (axisMonths - monthOnLog) * monthHeight); 
  
  svg.appendChild(startPoint);
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
  drawSeparators(this, svg, svgCenterX, axisMonths);
  drawLogs(this, svg, svgCenterX, axisMonths);
  
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
    var arrowHeight = axis.emUnit * 1.62;
    var axisHeight = axisMonths * monthHeight;
    var startY = axis.emUnit * 2;
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
    var length = .14 * em;
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", svgCenterX - length);
    line.setAttribute("x2", svgCenterX + length);
    line.style.stroke = "rgb(0, 191, 255)"
    
    for  (var i = axisMonths - 1; i > 1; i--) {
      var l = line.cloneNode(true);
      l.setAttribute("y1", i * monthHeight);
      l.setAttribute("y2", i * monthHeight);
      svg.appendChild(l);
    }
  }
  
  function drawLogs(axis, svg, svgCenterX) {
    axis.logs.forEach(function(log) {
      log.draw(axis, svg, svgCenterX, axisMonths);
    })
  }
}