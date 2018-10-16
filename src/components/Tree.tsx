// tslint:disable:no-console
import ProcessData from "@app/components/ProcessData";
import style from "@app/components/Style";
import cytoscape from "cytoscape";
import coseBilkent from "cytoscape-cose-bilkent";
import React, { Component } from "react";
import { rootNodeId } from "./data";
cytoscape.use(coseBilkent);

const layout = {
  animate: false,
  componentSpacing: 100,
  coolingFactor: 0.95,
  edgeElasticity: 50,
  fit: true,
  gravity: 1,
  idealEdgeLength: 100,
  initialTemp: 1500,
  minTemp: 1.0,
  name: "cose",
  nestingFactor: 5,
  nodeOverlap: 10,
  nodeRepulsion: 400000,
  numIter: 1000,
  padding: 10,
  randomize: false,
  refresh: 20
};

// const layout = {
//   // Type of layout animation. The option set is {'during', 'end', false}
//   animate: false,
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
//   nodeRepulsion: 15000,
//   // Maximum number of iterations to perform
//   numIter: 1000,
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
  private foldedNodes: any[] = [];
  private currentLocation: any;

  public componentDidMount() {
    const elements = ProcessData.run();
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

  public shouldComponentUpdate() {
    return false;
  }

  public render = () => {
    return (
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
    );
  };

  private handleTap = (event: any): void => {
    // console.log("handleTap", event.type);
    const { target } = event;

    if (target === this.cy) {
      return;
    }

    if (target.isNode()) {
      // console.log(target)
      const cy = this.cy;
      const touchedNode = this.foldedNodes.find(
        n => n.target.id() === target.id()
      );
      const selectChildsElements = (target2: any) =>
        target.id() === rootNodeId
          ? cy
              .elements()
              .difference(
                target2
                  .connectedEdges()
                  .union(target2.connectedEdges().connectedNodes())
              )
          : target.successors().union(target.successors().connectedEdges());

      if (touchedNode) {
        const index = this.foldedNodes.indexOf(touchedNode);
        // console.log(touchedNode);
        if (touchedNode.folded) {
          touchedNode.collection.restore();
          touchedNode.folded = false;
        } else {
          const collection = selectChildsElements(target);

          touchedNode.collection = collection;
          cy.remove(collection);
          touchedNode.folded = true;
          target.restore();
        }
        this.foldedNodes.splice(index, 1, touchedNode);
      } else {
        const collection = selectChildsElements(target);
        // console.log(collection.map((c: any) => c.data.id))
        this.foldedNodes.push({
          collection,
          folded: true,
          target
        });
        cy.remove(collection);
        target.restore();
      }
    }
    // console.log(this.foldedNodes);
  };

  private handleDrag = (event: any) => {
    // console.log("handleGrab", event.type);
    const { target, type } = event;

    const cy = this.cy;

    if (type === "free") {
      cy.removeListener("tapdrag");

      return;
    }

    if (target === this.cy) {
      return;
    }

    this.currentLocation = event.position;
    const collection = target.successors();
    collection.map((c: any) => {
      c.scratch()._x = c.position().x;
      c.scratch()._y = c.position().y;

      return c;
    });

    cy.on("tapdrag", (evt: any) => {
      const moveX = evt.position.x - this.currentLocation.x;
      const moveY = evt.position.y - this.currentLocation.y;

      collection.positions((c: any) => {
        const x = c.scratch()._x + moveX;
        const y = c.scratch()._y + moveY;

        return { x, y };
      });
    });
  };
}

export default Graph;
