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
function request_node(id, cb)
{
  let url = 'http://kens-mate-002.lan.fyi:8211/graph/node/' + id;
  (fetch(url, {mode:'cors'})
    .then(response => response.json())
    .then(data => {
      if (data.success == false) throw data.message;
      document.querySelector('#info_panel').innerText = JSON.stringify(data,null,2);
      cb(data.response);
    })
    .catch(function(e) {
      console.log(e);
    })
  );
}
//http://kens-mate-002.lan.fyi:8211/graph/node/20526/edge-select/
//{"success": true, "message": "", "response": {"id": 20526, "class": "Published name", "object": "Plantae", "metadata": {"rank": "Kingdom"}, "edges": {"out": {"taxonomic_parent_of": [25177, 33231, 33232, 33233, 33709, 34202, 34203, 34204, 34205, 34206, 34207, 34208, 34209, 34210, 34211, 34212, 34213, 34283, 34284, 34285, 34286, 34287, 34288, 34289, 34290, 34291, 34292, 34293, 34294, 34295, 34296, 34297, 34298, 34299, 34300, 34302, 34303, 34304, 34305, 34322, 34323, 34324, 34325, 34392, 34393, 34394, 34395, 34396, 34397, 34398, 34399, 34400, 34401, 34402, 34403, 34404, 34405, 34406, 34407, 34408, 34409, 34410, 34411, 34412, 34413, 34414, 34415, 34416, 34417, 34418, 34419, 34420, 34421, 34422, 34423, 34424, 34480, 34481, 34482, 34483, 34484, 34485, 34487, 34488, 34490, 34491, 34492, 34495, 34496, 34499, 34504, 34505, 34506, 34508, 34509, 34510, 34511, 34512, 34513, 34557, 34558, 34559, 34560, 34561, 34562, 34563, 34564, 34598, 34599, 34600, 34602, 34604, 34605, 34606, 34609, 34610, 34611, 34612, 34613, 34615, 34617, 34619, 34620, 34621, 36101, 36798, 36801, 36803, 36807, 36831, 36836, 36837, 36838, 36877, 36878, 36879, 36902, 36909, 36914, 36919, 36920, 36923, 36925, 36926, 36927, 36947, 36949, 36950, 36952, 36954, 36955, 36956, 36959, 36962, 36963, 36964, 36965, 36973, 36974, 36975, 36976, 36977, 36978, 36979, 36980, 36981, 36982, 36983, 36984, 38199, 38826, 39268, 39373, 39694, 39712, 40876, 40877, 40878, 40914, 40915, 40916, 42931, 43442, 43491, 43630, 43897, 43965, 43983, 44002, 44037, 44038, 44039, 44103, 44106, 44168, 44240, 44243, 44354, 44443, 44577, 44645, 44715, 44733, 44780, 44781, 44783, 44873, 44918, 44926, 44928, 44936, 44982, 44984, 45012, 45036, 45040, 45097, 45144, 45215, 45224, 45231, 45232, 45426, 45427, 45428, 45430, 45439, 45497, 45565, 45566, 45597, 45622, 45693, 45700, 45762, 47064, 47145, 48796, 48847, 48853, 48854, 48855, 48862, 48863, 48864, 48869, 48879, 49053, 49066, 49067, 49228, 49576, 49609, 49620, 49641, 49643, 49745, 49752, 49866]}, "in": {"taxonomic_child_of": [225, 8915, 8916, 8917, 9430, 9963, 9964, 9965, 9966, 9967, 9968, 9969, 9970, 9971, 9972, 9973, 9974, 10049, 10050, 10051, 10053, 10054, 10055, 10056, 10057, 10058, 10059, 10060, 10061, 10062, 10063, 10064, 10066, 10067, 10069, 10071, 10072, 10073, 10074, 10092, 10093, 10094, 10095, 10167, 10168, 10169, 10170, 10171, 10172, 10174, 10175, 10176, 10177, 10178, 10179, 10180, 10181, 10182, 10183, 10184, 10185, 10186, 10187, 10189, 10190, 10191, 10192, 10193, 10194, 10195, 10196, 10197, 10198, 10199, 10200, 10202, 10262, 10263, 10265, 10266, 10267, 10268, 10270, 10271, 10273, 10274, 10275, 10278, 10280, 10283, 10288, 10289, 10290, 10292, 10293, 10295, 10296, 10297, 10298, 10346, 10347, 10348, 10349, 10350, 10351, 10352, 10353, 10390, 10391, 10392, 10394, 10396, 10397, 10398, 10402, 10403, 10404, 10405, 10406, 10408, 10410, 10412, 10413, 10414, 12012, 12764, 12767, 12769, 12774, 12800, 12806, 12807, 12808, 12850, 12851, 12852, 12876, 12884, 12889, 12895, 12896, 12899, 12901, 12902, 12903, 12926, 12928, 12929, 12931, 12933, 12934, 12935, 12938, 12942, 12943, 12944, 12945, 12953, 12955, 12956, 12957, 12958, 12959, 12960, 12961, 12962, 12963, 12964, 12965, 14276, 14949, 15426, 15540, 15886, 15905, 17162, 17163, 17164, 17203, 17204, 17205, 19325, 19927, 19979, 20130, 20418, 20491, 20511, 20531, 20569, 20571, 20572, 20640, 20643, 20711, 20788, 20791, 20911, 21007, 21152, 21226, 21301, 21320, 21372, 21373, 21375, 21471, 21520, 21529, 21531, 21540, 21589, 21591, 21621, 21648, 21652, 21713, 21765, 21841, 21850, 21858, 21859, 22071, 22072, 22073, 22075, 22084, 22145, 22219, 22220, 22253, 22280, 22357, 22364, 22431, 23837, 23923, 9267, 9962, 10052, 10065, 10068, 10173, 10188, 10201, 10264, 10400, 12772, 12939, 12954, 15220, 19980, 20419, 20570, 20857, 20887, 22277, 22368, 23924]}}}}

