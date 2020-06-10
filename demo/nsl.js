function traverse(node, func) {
  if (func(node) === false) return;
  if (node.children) node.children.forEach(n => traverse(n,func));
}
function collapse(node) {
  if (node.children && node.children.length > 0) node._children = node.children;
  node.children = null;
}
function expand(node) {
  if (node._children && node._children.length > 0) node.children = node._children;
  node._children = null;
}
function toggle(node) {
  node.children ? collapse(node) : expand(node);
}
function get_nodes(node) {
  let nodes = [];
  traverse(node, n => nodes.push(n));
  return nodes;
}
function clone(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  let copy = Array.isArray(obj) ? [] : {};
  for (let key of Object.keys(obj)) copy[key] = clone(obj[key]);
  return copy;
}
function request_json(node) {
  return;
  if (node._children) return;
  let id = node.name.split(':').pop();
  let url = 'https://id.biodiversity.org.au/taxon/apni/' + id + '.json';
  console.log(url);
  //fetch('https://biodiversity.org.au/nsl/services/rest/name/apni/70914.json', {mode:'cors'})
  (fetch(url, {mode:'cors'})
    .then(response => response.json())
    .then(data => show_meta(data))
    .catch(e => {
      console.error(e);
    })
  );
}
function show_meta(data) {
  document.querySelector('#info_panel').innerText = JSON.stringify(data,null,2);
}

let original = null;

function render(raw_data) {
  if (raw_data) original = raw_data;
  let root = clone(original);
  const duration = 500;

  let id = 0;
  let totalNodes = 0;
  let maxLabelLength = 0;
  let dfs_order = 0;
  root.depth = 0;
  root.path_length = root.name.length;

  traverse(root, node => {
    totalNodes += 1;
    node.dfs_order = dfs_order++;
    maxLabelLength = Math.max(node.name.length, maxLabelLength);
    if (node.children) node.children.forEach(child => {
	  child.depth = node.depth + 1;
	  child.path_length = node.path_length + child.name.length;
    });
  });
  maxLabelLength = 20;

  let viewerWidth = document.body.offsetWidth;
  let viewerHeight = document.body.offsetHeight;
  let tree = d3.layout.tree().size([viewerHeight, viewerWidth]);
  root.x0 = viewerHeight / 2;
  root.y0 = 0;

  // define a d3 diagonal projection for use by the node paths later on.
  let diagonal = d3.svg.diagonal().projection(function(d) {
    return [d.y, d.x];
  });

  // zooming
  function zoom() {
    svgGroup.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
  }
  let zoom_handler = d3.behavior.zoom().scaleExtent([0.1, 10]).on("zoom", zoom);

  // define the baseSvg, attaching a class for styling and the zoom_handler
  let baseSvg = (d3.select("#tree-container")
    .html("")
    .append("svg")
    .attr("width", viewerWidth)
    .attr("height", viewerHeight)
    .attr("class", "overlay")
    .call(zoom_handler)
  );
  let svgGroup = baseSvg.append("g"); // group for all SVG elements

  // center node when clicked
  function center(node) {
    let scale = zoom_handler.scale();
    let x = -node.y0;
    let y = -node.x0;
    x = x * scale + viewerWidth / 2;
    y = y * scale + viewerHeight / 2;
    (d3.select('g')
      .transition()
      .duration(duration)
      .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")")
    );
    zoom_handler.scale(scale);
    zoom_handler.translate([x, y]);
  }

  function click(node) {
    if (d3.event.defaultPrevented) return; // click suppressed
    toggle(node);
    update(node);
    center(node);
    request_json(node);
  }

  function update(source)
  {
    // node counts at each depth of the visible tree
    let counts = [1];
    traverse(root, node => {
      if (counts[node.depth] === undefined) counts[node.depth] = 0;
      counts[node.depth] += node.children ? node.children.length : 0;
    });
    let newHeight = d3.max(counts) * 25; // 25 pixels per line
    tree = tree.size([newHeight, viewerWidth]);

    let nodes = tree.nodes(root);//.reverse();
    let links = tree.links(nodes);

    nodes.forEach(function(node) {
	  //node.y = 10 * node.path_length;
	  node.y = (node.depth * (maxLabelLength * 10));
      //node.y = (node.depth * 500); //500px per level.
    });
    let node = (svgGroup
	  .selectAll("g.node")
      .data(nodes, function(node) { return node.id || (node.id = ++id); })
    );

    let nodeEnter = (node
	  .enter()
	  .append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
      })
      .on('mouseup', click)
    );
    (nodeEnter
	  .append("circle")
      .attr('class', 'nodeCircle')
      .attr("r", 0)
      .style("fill", function(d) {
        return d._children ? "lightsteelblue" : "#fff";
      })
    );
    (nodeEnter
	  .append("text")
      .attr("x", function(d) {
        return d.children || d._children ? -10 : 10;
      })
      .attr("dy", ".35em")
      .attr('class', 'nodeText')
      .attr("text-anchor", function(d) {
        return d.children || d._children ? "end" : "start";
      })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 0)
    );

    (node
	  .select('text')
      .attr("x", function(d) {
        return d.children || d._children ? -10 : 10;
      })
      .attr("text-anchor", function(d) {
        return d.children || d._children ? "end" : "start";
      })
      .text(function(d) { return d.name; })
    );
    (node
	  .select("circle.nodeCircle")
      .attr("r", 4.5)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; })
    );

    // node animations
    let nodeUpdate = (node
	  .transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
    );
    nodeUpdate.select("text").style("fill-opacity", 1);

    let nodeExit = (node
	  .exit()
	  .transition()
      .duration(duration)
      .attr("transform", function(d) {
        return "translate(" + source.y + "," + source.x + ")";
      })
      .remove()
    );
    nodeExit.select("circle").attr("r", 0);
    nodeExit.select("text").style("fill-opacity", 0);

    // link configuration and animation
    let link = (svgGroup
	  .selectAll("path.link")
      .data(links, function(d) { return d.target.id; })
    );
    (link
	  .enter()
	  .insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        let o = {
          x: source.x0,
          y: source.y0
        };
        return diagonal({
          source: o,
          target: o
        });
      })
    );
    link.transition().duration(duration).attr("d", diagonal);
    (link
	  .exit()
	  .transition()
      .duration(duration)
      .attr("d", function(d) {
        let o = {
          x: source.x,
          y: source.y
        };
        return diagonal({
          source: o,
          target: o
        });
      })
      .remove()
    );
    nodes.forEach(function(d) { // records old position
      d.x0 = d.x;
      d.y0 = d.y;
    });
}

  // close everything by default, then open up to family
  get_nodes(root).forEach(collapse);
  traverse(root, node => {
	if (/^Familia.*/.test(node.name)) return false;
	expand(node);
  });

  // Layout the tree initially and center on the root node.
  update(root);
  center(root);
}
let timer = null;
window.addEventListener('resize', function (e) {
  clearTimeout(timer);
  timer = setTimeout(render,300);
  //window.requestAnimationFrame(() => render());
});
