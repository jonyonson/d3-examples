// const projection = d3.geoEqualEarth();
// const path = d3.geoPath(projection)

const path = d3.geoPath();
const svg = d3.select('body').append('svg').attr('viewBox', [0, 0, 975, 610]);

d3.json('data/counties-albers-10m.json').then((us) => {
  // console.log(topojson.feature(us));
  console.log(topojson.feature(us, us.objects.nation).features);
  svg
    .append('path')
    .datum(topojson.feature(us, us.objects.nation))
    .attr('fill', '#e0e0e0')
    .attr('d', path)
    .on('click', (d) => {
      console.log(d.properties);
    });

  svg
    .append('path')
    .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-linejoin', 'round')
    .attr('d', path);

  const blah = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
  console.log(us);

  // .on('click', (d) => {
  //   console.log(d);
  // });

  // .on('click', (e) => {
  //   console.log(e);
  // });
});
