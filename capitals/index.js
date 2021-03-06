/*
This visualization was made possible by modifying code provided by:

Scott Murray, Choropleth example from "Interactive Data Visualization for the Web"
https://github.com/alignedleft/d3-book/blob/master/chapter_12/05_choropleth.html

Malcolm Maclean, tooltips example tutorial
http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html

Mike Bostock, Pie Chart Legend
http://bl.ocks.org/mbostock/3888852
*/

//Width and height of map
const width = 960;
const height = 500;

// D3 Projection
const projection = d3.geo
  .albersUsa()
  .translate([width / 2, height / 2]) // translate to center of screen
  .scale([1000]); // scale things down so see entire US

// Define path generator
const path = d3.geo
  .path() // path generator that will convert GeoJSON to SVG paths
  .projection(projection); // tell path generator to use albersUsa projection

// Define linear scale for output
const color = d3.scale
  .linear()
  .range([
    'rgb(213,222,217)',
    'rgb(69,173,168)',
    'rgb(84,36,55)',
    'rgb(217,91,67)',
  ]);

const legendText = [
  'Cities Lived',
  'States Lived',
  'States Visited',
  'States To Visit',
];

// Create SVG element and append map to the SVG
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// Append Div for tooltip to SVG
const div = d3
  .select('body')
  .append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

// Load in my states data!
// d3.csv('data/states-lived.csv', (data) => {
//   color.domain([0, 1, 2, 3]); // setting the range of the input data

// Load GeoJSON data and merge with states data
d3.json('data/us-states.json', (json) => {
  // Loop through each state data value in the .csv file
  // for (let i = 0; i < data.length; i++) {
  //   const dataState = data[i].state; // Grab State Name
  //   const dataValue = data[i].visited; // Grab data value

  //   // Find the corresponding state inside the GeoJSON
  //   for (let j = 0; j < json.features.length; j++) {
  //     const jsonState = json.features[j].properties.name;

  //     if (dataState == jsonState) {
  //       // Copy the data value into the JSON
  //       json.features[j].properties.visited = dataValue;
  //       // Stop looking through the JSON
  //       break;
  //     }
  //   }
  // }

  function hyphenate(cityName) {
    return cityName.replace(/ /g, '-');
  }

  console.log(json.features);
  // Bind the data to the SVG and create one path per GeoJSON feature
  svg
    .selectAll('path')
    .data(json.features)
    .enter()
    .append('path')
    .attr('d', path)
    .style('stroke', '#fff')
    .style('stroke-width', '1')
    .style('fill', 'rgb(69,173,168)')
    .on('mouseover', (d) => {
      const className = hyphenate(d.properties.name);
      const capital = document.querySelector(`.${className}.capital`);
      capital.style.visibility = 'visible';
    })
    .on('mouseout', (d) => {
      const className = hyphenate(d.properties.name);
      const capital = document.querySelector(`.${className}.capital`);
      capital.style.visibility = 'hidden';
    });

  const statePaths = document.querySelectorAll('path');
  // Add State Class Name
  statePaths.forEach((path) => {
    const state = path.__data__.properties.name.replace(/ /g, '-');
    path.classList.add(state);
  });

  d3.csv('data/state-capitals.csv', (data) => {
    const elem = svg.selectAll('g').data(data);

    const elemEnter = elem
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${projection([d.lon, d.lat])})`)
      .attr('text-anchor', 'middle');

    elemEnter.append('circle').attr('r', 3);

    elemEnter
      .append('text')
      .attr('y', -10)
      .text((d) => {
        // console.log(d);
        return d.description;
      });

    elem.each(function (d) {
      // console.log(d);
      this.classList.add(d.name.replace(/ /g, '-'), 'capital');
    });
  });

  // Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
  const legend = d3
    .select('body')
    .append('svg')
    .attr('class', 'legend')
    .attr('width', 140)
    .attr('height', 200)
    .selectAll('g')
    .data(color.domain().slice().reverse())
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
      return 'translate(0,' + i * 20 + ')';
    });

  legend
    .append('rect')
    .attr('width', 18)
    .attr('height', 18)
    .style('fill', color);

  legend
    .append('text')
    .data(legendText)
    .attr('x', 24)
    .attr('y', 9)
    .attr('dy', '.35em')
    .text(function (d) {
      return d;
    });
});
// });
