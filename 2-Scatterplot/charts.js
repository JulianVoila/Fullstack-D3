// let dataset = await d3.json("./data/my_weather_data.json")

async function drawScatter() {

  const dataset = await d3.json("./my_weather_data.json")
  
  const xAccesor = d => d.dewPoint
  const yAccesor = d => d.humidity
  const colorAccesor = d => d.cloudCover
  
  
  
  const width = d3.min([
  window.innerWidth * 0.9,
  window.innerHeight * 0.9,
  ])
  
  let = dms = {
    width: width,
    height: width,
    margin: {
      top: 10,
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
  
  
  const xScale = d3.scaleLinear()
  .domain(d3.extent(dataset, xAccesor))
  .range([0, dms.boundedWidth])
  .nice()
  
  
  const yScale = d3.scaleLinear()
  .domain(d3.extent(dataset, yAccesor))
  .range([dms.boundedHeight, 0])
  .nice()
  
  const colorScale = d3.scaleLinear()
  .domain(d3.extent(dataset, colorAccesor))
  .range(["skyblue","darkslategrey"])
  
  
  
  const dots = bounds
    .selectAll("circle")
    .data(dataset)
  
    dots
    .join("circle")
    .attr("cx", d => xScale(xAccesor(d)))
    .attr("cy", d => yScale(yAccesor(d)))
    .attr("r", 5)
    .attr("fill", d => colorScale(colorAccesor(d)))
  
  
    const yAxisGenerator = d3.axisLeft()
    .scale(yScale)
    .ticks(4)
  
    const yAxis = bounds.append("g")
    .call(yAxisGenerator)
  
    const xAxisGenerator = d3.axisBottom()
    .scale(xScale)
    .ticks(4)
  
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
      .html("Dew point (°F)")
  
    
    const yAxisLabel = yAxis
      .append("text")
      .attr("x", -dms.boundedHeight/2)
      .attr("y",  -dms.margin.left+10)
      .attr("fill", "black")
      .style("font-size", "1.2em")
      .text("Humidity")
      .style("transform", "rotate(-90deg)")
      .style("text-anchor", "middle")
  
  }
  
  drawScatter()