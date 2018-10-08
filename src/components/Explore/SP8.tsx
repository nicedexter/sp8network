// tslint:disable:no-console
import cytoscape from "cytoscape";
import coseBilkent from "cytoscape-cose-bilkent";
import React, { Component } from "react";
import data from "./sp8data";

cytoscape.use(coseBilkent);

const style: cytoscape.CssStyleDeclaration = [
  {
    selector: "node",
    style: {
      "background-color": "#ad1a66",
      color: "#fff",
      label: "data(label)",
      padding: 5,
      shape: "roundrectangle",
      "text-halign": "center",
      "text-valign": "center",
      width: "label"
    }
  },
  {
    selector: "node[level = 0]",
    style: {
      "border-color": "#000",
      "border-opacity": 0.6,
      "border-width": 2
    }
  },
  {
    selector: "node[level = 1]",
    style: {
      "background-color": "#fff",
      color: "#000"
    }
  },
  {
    selector: "node[level = 2]",
    style: {
      "background-color": "#FFC72C",
      color: "#000"
    }
  },
  {
    selector: "node[level = 3]",
    style: {
      "background-color": "#CCC00F",
      color: "#fff",
      "line-color": "#ad1a66"
    }
  },
  {
    selector: "node[level = 3]",
    style: {
      "background-color": "#999558",
      color: "#fff"
    }
  },
  {
    selector: "edge",
    style: {
      "line-color": "#ccc",
      width: 3
    }
  },
  {
    selector: "edge[type = 0]",
    style: {
      "line-color": "#fff",
      shape: "triangle"
    }
  },
  {
    selector: "edge[type = 1]",
    style: {
      "line-color": "#FFC72C"
    }
  },
  {
    selector: "edge[type = 2]",
    style: {
      "line-color": "#CCC00F"
    }
  },
  {
    selector: "edge[type = 3]",
    style: {
      "line-color": "#999558"
    }
  }
];

// const layout1 = {
//   animate: true,
//   componentSpacing: 100,
//   coolingFactor: 0.95,
//   edgeElasticity: 100,
//   fit: true,
//   gravity: 0,
//   idealEdgeLength: 100,
//   initialTemp: 1000,
//   minTemp: 1.0,
//   name: "cose",
//   nestingFactor: 5,
//   nodeOverlap: 20,
//   nodeRepulsion: 400000,
//   numIter: 1000,
//   padding: 50,
//   randomize: false,
//   refresh: 20
// };

const layout = {
  // Type of layout animation. The option set is {'during', 'end', false}
  animate: "during",
  // Divisor to compute edge forces
  edgeElasticity: 0.15,
  // Whether to fit the network view after when done
  fit: true,
  // Gravity force (constant)
  gravity: 0.25,
  // Gravity force (constant) for compounds
  gravityCompound: 1.0,
  // Gravity range (constant)
  gravityRange: 3.8,
  // Gravity range (constant) for compounds
  gravityRangeCompound: 1.5,
  // Ideal (intra-graph) edge length
  idealEdgeLength: 50,
  // Initial cooling factor for incremental layout
  initialEnergyOnIncremental: 0.9,
  name: "cose-bilkent",
  // Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
  nestingFactor: 0.5,
  // Whether to include labels in node dimensions. Useful for avoiding label overlap
  nodeDimensionsIncludeLabels: true,
  // Node repulsion (non overlapping) multiplier
  nodeRepulsion: 145000,
  // Maximum number of iterations to perform
  numIter: 10000,
  // Padding on fit
  padding: 10,
  // Whether to enable incremental mode
  randomize: true,
  // number of ticks per frame; higher is faster but more jerky
  refresh: 30,
  // Whether to tile disconnected nodes
  tile: false,
  // Amount of horizontal space to put between degree zero nodes during tiling (can also be a function)
  tilingPaddingHorizontal: 10,
  // Amount of vertical space to put between degree zero nodes during tiling (can also be a function)
  tilingPaddingVertical: 10
};

class Graph extends Component<any> {
  private cy: any;
  private cyRef: any;
  // private createdNode: any;
  private nearestNode: any;

