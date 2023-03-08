// let dataset = await d3.json("./data/my_weather_data.json")

async function drawBars() {

  const dataset = await d3.json("./my_weather_data.json")

  // Set Bounds
  const width = 500
  
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


  // init static elements
  bounds.append("g")
      .attr("class", "bins")
  bounds.append("line")
      .attr("class", "mean")
  bounds.append("g")
      .attr("class", "x-axis")
      .style("transform", `translateY(${dms.boundedHeight}px)`)
    .append("text")
      .attr("class", "x-axis-label")


const drawHistogram = metric => {


  // Access Data
  const xAccesor = d => d[metric]
  const yAccesor = d => d.length
  
  
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
  const barPadding = 1

  let binGroups = bounds.select(".bins")
    .selectAll(".bin")
    .data(bins)

  binGroups.exit().remove()

  const newBinGroups = binGroups
    .join("g")
    .attr("class", "bin")

  
  newBinGroups.append("rect")
  newBinGroups.append("text")

  binGroups = newBinGroups.merge(binGroups)



// x0 is a d3 function that gets the lowest value of the bin
// x1 is the opposite, it return the highest value of the bin
const barRect = binGroups
    .select("rect")
    .attr("x", d => xScale(d.x0) + barPadding / 2)
    .attr("y", d => yScale(yAccesor(d)))
    .attr("width", d => d3.max([0, xScale(d.x1) - xScale(d.x0) - barPadding]))
    .attr('height', d => dms.boundedHeight - yScale(yAccesor(d)))
    .attr("fill", "deepskyblue")
    
  
  const barText = binGroups
      // .filter(yAccesor)
      .select("text")
      .text(yAccesor)
      .attr("x", d => xScale(d.x0) + 
        (d3.max([0, xScale(d.x1) - xScale(d.x0) - barPadding])) / 2)
      .style("transform", d => `translateY(${
          yScale(yAccesor(d)) - 5
       }px)`)
  
  const mean = d3.mean(dataset, xAccesor)

  const meanLine = bounds.selectAll(".mean")
    .append("line")
    .attr("x1", xScale(mean))
    .attr("y1", yScale(0))
    .attr("x2", xScale(mean))
    .attr("y2", yScale(d3.max(bins, yAccesor)+5))
    .attr("stroke", "maroon")
    .attr("stroke-dasharray", "2px 3px")

    // const meanText = meanGroup
    // .append("text")
    // .attr("x", xScale(mean)+3)
    // .attr("y", yScale(d3.max(bins, yAccesor)+3))
    // .attr("fill", "maroon")
    // .text("mean")
    // .attr("font-size", "10px")
    //   .attr("font-family", "sans-serif")
  
  // Create Axis
    const xAxisGenerator = d3.axisBottom()
    .scale(xScale)
    .ticks(12)
  
    const xAxis = bounds.select(".x-axis")
    .call(xAxisGenerator)
  
    const xAxisLabel = xAxis.select(".x-axis-label")
    .attr("x", dms.boundedWidth / 2)
    .attr("y", dms.margin.bottom - 10)
    .text(metric)
  
  
  }

// drawHistogram("moonPhase")

const metrics = [
"windSpeed",
"moonPhase",
"dewPoint",
"humidity",
"uvIndex",
"windBearing",
"temperatureMin",
"temperatureMax",
"visibility",
"cloudCover"
]

let selectedMetricIndex = 0
drawHistogram(metrics[selectedMetricIndex])

const button = d3.select("body")
  .append("button")
    .text("Change metric")

button.node().addEventListener("click", onClick)
function onClick() {
  selectedMetricIndex = (selectedMetricIndex + 1) % metrics.length
  drawHistogram(metrics[selectedMetricIndex])
}

}
  
  drawBars()