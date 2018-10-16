// tslint:disable no-console
import cytoscape from "cytoscape";
import iconHBP from "../images/icon-hbp.png";
import iconHospital from "../images/icon-hospital.png";
import iconExt from "../images/icon-world.png";
import iconUni from "../images/university.png";
import { rootNodeId } from "./data";

const colors = [
  "#e63864",
  "#5dc330",
  "#894adb",
  "#6ac25a",
  "#d144ca",
  "#42c280",
  "#db3890",
  "#4a8a2e",
  "#6d5ec7",
  "#abb83a",
  "#5381e2",
  "#d9a539",
  "#c97bdc",
  "#91811f",
  "#a33e8e",
  "#e0833b",
  "#df659a",
  "#e2462a",
  "#c84450",
  "#b5522c"
];

const clusterNodeColors = (color: string, i: number) => ({
  selector: `node[cluster = ${i}]`,
  style: {
    "background-color": color
  }
});

const clusterEdgeColors = (color: string, i: number) => ({
  selector: `edge[cluster = ${i}]`,
  style: {
    "line-color": color
  }
});

const clusters = [
  ...colors.map(clusterNodeColors),
  ...colors.map(clusterEdgeColors)
]; // .concat((colors.map(clusterColors), 'edge'))

const style: cytoscape.CssStyleDeclaration = [
  {
    selector: "node",
    style: {
      "background-color": "white",
      "border-color": "#000",
      "border-opacity": 0.6,
      "border-width": 0,
      color: "#000",
      height: "44px",
      label: "data(label)",
      padding: 5,
      shape: "ellipse",
      "text-background-color": "#fff",
      "text-background-opacity": 0.6,
      "text-max-width": "160px",
      "text-valign": "bottom",
      "text-wrap": "wrap",
      width: "44px"
    }
  },
  {
    selector: `node[parentId = "${rootNodeId}"]`,
    style: {
      height: "54px",
      shape: "diamond",
      width: "54px"
    }
  },
  
  {
    selector: "node[cluster = 0]",
    style: {
      // "background-color": "#6B6A68",
      "background-color": "darkslateblue",
      color: "white",
      "font-size": "32px",
      "font-weight": "bold",
      height: "88px",
      padding: "10px",
      "text-background-opacity": 0,
      "text-halign": "center",
      "text-valign": "center",
      width: "88px"
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
    selector: "node[type = 'UNI']",
    style: {
      "background-fit": "cover",
      "background-image": iconUni,
      "background-image-opacity": "0.6"
    }
  },
  ...clusters,
  {
    selector: 'node.dimmed',
    style:{
      "background-color": "gray",
      "background-image-opacity": 0.2,
      "opacity": 0.4
    }
  },
  {
    selector: 'edge.dimmed',
    style:{
      "opacity": 0.1
    }
  },
];

console.log(style);

export default style;
