/*
 * DATE AND TIME 
 */

// Parse date
var parseDate = d3.time.format("%d-%b-%y").parse;

// Parse time
var parseTime = d3.time.format("%H:%M:%S").parse;
var parseShortTime = d3.time.format("%M:%S").parse;

// Parse the pace as duration
function parsePace(pace){
  pace = d3.time.format("%M:%S").parse(pace);
  pace = +formatSecond(pace) + +formatMinute(pace)*60;
  return pace;
} 

// Getting seconds minutes and hours
var formatHour = d3.time.format("%H");
var formatMinute = d3.time.format("%M");
var formatSecond = d3.time.format("%S");

// Print the pace as MM:SS for tooltips and axis
var prettyPace = function(d) {
    var minutes = Math.floor(d/60);
    var seconds = +(d%60).toFixed(0);
    return(seconds == 60? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}

// Print the time as HH:MM:SS for tooltips and axis 
var prettyTime = function(d) {
    var hours = Math.floor(d/3600);
    var minutes = Math.floor((d-hours*3600)/60);
    var seconds = +(d%60).toFixed(0);
    // Do all the formatting
    if (seconds == 60) { minutes = minutes + 1; seconds = "00"; }
    if (minutes == 60) { hours = hours + 1; minutes = "00"; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ":" + minutes + ":" + seconds;
}

/*
 * CHART SETUP
 */

// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 40, bottom: 30, left: 70},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom,
    padding = 30,
    legendElementSize=10,
    legendPadding=10,
    legendTextPadding=20;

// If legend, draw the legend

function drawLegend(svg) {
  var colors=["#000","#3A80E5"];
  var legend = svg.selectAll(".legend").data([0].concat(function(d) { return d; }));
      legend.enter().append("g").attr("class", "legend");

      // Modified the x and y to make the legend vertical
      // Color blocks
      legend.append("rect")
        .attr("x", width-90)
        .attr("y", function(d, i) { return (legendElementSize * i) + legendPadding; })
        .attr("width", legendElementSize)
        .attr("height", legendElementSize)
        .style("fill", function(d, i) { return colors[i]; });
      // Add labels
      legend.append("text")
        .attr("class", "sans")
        .text(function(d, i) { 
            // Hardcoding for now
            var legend = ["Pace","Regression"];
            return legend[i]})
        .attr("x", width-70)
        .attr("y", function(d, i) { return (legendElementSize * i)+legendTextPadding; })
      legend.exit().remove();
}

/*
 * AXES
 */

// Axis scaling functions
// x axis is defined differently if there is a regression line
var x = d3.time.scale().range([0,width]);
var regX = d3.scale.linear().range([0,width]);
var y = d3.scale.linear().range([height, 0]);

// X axis is the same
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(10)
    .tickFormat(d3.time.format("%b-%y"));

// Y axis is different based on what data we're plotting
var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(8)
    // Make ticks as wide as the graph
    .tickSize(-width)
    // And represent them in time form
    .tickFormat ( function(d) { 
      var minutes = Math.floor(d/60);
      var seconds = +(d%60).toFixed(0);
      return(seconds == 60? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    });

// Distance y axis is pretty straightforward
var yAxisDist = d3.svg.axis().scale(y)
    .orient("left").ticks(8)
    // Make ticks as wide as the graph
    .tickSize(-width);

// Long form time for duration data
var yAxisTime = d3.svg.axis().scale(y)
    .orient("left").ticks(8)
    // Make ticks as wide as the graph
    .tickSize(-width)
    .tickFormat( function(d) {
      var hours = Math.floor(d/3600);
      var minutes = Math.floor((d-hours*3600)/60);
      var seconds = +(d%60).toFixed(0);
      // Do all the formatting
      if (seconds == 60) { minutes = minutes + 1; seconds = "00"; }
      if (minutes == 60) { hours = hours + 1; minutes = "00"; }
      if (minutes < 10) { minutes = "0" + minutes; }
      if (seconds < 10) { seconds = "0" + seconds; }
      return hours + ":" + minutes + ":" + seconds;
    })

// Called at every button selection to clear the chart out
function clearAll(svg) {
  svg.selectAll("circle")
      .attr("class", "hide");
  svg.selectAll("g")
    .attr("class", "hide");
  svg.selectAll("text")
    .attr("class", "hide");
}

/* 
 * INITIAL SETUP 
 */

// Adds the svg canvas
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom+20)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Add in the tooltips
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Get the data
d3.csv("pretty-pace.csv", function(error, data) {
    var totalDist = 0;
    var totalTime = 0;
    data.forEach(function(d) {
        // Make the numbers numbers!
        d.number = +d.number;
        d.distance = +d.distance;
        totalDist = totalDist + d.distance;

        
        // Parse date
        d.date = parseDate(d.date);

        // "Durations" (time and pace) will be represented in total seconds
        // If time includes hours, we'll need to parse it differently
        if (d.time.length > 5) {
          d.time = parseTime(d.time);          
          d.time = +formatHour(d.time)*3600 + +formatSecond(d.time) + +formatMinute(d.time)*60;
        // Otherwise, just consider mins and seconds
        } else {
          d.time = parseShortTime(d.time);
          d.time = +formatSecond(d.time) + +formatMinute(d.time)*60;
        }
        totalTime = totalTime + d.time;
        // Turn pace into d3 time format
        // Get minutes and seconds and calculate total seconds
        d.pace = parsePace(d.pace);
    });
    var formatDist = d3.format(".0f");
    var formatDist = d3.format(".0f");
    totalDist = formatDist(totalDist);
    console.log(totalDist, totalTime, prettyTime(totalTime));

    // Start with the pace graph
    paceGraph(data);
    formatTab("pace");
    
    // Init with marathon lines, too
    drawMarathonLines(svg);

});

/*
 * DRAW THE GRAPHS
 */

// PACE GRAPH 
function paceGraph(data) {

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    // hardcoding: start y axis at 6:00
    y.domain([360, d3.max(data, function(d) { return d.pace+padding; })]);

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("text")
      .attr("class", "yaxisLabel")
        .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Average Pace per Mile");    
    
    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        // Add in dotted lines
        .selectAll(".tick line").attr("stroke", "#666").attr("stroke-dasharray", "3,4");
    
    // Scatterplot of pace
    svg.selectAll("dot") 
        .attr("class","dot")   
        .data(data)         
        .enter().append("circle")                               
        .attr("r", 4)       
        // Use domain functions to plot x/y coordinates of data
        .attr("cx", function(d) { return x(d.date); })       
        .attr("cy", function(d) { return y(d.pace); })
        // Tooltip 
        .on("mouseover", function(d) {      
            tooltip.transition().style("opacity", .9);      
            tooltip.html("Pace: " + prettyPace(d.pace))
                   .style("left", (d3.event.pageX + 5) + "px")
                   .style("top", (d3.event.pageY - 18) + "px");
            })                  
        .on("mouseout", function(d) {       
            tooltip.transition().style("opacity", 0);   
        });
  
    // Calculate linear regression
    /*
    var lg = calcLinear(data, 
        // Names of x and y columns
        "date","pace",
        d3.min(data, function(d){ return d.date}), 
        d3.min(data, function(d){ return d.pace})

    );
    
    // Add in linear regression line
    
    svg.append("line")
      .attr("class", "regression")
        .attr("x1", regX(lg.ptA.x))
        .attr("y1", y(lg.ptA.y))
        .attr("x2", regX(lg.ptB.x))
        .attr("y2", y(lg.ptB.y));
    */

    // LEGEND
    //drawLegend(svg);
}

// DISTANCE
function distanceGraph(data) {

    // Scale the range of the data again 
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.distance+3; })]);

        // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("text")
      .attr("class", "yaxisLabel")
        .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Distance (Miles)");    
    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxisDist)
        .selectAll(".tick line").attr("stroke", "#666").attr("stroke-dasharray", "3,4");
    
    // Scatterplot of distance
    svg.selectAll("dot") 
        .attr("class","dot")   
        .data(data)         
        .enter().append("circle")                               
        .attr("r", 4)     
        // Use domain functions to plot x/y coordinates of data
        .attr("cx", function(d) { return x(d.date); })       
        .attr("cy", function(d) { return y(d.distance); })
        // Tooltip 
        .on("mouseover", function(d) {      
            tooltip.transition().style("opacity", .9);      
            tooltip.html("Distance: " + d.distance)
                   .style("left", (d3.event.pageX + 5) + "px")
                   .style("top", (d3.event.pageY - 18) + "px");
            })                  
        .on("mouseout", function(d) {       
            tooltip.transition().style("opacity", 0);   
        });
}

