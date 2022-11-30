import * as d3 from "d3"

async function drawLineChart() {
  const data = await d3.json("my_weather_data.json")
  console.log(data)

  const yAccesor = d => d["temperatureMax"]
  console.log(yAccesor(data[0]))

  const parseDate = d3.parseDate("%Y-%m-%d")
  const xAccesor = d => parseDate(d["date"])
  console.log(xAccesor(data[0]))

  let dms = {
    width: window.innerWidth * 0.9,
    height: 400,
    margins: {
      top: 15,
      right: 15,
      bottom: 40,
      left: 60,
    }
  }

  dms.boundedWidth = dms.width - dms.margins.left - dms.margins.right
  dms.boundedHeight = dms.width - dms.margins.top - dms.margins.bottom

  const wrapper = d3.select("#wrapper")
  console.log(wrapper)

  const svg = wrapper.append("svg")
}

drawLineChart()