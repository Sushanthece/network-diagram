var width = 940,
    height = 500;

var color = d3.scale.category20c();

var force = d3.layout.force()
    .charge(-10)
    .linkDistance(250)
    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.csv("words.csv", function(nodes) {

    d3.csv("bigrams.csv", function(links) {
    
 links.forEach(function(o) {
      o.source = parseInt(o.source); 
      o.target = parseInt(o.target);
      o.value = parseInt(o.value); });

nodes.forEach(function(o) {
      o.value = parseInt(o.value); });

  force
      .nodes(nodes)
      .links(links)
      .start(100);

  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.pow(d.value,0.15); });

  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", function(d) { return Math.pow(d.value,0.2); })
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return ' Name : '+d.name+', '+d.value+' Occurrences'; });
      
  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
});
});