// DURATION
function durationGraph(data) {

    // Scale the range of the data again 
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.time; })]);

        // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("text")
      .attr("class", "yaxisLabel")
        .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Duration");    
    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxisTime)
        .selectAll(".tick line").attr("stroke", "#666").attr("stroke-dasharray", "3,4");
    
    // Scatterplot of time
    svg.selectAll("dot") 
        .attr("class","dot")   
        .data(data)         
        .enter().append("circle")                               
        .attr("r", 4)     
        // Use domain functions to plot x/y coordinates of data
        .attr("cx", function(d) { return x(d.date ); })       
        .attr("cy", function(d) { return y(d.time) + 10; })
         // Tooltip 
        .on("mouseover", function(d) {      
            tooltip.transition().style("opacity", .9);      
            tooltip.html("Duration: " + prettyTime(d.time))
                   .style("left", (d3.event.pageX -5) + "px")
                   .style("top", (d3.event.pageY - 18) + "px");
            })                  
        .on("mouseout", function(d) {       
            tooltip.transition().style("opacity", 0);   
        });
}

// This is triggered by toggling lines showing marathon training range
function drawMarathonLines(svg) {
  svg.append("line")
          .attr("class", "regression")
          .attr("x1", x(parseDate("5-Apr-17")))
          .attr("y1", height)
          .attr("x2", x(parseDate("5-Apr-17")))
          .attr("y2", 0);
        svg.append("line")
          .attr("class", "regression")
          .attr("x1", x(parseDate("1-Oct-17")))
          .attr("y1", height)
          .attr("x2", x(parseDate("1-Oct-17")))
          .attr("y2", 0);
}

