# Taxonomic tree management via GitHub

A classification of taxa is a named tree structure consisting of: 

* nodes: ../data/census_tree_nodes.tsv
* edges: ../data/census_tree_edges.tsv

Each node is a Taxon that is included in the APC classfication. 
Each edge is a link between a Taxon and a parent Taxon. 

To rebuild these into a tree and export the data in a variety of other formats, go into the code directory and run 
`node compile_tree.js` 

NodeJS here: https://nodejs.org/en/

These files are small enough to host on GitHub, which has a limit of 100MB per file. Git is essentially an accumulation-only database with version history, meaning that the state of a taxonomic tree can be altered over time, the differences can be tracked, and it's possible to revisit any prior state. 

Technically, to put a tree structure under version control, the nodes do not have to be included here as the IDs can be linked back to APC online. 
 
https://id.biodiversity.org.au/instance/apni/{id} 

The only file that's essential for a tree is the edges file, consisting of, at a bare minimum, two columns of integers. 

# Managing different tree structures

One way is simply to commit an independent file of links (and new nodes if they are not hosted at NSL). One tree, one file. 

Another way is to create a branch in the repo and take the tree in your own direction within that branch. (Or fork the entire repo). Pull requests may be issued by tree editors to notify NSL that suggested changes to the APC are ready for review. 

Another way, is to modify the node IDs in an edge file to include an institutional prefix. This ensures that keys are globally unique. Any number of participants may modify the same tree so long as they use the prefix:id format. By filtering edges based on the prefix, it is possible reconstruct different tree variants from the same source data.
