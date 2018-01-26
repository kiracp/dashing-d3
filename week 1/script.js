
var width=960,
    height=180,

svg=d3.select("#chart")
.append("svg")
.attr("width",width)
.attr("height",height);
 
var text=svg
.append("text")
.text("hello world")
.attr("y",50);


var dataList = [30,86,70,280,303,565];

// d3 gives scales, linear is one of them - 
// linear relationship btwn data and output values
//var scale = d3.scale.linear()
var scale = d3.scaleLinear()
  // Chain some methods
  //Domain is values that we'll put into the scale
  // 0 to 365, highest value we have in data
  .domain([0,565])
  // Output values, domain is squeezed into these
  // Since dashboard with is 320, top range should be <300
  .range([0,300]);


d3.select(".chart")
  // Select all divs inside of chart class
  .selectAll("div")
  // Pull in data method, and our data var
  .data(dataList)
    // Must be invoked to create new data-bound elements
    // Looks at DOM, sees no elements, and creates placeholder elements from datapoints
    .enter()
    // appends a new div to the placeholder created by Enter
    .append("div")
    // d is current element in array, add px
    // es decir, width is 30px for first item, etc
    .style("width", function(d) { return scale(d) + "px";})

    // Add text with value to each one
    // Can append strings to it
    .text(function(d) { return "$" + d;});