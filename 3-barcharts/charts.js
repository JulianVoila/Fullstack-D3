// let dataset = await d3.json("./data/my_weather_data.json")

async function drawBars() {

  const dataset = await d3.json("./my_weather_data.json")
  
  // Access Data
  const xAccesor = d => d.humidity
  const yAccesor = d => d.length
  
  
  
  // Set Bounds
  const width = 600
  
  let = dms = {
    width: width,
    height: width * 0.6,
    margin: {
      top: 30,
      right: 10,
      bottom: 50,
      left: 50,
    },
  }
  
  dms.boundedWidth = dms.width 
  - dms.margin.left
  - dms.margin.right
  
  dms.boundedHeight = dms.height
  - dms.margin.top
  - dms.margin.bottom
  
  
  // Create SVG Basic Canvas
  const wrapper = d3.select("#wrapper")
  .append("svg")
  .attr("width", dms.width)
  .attr("height", dms.height)
  
  const bounds = wrapper.append("g")
  .style("transform", `translate(${
  dms.margin.left
  }px, ${
    dms.margin.top
  }px)`)
  
  
  // Create Scales
  const xScale = d3.scaleLinear()
  .domain(d3.extent(dataset, xAccesor))
  .range([0, dms.boundedWidth])
  .nice()
  
  const binGenerator = d3.bin()
    .domain(xScale.domain())
    .value(xAccesor)
    .thresholds(12)

  const bins = binGenerator(dataset)

  const yScale = d3.scaleLinear()
  .domain([0, d3.max(bins, yAccesor)])
  .range([dms.boundedHeight,0])
  .nice()

  
  // Create bars
  const binsGroup = bounds.append("g")

  const barGroup = binsGroup
    .selectAll("g")
    .data(bins)
    .join("g")

const barPadding = 1

// x0 is a d3 function that gets the lowest value of the bin
// x1 is the opposite, it return the highest value of the bin
const barRect = barGroup
    .append("rect")
    .attr("x", d => xScale(d.x0) + barPadding / 2)
    .attr("y", d => yScale(yAccesor(d)))
    .attr("width", d => d3.max([0, xScale(d.x1) - xScale(d.x0) - barPadding]))
    .attr('height', d => dms.boundedHeight - yScale(yAccesor(d)))
    .attr("fill", "deepskyblue")
    
  
  const barText = barGroup
      .filter(yAccesor)
      .append("text")
      .text(yAccesor)
      .attr("text-anchor", "middle")
      .attr("x", d => xScale(d.x0) + 
        (d3.max([0, xScale(d.x1) - xScale(d.x0) - barPadding])) / 2)
      .attr("y", d => yScale(yAccesor(d)) - 5)
      .attr("fill", "#666")
      .attr("font-size", "12px")
      .attr("font-family", "sans-serif")
  
  const mean = d3.mean(dataset, xAccesor)

  const meanGroup = bounds
    .append("g")

  const meanLine = meanGroup
    .append("line")
    .attr("x1", xScale(mean))
    .attr("y1", yScale(0))
    .attr("x2", xScale(mean))
    .attr("y2", yScale(55))
    .attr("stroke", "maroon")
    .attr("stroke-dasharray", "2px 3px")

    const meanText = meanGroup
    .append("text")
    .attr("x", xScale(mean)+3)
    .attr("y", yScale(54))
    .attr("fill", "maroon")
    .text("mean")
    .attr("font-size", "10px")
      .attr("font-family", "sans-serif")
  
  // Create Axis
    const xAxisGenerator = d3.axisBottom()
    .scale(xScale)
    .ticks(12)
  
    const xAxis = bounds.append("g")
    .call(xAxisGenerator)
    .style("transform",  `translateY(${
      dms.boundedHeight
    }px)`)
  
    const xAxisLabel = xAxis
      .append("text")
      .attr("x", dms.boundedWidth / 2)
      .attr("y", dms.margin.bottom - 10)
      .attr("fill", "black")
      .style("font-size", "1.2em")
      .html("Humidity")
  
  
  }
  
  drawBars()