  public componentDidMount() {
    const nodes: any = [];
    const edges: any = [];

    const makeId = (r: string) => r.split(" ").join("");

    data.forEach(row => {
      Object.keys(row)
        .filter(key => key !== "Type" && row[key] !== "" && row[key] !== "...")
        .forEach((key, i) => {
          const val = row[key];
          const id = makeId(val);

          if (nodes.find((n: any) => n.data.id === id)) {
            return;
          }

          let level = 0;
          if (row["Niveau 3"] === "EpiCARE" ) {
            level = 1
          } 

          if (row["Niveau 3"] === "CENTER TBI" ) {
            level = 2
          } 

          if (row["Niveau 3"] === "CREACTIVE" ) {
            level = 3
          } 

          if (row["Niveau 3"] === "ERN - RND" ) {
            level = 4
          } 

          nodes.push({
            data: {
              data: row,
              id,
              label: val,
              level
            }
          });
        });
    });

    nodes.forEach((node: any) => {
      const data1 = node.data.data;
      const values = Object.keys(data1)
        .slice(0, 4)
        .map(k => data1[k]);
      
        values.forEach((v, j) => {
        if (j + 1 >= values.length) {
          return;
        }

        const id = makeId(v);
        const id2 = makeId(values[j + 1]);
        if (!id2) { return; }
        if (edges.find((e: any) => e.source === id && e.target === id2)) {
          return;
        }
        edges.push({
          data: {
            id: `${id}-${id2}`,
            source: id,
            target: id2
          }
        });

        console.log(edges)
      });
    });

    // const roots = data.map(d =>
    //   Object.keys(d)
    //     .filter(key => key !== "Type" && d[key] !== "" && d[key] !== "...")
    //     .map((key, i) => `${d[key]}${i}`)
    // );

    // const newRoot = new Set();
    // roots.forEach(r => {
    //   r.forEach(n => {
    //     newRoot.add(n);
    //   });
    // });

    // const nodes: any = Array.from(newRoot).map((r, i) => {
    //   const level = parseInt(r.substring(r.length - 1, r.length), 10);
    //   return {
    //     data: {
    //       id: makeId(r),
    //       label: r.substring(0, r.length - 1),
    //       level
    //     }
    //   };
    // });

    // const edges: any = [];
    // roots.forEach(row => {
    //   row.forEach((n, j) => {
    //     if (j + 1 >= row.length) {
    //       return;
    //     }

    //     const edge = {
    //       data: {
    //         id: `${makeId(n)}-${makeId(row[j + 1])}`,
    //         source: makeId(n),
    //         target: makeId(row[j + 1])
    //       }
    //     };
    //     edges.push(edge);
    //   });
    // });

    const elements = {
      edges,
      nodes
    };

    const cy = cytoscape({
      autounselectify: true,
      boxSelectionEnabled: false,
      container: this.cyRef,
      elements,
      layout,
      style
    });

    this.cy = cy;
    // cy.on("tap", (evt: any) => {
    //   this.handleTap(evt);
    // });
    cy.on("grabon", (evt: any) => {
      this.handleDrag(evt);
    });
    cy.on("free", (evt: any) => {
      this.handleDrag(evt);
    });
  }

  public componentWillUnmount() {
    if (this.cy) {
      this.cy.destroy();
    }
  }

  public shouldComponentUpdate(nextProps: any, nextState: any) {
    return false;
  }

  public render() {
    return (
      <div>
        <div
          className="graph"
          ref={(cy: any) => {
            this.cyRef = cy;
          }}
          style={{
            display: "block",
            height: "100%",
            width: "100%"
          }}
        />
      </div>
    );
  }

  // private handleTap = (event: any): void => {
  //   console.log("handleTap", event.type);
  //   const cy = this.cy;
  //   const { target } = event;
  //   const id = Math.round(Math.random() * 100000);
  //   if (target === cy) {
  //     const newNode = {
  //       data: {
  //         id,
  //         label: "New task"
  //       },
  //       group: "nodes",
  //       position: event.position
  //     };
  //     cy.add(newNode);
  //     this.createdNode = newNode;
  //   } else if (target.isEdge()) {
  //     cy.remove(target);
  //   } else if (target.isNode()) {
  //     this.createdNode = target;
  //   }
  // };

  private handleDrag = (event: any) => {
    console.log("handleGrab", event.type, this.nearestNode);
    const { target, type } = event;
    const cy = this.cy;

    if (type === "free") {
      cy.removeListener("tapdrag");
      // target.style({ "background-color": "gray" });
      if (this.nearestNode) {
        // this.nearestNode.style({ "background-color": "gray" });
      }

      return;
    }

    // target.style({ "background-color": "cornflowerblue" });
    let handled = false;
    const nodes = cy.nodes();

    const nearestNodeFrom = (p: any, max = 20) => {
      nodes.forEach((n: any) => {
        const p1 = n.position();
        const distance = Math.sqrt(
          Math.pow(p1.x - p.x, 2) + Math.pow(p1.y - p.y, 2)
        );
        n.data("distance", distance); // TODO: n.scratch
      });

      const { ele } = nodes
        .filter((n: any) => n.id() !== target.id())
        .filter(`[distance < '${max}']`)
        .min((n: any) => n.data("distance"));

      return ele;
    };

    cy.on("tapdrag", (evt: any) => {
      const tryNearestNode = nearestNodeFrom(evt.position);
      if (!tryNearestNode || handled) {
        return;
      }

      this.nearestNode = nearestNodeFrom(evt.position);
      this.nearestNode.style({ "background-color": "cornflowerblue" });
      handled = true;

      const s = target.id();
      const t = this.nearestNode.id();
      const id = `${s}${t}`;
      const edges = this.nearestNode.edgesWith(target);

      if (edges.length) {
        cy.remove(edges.shift());
      } else {
        cy.add({
          data: { id, source: s, target: t },
          group: "edges"
        });
      }
    });
  };
}

export default Graph;
