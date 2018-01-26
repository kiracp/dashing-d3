var width=960,
	height=500,
	
	svg=d3.select("#chart")
		.append("svg")
		.attr("width",width)
		.attr("height",height);
 
var text=svg
.append("text")
.text("hello world")
.attr("y",50);
