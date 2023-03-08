// import * as d3 from "d3"

async function drawLineChart() {
  const data = await d3.json("my_weather_data.json")
  // console.log(data)

  const yAccesor = d => d.temperatureMax
  // console.log(yAccesor(data[0]))

  const dateParser = d3.timeParse("%Y-%m-%d")
  const xAccesor = d => dateParser(d["date"])
  // console.log(xAccesor(data[0]))

  console.log(d3.extent(data, yAccesor))
  // console.log(d3.min(data, yAccesor))

  let dms = {
    width: window.innerWidth * 0.9,
    height: 400,
    margins: {
      top: 15,
      right: 15,
      bottom: 40,
      left: 45,
    }
  }

  dms.boundedWidth = dms.width - dms.margins.left - dms.margins.right
  dms.boundedHeight = dms.height - dms.margins.top - dms.margins.bottom

  const wrapper = d3.select("#wrapper")
    .append("svg")
    .attr("width", dms.width)
    .attr("height", dms.height)

  const bounds = wrapper.append("g")
    .style("transform", `translate(${dms.margins.left
      }px, ${dms.margins.top
      }px)`)

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yAccesor))
    .range([dms.boundedHeight, 0])



  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xAccesor))
    .range([0, dms.boundedWidth])

  const frezzingTempPlacement = yScale(32)
  console.log(frezzingTempPlacement)
  const freezingTemperatures = bounds.append("rect")
    .attr("width", dms.boundedWidth)
    .attr("x", 0)
    .attr("y", frezzingTempPlacement)
    .attr("height", dms.boundedHeight - frezzingTempPlacement)
    .attr("fill", "#e0f3f3")


  const lineGenerator = d3.line()
    .x(d => xScale(xAccesor(d)))
    .y(d => yScale(yAccesor(d)))

  const line = bounds.append("path")
    .attr("d", lineGenerator(data))
    .attr("fill", "none")
    .attr("stroke", "#af9358")
    .attr("stroke-width", 2)


    const yAxisGenerator = d3.axisLeft()
  .scale(yScale)

  const yAxis = bounds.append("g")
  .call(yAxisGenerator)

  const xAxisGenerator = d3.axisBottom()
  .scale(xScale)

  const xAxis = bounds.append("g")
  .call(xAxisGenerator)
  .style("transform",  `translateY(${
    dms.boundedHeight
  }px)`)
  
}

drawLineChart()