// LINEAR REGRESSION
// Functions borrowed from https://bl.ocks.org/HarryStevens/be559bed98d662f69e68fc8a7e0ad097
function calcLinear(data, x, y, minX, minY){
  // Let totalPoints = the number of data points
  var totalPoints = data.length;
  // Get just the points
  var pts = [];
  data.forEach(function(d,i){
    var obj = {};
    obj.x = d[x];
    obj.y = d[y];
    obj.mult = obj.x*obj.y;
    pts.push(obj);
  });
  var sum = 0;
  var xSum = 0;
  var ySum = 0;
  var sumSq = 0;
  pts.forEach(function(pt){
    sum = sum + pt.mult;
    xSum = xSum + pt.x;
    ySum = ySum + pt.y;
    sumSq = sumSq + (pt.x * pt.x);
  });
  var a = sum * totalPoints;
  var b = xSum * ySum;
  var c = sumSq * totalPoints;
  var d = xSum * xSum;
  // Plug the values that you calculated for a, b, c, and d into the following equation to calculate the slope
  // slope = m = (a - b) / (c - d)
  var m = (a - b) / (c - d);
  // Let e equal the sum of all y-values
  var e = ySum;
  // Let f equal the slope times the sum of all x-values
  var f = m * xSum;
  // Plug the values you have calculated for e and f into the following equation for the y-intercept
  // y-intercept = b = (e - f) / n
  var b = (e - f) / totalPoints;
  var formatSlope = d3.format(".2f");
  var formattedSlope = formatSlope(m*60);

  // Print the plot title
  // return an object of two points
  // each point is an object with an x and y coordinate
  return {
    ptA : {
      x: minX,
      y: m * minX + b
    },
    ptB : {
      y: minY,
      x: (minY - b) / m
    }
  }
}

/*
 * RESPOND TO USER INPUT
 */

// Swap out for distance data
function updateDataDistance() {
  d3.csv("pretty-pace.csv", function(error, data) {
    data.forEach(function(d) {
        d.distance = +d.distance;
        d.date = parseDate(d.date);
    });
    clearAll(svg);
    formatTab("distance");
    distanceGraph(data);
  });
}

// Swap out for pace data
function updateDataPace() {
  d3.csv("pretty-pace.csv", function(error, data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        // Turn pace into d3 time format
        // Get minutes and seconds and calculate total seconds
        d.pace = parsePace(d.pace);
    });
    clearAll(svg);
    formatTab("pace");
    paceGraph(data);
  });
}
// Swap out for pace data
function updateDataDuration() {
  d3.csv("pretty-pace.csv", function(error, data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        // "Durations" (time and pace) will be represented in total seconds
        // If time includes hours, we'll need to parse it differently
        if (d.time.length > 5) {
          d.time = parseTime(d.time);          
          d.time = +formatHour(d.time)*3600 + +formatSecond(d.time) + +formatMinute(d.time)*60;
        // Otherwise, just consider mins and seconds
        } else {
          d.time = parseShortTime(d.time);
          d.time = +formatSecond(d.time) + +formatMinute(d.time)*60;
        }
    });
    clearAll(svg);
    formatTab("duration");
    durationGraph(data);
  });
}

// Checkbox toggling marathon lines
function marathonLines() {
    var button = document.getElementById("marathon");
    var buttonLabel = document.getElementById("marathonLabel");
    if (button.checked) {
        svg.selectAll(".regression").attr("class","");
        drawMarathonLines(svg);
    }
    else {
      svg.selectAll(".regression").attr("class","hide");
    }
}