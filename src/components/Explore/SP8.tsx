// tslint:disable:no-console
import cytoscape from "cytoscape";
import coseBilkent from "cytoscape-cose-bilkent";
import React, { Component } from "react";
import data from "./sp8data";

import iconHBP from "../../images/hbp-logo.png";
import iconHospital from "../../images/icon-hospital.png";
import iconExt from "../../images/logo_chuv.png";

cytoscape.use(coseBilkent);

const style: cytoscape.CssStyleDeclaration = [
  {
    selector: "node",
    style: {
      "background-color": "pink",
      "border-color": "#000",
      "border-opacity": 0.6,
      "border-width": 0,
      color: "#000",
      height: "44px",
      label: "data(label)",
      padding: 5,
      shape: "ellipse",
      "text-max-width": "160px",
      "text-valign": "bottom",
      "text-wrap": "wrap",
      // "text-halign": "center",
      // "text-valign": "center",
      width: "44px"
    }
  },
  {
    selector: "node[type = 'HOSPITAL']",
    style: {
      "background-fit": "cover",
      "background-image": iconHospital,
      "background-image-opacity": "0.6"
    }
  },
  {
    selector: "node[type = 'EXT']",
    style: {
      "background-fit": "cover",
      "background-image": iconExt,
      "background-image-opacity": "0.6"
    }
  },
  {
    selector: "node[type = 'HBP']",
    style: {
      "background-fit": "cover",
      "background-image": iconHBP,
      "background-image-opacity": "0.6"
    }
  },
  {
    selector: "node[level = 0]",
    style: {
      "background-color": "#6B6A68"
    }
  },
  {
    selector: "node[level = 1]",
    style: {
      "background-color": "#068587"
    }
  },
  {
    selector: "node[level = 2]",
    style: {
      "background-color": "#4FB99F"
    }
  },
  {
    selector: "node[level = 3]",
    style: {
      "background-color": "#F2B134"
    }
  },
  {
    selector: "node[level = 4]",
    style: {
      "background-color": "#ED553B"
    }
  },
  {
    selector: "node[level = 5]",
    style: {
      "background-color": "#000"
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
    selector: "edge[level = 0]",
    style: {
      "line-color": "#6B6A68"
    }
  },
  {
    selector: "edge[level = 1]",
    style: {
      "line-color": "#068587"
    }
  },
  {
    selector: "edge[level = 2]",
    style: {
      "line-color": "#4FB99F"
    }
  },
  {
    selector: "edge[level = 3]",
    style: {
      "line-color": "#F2B134"
    }
  },
  {
    selector: "edge[level = 4]",
    style: {
      "line-color": "#ED553B"
    }
  },
  {
    selector: "edge[level = 5]",
    style: {
      "line-color": "#000"
    }
  }
];

const layout = {
  animate: "during",
  componentSpacing: 100,
  coolingFactor: 0.95,
  edgeElasticity: 100,
  fit: true,
  gravity: 0,
  idealEdgeLength: 100,
  initialTemp: 1000,
  minTemp: 1.0,
  name: "cose",
  nestingFactor: 5,
  nodeOverlap: 20,
  nodeRepulsion: 400000,
  numIter: 10000,
  padding: 50,
  randomize: false,
  refresh: 20
};

// const layout = {
//   // Type of layout animation. The option set is {'during', 'end', false}
//   animate: "during",
//   // Divisor to compute edge forces
//   edgeElasticity: 0.15,
//   // Whether to fit the network view after when done
//   fit: true,
//   // Gravity force (constant)
//   gravity: 0.25,
//   // Gravity force (constant) for compounds
//   gravityCompound: 2.0,
//   // Gravity range (constant)
//   gravityRange: 3.8,
//   // Gravity range (constant) for compounds
//   gravityRangeCompound: 1.5,
//   // Ideal (intra-graph) edge length
//   idealEdgeLength: 50,
//   // Initial cooling factor for incremental layout
//   initialEnergyOnIncremental: 0.9,
//   name: "cose-bilkent",
//   // Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
//   nestingFactor: 0.5,
//   // Whether to include labels in node dimensions. Useful for avoiding label overlap
//   nodeDimensionsIncludeLabels: true,
//   // Node repulsion (non overlapping) multiplier
//   nodeRepulsion: 105000,
//   // Maximum number of iterations to perform
//   numIter: 10000,
//   // Padding on fit
//   padding: 10,
//   // Whether to enable incremental mode
//   randomize: false,
//   // number of ticks per frame; higher is faster but more jerky
//   refresh: 30,
//   // Whether to tile disconnected nodes
//   tile: false,
//   // Amount of horizontal space to put between degree zero nodes during tiling (can also be a function)
//   tilingPaddingHorizontal: 10,
//   // Amount of vertical space to put between degree zero nodes during tiling (can also be a function)
//   tilingPaddingVertical: 10
// };

class Graph extends Component<any> {
  private cy: any;
  private cyRef: any;
  private tapped = false;
  private collection: any;
  private edges: any;
  // private createdNode: any;
  // private nearestNode: any;

  public componentDidMount() {
    const nodes: any = [];
    const edges: any = [];

    const makeId = (r: string) =>
      r !== "" && r !== "..." ? r.split(" ").join("") : null;

    // Build nodes from csv
    data.forEach(row => {
      const computedRow = Object.keys(row).filter(
        key => key !== "Type" && row[key] !== "" && row[key] !== "..."
      );

      computedRow.forEach((key, i) => {
        const val = row[key];
        const id = makeId(val);

        // node already exists
        if (nodes.find((n: any) => n.data.id === id)) {
          return;
        }

        let level = 0;
        const level3 = row["Niveau 3"];
        if (level3 === "EpiCARE") {
          level = 1;
        }

        if (level3 === "CENTER TBI") {
          level = 2;
        }

        if (level3 === "CREACTIVE") {
          level = 3;
        }

        if (level3 === "WP8.8 and 8.10 : Federated analysis of human intracerebral stimulation and recording data") {
          level = 4;
        }

        if (row["Niveau 2"] === "SGA1 Partnering Hospitals") {
          level = 5;
        }

        if (level3 === "WP8.8 and 8.10 : Federated analysis of human intracerebral stimulation and recording data") {
          level = 6;
        }

        // const parentNode = nodes.filter((n: any) => {
        //   const row1 = n.data.data;
        //   const path = Object.keys(row1).map(key1 => makeId(row1[key1]));
        //   if (path) {
        //     return path.includes(id);
        //   }

        //   return false;
        // })

        // console.log(id, parentNode);

        let type: string | undefined = row.Type;
        if (Object.keys(computedRow).length - 1 !== i) {
          type = undefined;
        }

        const node = {
          data: {
            data: row,
            id,
            label: val,
            level,
            type
            // parent: parent ? parent : undefined
          }
        };
        nodes.push(node);
      });
    });

    // Build edges
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
        if (!id2) {
          return;
        }
        if (edges.find((e: any) => e.source === id && e.target === id2)) {
          return;
        }

        const node1 = nodes.find((n: any) => n.data.id === id);
        console.log(node1.data.level);

        edges.push({
          data: {
            id: `${id}-${id2}`,
            level: node1 ? node1.data.level : null,
            source: id,
            target: id2
          }
        });
        console.log(edges)
      });
    });

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
    cy.on("tap", (evt: any) => {
      this.handleTap(evt);
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

  public render = () => {
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
  };

  private handleTap = (event: any): void => {
    console.log("handleTap", event.type, "this.tapped", this.tapped);
    const { target } = event;
    // const id = Math.round(Math.random() * 100000);
    console.log(target);

    if (target === this.cy) {
      return;
    }

    if (target.isNode()) {
      if (!this.tapped) {
        this.tapped = true;
        const cy = this.cy;
        this.edges = cy
          .elements()
          .edgesWith(target):
        this.collection = this.edges.targets()
        // cy.nodes().hidden = true;
        console.log(this.collection);
        cy.remove(this.collection);
        target.restore();
      } else {
        console.log(this.collection);
        this.collection.restore();
        this.edges.restore()
        this.tapped = false;
      }
    }
  };

  // private handleDrag = (event: any) => {
  //   console.log("handleGrab", event.type, this.nearestNode);
  //   const { target, type } = event;
  //   const cy = this.cy;

  //   if (type === "free") {
  //     cy.removeListener("tapdrag");
  //     // target.style({ "background-color": "gray" });
  //     if (this.nearestNode) {
  //       // this.nearestNode.style({ "background-color": "gray" });
  //     }

  //     return;
  //   }

  //   // target.style({ "background-color": "cornflowerblue" });
  //   let handled = false;
  //   const nodes = cy.nodes();

  //   const nearestNodeFrom = (p: any, max = 20) => {
  //     nodes.forEach((n: any) => {
  //       const p1 = n.position();
  //       const distance = Math.sqrt(
  //         Math.pow(p1.x - p.x, 2) + Math.pow(p1.y - p.y, 2)
  //       );
  //       n.data("distance", distance); // TODO: n.scratch
  //     });

  //     const { ele } = nodes
  //       .filter((n: any) => n.id() !== target.id())
  //       .filter(`[distance < '${max}']`)
  //       .min((n: any) => n.data("distance"));

  //     return ele;
  //   };

  //   cy.on("tapdrag", (evt: any) => {
  //     const tryNearestNode = nearestNodeFrom(evt.position);
  //     if (!tryNearestNode || handled) {
  //       return;
  //     }

  //     this.nearestNode = nearestNodeFrom(evt.position);
  //     this.nearestNode.style({ "background-color": "cornflowerblue" });
  //     handled = true;

  //     const s = target.id();
  //     const t = this.nearestNode.id();
  //     const id = `${s}${t}`;
  //     const edges = this.nearestNode.edgesWith(target);

  //     if (edges.length) {
  //       cy.remove(edges.shift());
  //     } else {
  //       cy.add({
  //         data: { id, source: s, target: t },
  //         group: "edges"
  //       });
  //     }
  //   });
  // };
}

export default Graph;
