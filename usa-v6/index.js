const path = d3.geoPath();
const svg = d3.select('body').append('svg').attr('viewBox', [0, 0, 975, 610]);
// const svg = d3.create('svg').attr('viewBox', [0, 0, 975, 610]);

// https://observablehq.com/@mbostock/u-s-state-map
// https://observablehq.com/@d3/u-s-map

d3.json('data/counties-albers-10m.json').then((us) => {
  // svg
  //   .append('path')
  //   .datum(topojson.feature(us, us.objects.nation))
  //   .attr('fill', '#e0e0e0')
  //   .attr('d', path);

  // svg
  //   .append('path')
  //   .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
  //   .attr('fill', 'none')
  //   .attr('stroke', 'white')
  //   .attr('stroke-linejoin', 'round')
  //   .attr('d', path);

  svg
    .append('g')
    .attr('fill', '#ccc')
    .selectAll('path')
    .data(topojson.feature(us, us.objects.states).features)
    .enter()
    .append('path')
    .attr('d', path)
    .on('click', (_, d) => {
      console.log(d.properties.name);
      // const node = svg.node();
      // node.value = value = value === d.id ? null : d.id;
      // node.dispatchEvent(new CustomEvent('input'));
      // outline.attr('d', value ? path(d) : null);
    });

  svg
    .append('path')
    .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-linejoin', 'round')
    .attr('pointer-events', 'none')
    .attr('d', path);

  const outline = svg
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-linejoin', 'round')
    .attr('pointer-events', 'none');
});
