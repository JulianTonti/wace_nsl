/*

2020-05-07-Thu: created <julian.tonti@gmail.com>

*/
const fs = require('fs');

function main(ofile='ofile')
{
  let root = build_tree(load()).children[0];
  root.parent = null;

  // assign each node a depth value based on the parent
  traverse(root, node => node.depth = node.parent ? node.parent.depth + 1 : 0);

  // write the various output formats
  save_tree_json (ofile+'_tree.json', root);
  save_table_tsv (ofile+'_rows_tree.tsv', root);
  save_table_json(ofile+'_rows_json.txt', root);
  save_flat_path (ofile+'_rows_flat.tsv', root);
  save_tree_edges(ofile+'_tree_edges.tsv', root);
  save_tree_nodes(ofile+'_tree_nodes.tsv', root);
}
function load()
{
  let nodes = load_table('../data/census_tree_nodes.tsv');
  let edges = load_table('../data/census_tree_edges.tsv');
  
  function load_table(ifile) {
    let [headers, ...rows] = (fs
      .readFileSync(ifile)
      .toString()
      .split("\n")
      .map(line => line.split("\t"))
    );
    rows = rows.map(row => {
      let obj = {};
      row.forEach( (val,i) => obj[headers[i]] = val);
      return obj;
    });
    return rows;
  };
  return { nodes, edges };
}
function build_tree({nodes, edges})
{
  let root = {
    parent_id : null,
    children : []
  };
  let map = { 0:root };

  nodes.forEach(node => {
    node.parent = null;
    node.children = [];
    node.depth = 0;
    map[node.id] = node
  });
  edges.forEach(edge => {
    let parent = map[edge.parent_id];
    let child = map[edge.id];
    child.parent = parent;
    child.parent_id = edge.parent_id;
    parent.children.push(child);
  });
  return root;
}
function traverse(node,func) {
  func(node);
  node.children.forEach(n => traverse(n,func));
}
function save(ofile,string) {
  //console.log(string);
  fs.writeFileSync(ofile,string);
}
function save_tree_json(ofile,root) {
  let stack = [{}];

  traverse(root, (n) => {
    stack[n.depth][n.tag] = {};
    stack[n.depth+1] = stack[n.depth][n.tag];
  });
  save(ofile, JSON.stringify(stack[0],null,2));
}
function save_table_tsv(ofile,root) {
  let lines = ["id\tparent_id\trank\tname"];
  traverse(root, (n) => {
    lines.push([
      n.id,
      n.parent_id,
      n.rank,
      n.name
    ].join("\t"));
  });
  save(ofile, lines.join("\n"));
}
function save_tree_nodes(ofile,root) {
  let lines = ["id\trank\tname\tauthorship"];
  traverse(root, (n) => {
    lines.push([
      n.id,
      n.rank,
      n.name,
      n.author
    ].join("\t"));
  });
  save(ofile, lines.join("\n"));
}
function save_tree_edges(ofile,root) {
  let lines = ["id\tparent_id"];
  traverse(root, (n) => {
    lines.push([
      n.id,
      n.parent_id
    ].join("\t"));
  });
  save(ofile, lines.join("\n"));
}
function save_table_json(ofile,root) {
  let lines = [];
  traverse(root, (n) => {
    lines.push(JSON.stringify({
      id   : n.id,
      parent_id : n.parent_id,
      rank : n.rank,
      name : n.name
    }));
  });
  save(ofile, lines.join("\n"));
}
function save_flat_path(ofile,root) {
  //let lines = ["id\tparent_id\tranks\tnames"];
  let lines = ["id\tparent_id\tclassification"];
  traverse(root, (node) => {
    let ranks = [];
    let names = [];
    let both = [];
    for (let n=node; n; n=n.parent) {
      ranks.push(n.rank);
      names.push(n.name);
      both.push(n.rank + ':' + n.name);
    }
    lines.push([
      node.id, 
      node.parent_id, 
      //ranks.reverse().join("/"),
      //names.reverse().join("/")
      both.reverse().join("/")
    ].join("\t"));
  });
  save(ofile, lines.join("\n"));
}
if (require.main === module) {
  main('../data/file');
}
