// @TODO: YOUR CODE HERE!
// x = poverty and y = obesity

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
var url = "https://raw.githubusercontent.com/Kerrykova/Data-Journalism-and-D3/master/assets/data/data.csv"
//d3.csv("data.csv").then(function(data) {
d3.csv(url).then(function(data) {
    console.log(data);

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    data.forEach(function(d){
      d.poverty = +d.poverty;
      d.obesity = +d.obesity;
    });
    console.log(data)

    // Step 2: Create scale functions
    // ==============================
    var xscale = d3.scaleTime()
        .domain([20, d3.max(data, d => d.poverty)])
        .range([0, width]);

    var yscale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.obesity)])
        .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var xAxis = d3.axisBottom(xscale).tickFormat();
    var yAxis = d3.axisLeft(yscale).ticks();


    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);


    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => xscale(i))
    .attr("cy", d => yscale(d))
    .attr("r", "5")
    .attr("fill", "blue");

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`<strong>${d.state}<strong>`);
    });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(d) {
      toolTip.show(d, this);
    })

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Poverty and Obesity % by State");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Is this x or y axis?");
  });
