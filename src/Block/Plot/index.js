import React, { useEffect, useRef } from 'react';
import { parse } from 'html-react-parser';
import * as d3 from "d3";

const Plot = (props) => {

  useEffect(() => props.onLoad(),[]);
  const canvas = useRef();


  const data = [
    { second: 0, value: 1 },
    { second: 1, value: 2 },
    { second: 2, value: 3 },
    { second: 3, value: 4 },
    { second: 4, value: 5 },
    { second: 5, value: 6 },
    { second: 6, value: 7 },
    { second: 7, value: 8 },
    { second: 8, value: 9 },
    { second: 9, value: 10 },
    { second: 10, value: 11 },
    { second: 11, value: 12 },
    { second: 12, value: 13 },
    { second: 13, value: 14 },
    { second: 14, value: 15 },
    { second: 15, value: 16 },
    { second: 16, value: 17 },
  ]
  const width = 500;
  const height = 500;
  const margin = {top: 20, right: 30, bottom: 30, left:40};
  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
  const line = d3.line().defined(d => !isNaN(d.value)).x(d => x(d.date)).y(d => y(d.value));
  const x = d3.scaleUtc().domain(d3.extent(data, d => d.date)).range([margin.left, width - margin.right]);
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).nice().range([height - margin.bottom, margin.top]);
  const xAxis = g => g.attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
  const yAxis = g => g.attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))

  svg.append("g").call(xAxis);

  svg.append("g").call(yAxis);

  svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

  console.log(parse(svg.node()));

  return svg.node();
}

export default Plot;