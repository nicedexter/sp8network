import cytoscape from "cytoscape";
import iconHBP from "../../images/icon-hbp.png";
import iconHospital from "../../images/icon-hospital.png";
import iconExt from "../../images/icon-world.png";
import iconUni from "../../images/university.png";
import { rootNodeId } from "./sp8data";

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
      // "text-halign": "center",
      // "text-valign": "center",
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
    selector: "node[cluster = 1]",
    style: {
      "background-color": "#6B6A68",
    }
  },
  {
    selector: "node[cluster = 2]",
    style: {
      "background-color": "#FF629B"
    }
  },
  {
    selector: "node[cluster = 3]",
    style: {
      "background-color": "#FF0600"
    }
  },
  {
    selector: "node[cluster = 4]",
    style: {
      "background-color": "#E86715"
    }
  },
  {
    selector: "node[cluster = 5]",
    style: {
      "background-color": "#FFBB1C"
    }
  },
  {
    selector: "node[cluster = 6]",
    style: {
      "background-color": "#9CCF4A"
    }
  },
  {
    selector: "node[cluster = 7]",
    style: {
      "background-color": "#E89A0C"
    }
  },
  {
    selector: "node[cluster = 8]",
    style: {
      "background-color": "#4FB99F"
    }
  },
  {
    selector: "node[cluster = 90]",
    style: {
      "background-color": "#D1B414"
    }
  },
  {
    selector: "node[cluster = 9]",
    style: {
      "background-color": "#ED553B"
    }
  },
  {
    selector: "node[cluster = 10]",
    style: {
      "background-color": "#ED553B"
    }
  },
  {
    selector: "node[cluster = 11]",
    style: {
      "background-color": "#A7DDA7"
    }
  },
  {
    selector: "node[cluster = 12]",
    style: {
      "background-color": "#78BE97"
    }
  },
  {
    selector: "node[cluster = 13]",
    style: {
      "background-color": "#0B476D"
    }
  },
  {
    selector: "node[cluster = 14]",
    style: {
      "background-color": "#E30AFF"
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
    selector: "edge[cluster = 0]",
    style: {
      "line-color": "purple"
    }
  },
  {
    selector: "edge[cluster = 1]",
    style: {
      "line-color": "#6B6A68"
    }
  },
  {
    selector: "edge[cluster = 2]",
    style: {
      "line-color": "#D40CE8"
    }
  },
  {
    selector: "edge[cluster = 3]",
    style: {
      "line-color": "#FF0600"
    }
  },
  {
    selector: "edge[cluster = 4]",
    style: {
      "line-color": "#E86715"
    }
  },
  {
    selector: "edge[cluster = 5]",
    style: {
      "line-color": "#FFBB1C"
    }
  },
  {
    selector: "edge[cluster = 6]",
    style: {
      "line-color": "#9CCF4A"
    }
  },
  {
    selector: "edge[cluster = 7]",
    style: {
      "line-color": "#E89A0C"
    }
  },
  {
    selector: "edge[cluster = 8]",
    style: {
      "line-color": "#4FB99F"
    }
  },
  {
    selector: "edge[cluster = 90]",
    style: {
      "line-color": "#F2B134"
    }
  },
  {
    selector: "edge[cluster = 9]",
    style: {
      "line-color": "#ED553B"
    }
  },
  {
    selector: "edge[cluster = 10]",
    style: {
      "line-color": "#ED553B"
    }
  },
  {
    selector: "edge[cluster = 11]",
    style: {
      "line-color": "#A7DDA7"
    }
  },
  {
    selector: "edge[cluster = 12]",
    style: {
      "line-color": "#78BE97"
    }
  },
  {
    selector: "edge[cluster = 13]",
    style: {
      "line-color": "#0B476D"
    }
  },
  {
    selector: "edge[cluster = 14]",
    style: {
      "line-color": "#E30AFF"
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
  }
];

export default style;
