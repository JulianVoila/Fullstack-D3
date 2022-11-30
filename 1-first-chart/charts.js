import * as d3 from "d3"

async function drawLineChart() {
  const data = await d3.json("./my_weather_data.json")
  console.log(data)

  const yAccesor = d => d["temperatureMax"]
  console.log(yAccesor(data[0]))

  const parseDate = d3.parseDate("%Y-%m-%d")
  const xAccesor = d => parseDate(d["date"])
  console.log(xAccesor(data[0]))
}

drawLineChart()