// @TODO: YOUR CODE HERE!
// x = poverty and y = obesity

var svgWidth = 900;
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
// var url = "https://raw.githubusercontent.com/Kerrykova/Data-Journalism-and-D3/master/assets/data/data.csv"
d3.csv("data.csv").then(function(data) {
// d3.csv(url).then(function(data) {
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
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.poverty)-1, d3.max(data, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.obesity)-1, d3.max(data, d => d.obesity)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .text(d => d.abbr)
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".33");

    // starting with MS? why?
    var textGroup = chartGroup.selectAll(".abbr")
       .data(data)
       .enter()
       .append("text")
       .classed("abbr", true)
       .text((d,i) => {
         console.log(i)
         return d.abbr
       })
       .attr("x", d => xLinearScale(d.poverty)-8)
       .attr("y", d => yLinearScale(d.obesity)+5)
      .attr("font-size", "10px")
      .attr("color", "black");

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Obesity %");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Poverty %");
  });
