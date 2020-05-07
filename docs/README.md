# Taxonomic tree management via GitHub

A classification of taxa is a named tree structure consisting of: 

* nodes: ../data/census_tree_nodes.tsv
* edges: ../data/census_tree_edges.tsv

Each node is a Taxon that is included in the APC classfication. 
Each edge is a link between a Taxon and a parent Taxon. 

To rebuild these into a tree and export the data in a variety of other formats, go into the code directory and run `node compile.js`; 

(Install NodeJS from here if needed: https://nodejs.org/en/)

These files are small enough to host on GitHub, which has a limit of 100MB per file. Git is essentially an accumulation-only database with version history, meaning that the state of a taxonomic tree can be altered over time, the differences can be tracked, and it's possible to revisit any prior state. 

Technically, to put a tree structure under version control, the nodes do not have to be included here as the IDs can be linked back to APC online. 
 
https://id.biodiversity.org.au/instance/apni/{id} 

The only file that's really essential for a tree is the edges file, consisting of, at a bare minimum, two columns of integers. 

# Managing different tree structures

The first way is to simply commit an indepent file of links (and new nodes if they are not hosted at NSL). 

The second way is to create a branch in the repo and take the tree in your own direction within that branch. (Or fork the entire repo). Pull requests may be issued by tree editors to notify NSL that suggested changes to the APC are ready for review. 

A third way, is to modify the node IDs to include an institutional prefix (IDs must be globally unique). Any number of participants may then make changes to the primary tree and filter by prefix to compile out specific trees. 