function request_edges(id, cb)
{
  let url = 'http://kens-mate-002.lan.fyi:8211/graph/node/' + id + '/edge-select/';//?type=taxonomic_parent_of';
  (fetch(url, {mode:'cors'})
    .then(response => response.json())
    .then(data => {
      if (data.success == false) throw data.message;
      document.querySelector('#info_panel').innerText = JSON.stringify(data,null,2);
      cb(data.response.edges.out.taxonomic_parent_of);
    })
    .catch(e => {
      console.error(e);
    })
  );
}

let original = null;

function render(raw_data)
{
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

    if (!node.loaded && !node.loading) {
      node.loading = true;
      request_node(node.name, data => {
        node.taxon = `${data.metadata.rank}:${data.object}`;
        delete node._children;
        node.children = [];

        request_edges(node.name, edges => {
          node.loaded = true;
          delete node.loading;
          edges.forEach(id => {
            node.children.push({
              name : id,
              taxon : id,
              parent : node.name,
              loaded : false
            })
          });
          update(node);
          center(node);
          request_names(node);
        });
      });
    }
  }

  async function request_names(parent)
  {
    for (let child of parent.children) {
      await request_name(child);
      update(child);
      center(child);
    }
    console.log(JSON.stringify(errors));
  }
  let errors = [];

  // given a node, request its name from the server
  async function request_name(node) {
    try {
      let url = 'http://kens-mate-002.lan.fyi:8211/graph/node/' + node.name;
      let response = await fetch(url, {mode:'cors'});
      let data = await response.json();
      if (data.success == false) {
        console.error(node.name, data.message);
        errors.push(node.name);
      }
      document.querySelector('#info_panel').innerText = JSON.stringify(data,null,2);
      let rank = data.response.metadata.rank;
      let name = data.response.object;
      node.taxon = `${rank}:${name}`;
    }
    catch (e) {
      console.error(e);
    }
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
      .text(function(d) { return `${d.taxon}:${d.name}`; })
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
