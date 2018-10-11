import cytoscape from "cytoscape";
import iconHBP from "../../images/hbp.png";
import iconHospital from "../../images/icon-hospital.png";
import iconExt from "../../images/logo_chuv.png";
import iconUni from "../../images/university.png"

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
    selector: "node[level = 0]",
    style: {
      // "background-color": "#6B6A68",
      "background-color": "purple",
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
    selector: "node[level = 1]",
    style: {
      "background-color": "#440DFF"
    }
  },
  {
    selector: "node[level = 2]",
    style: {
      "background-color": "#D40CE8"
    }
  },
  {
    selector: "node[level = 3]",
    style: {
      "background-color": "#FF0600"
    }
  },
  {
    selector: "node[level = 4]",
    style: {
      "background-color": "#E86715"
    }
  },
  {
    selector: "node[level = 5]",
    style: {
      "background-color": "#FFBB1C"
    }
  },
  {
    selector: "node[level = 6]",
    style: {
      "background-color": "#112F41"
    }
  },
  {
    selector: "node[level = 7]",
    style: {
      "background-color": "#068587"
    }
  },
  {
    selector: "node[level = 8]",
    style: {
      "background-color": "#4FB99F"
    }
  },
  {
    selector: "node[level = 90]",
    style: {
      "background-color": "#F2B134"
    }
  },
  {
    selector: "node[level = 9]",
    style: {
      "background-color": "#ED553B"
    }
  },
  {
    selector: "node[level = 10]",
    style: {
      "background-color": "#ED553B"
    }
  },
  {
    selector: "node[level = 11]",
    style: {
      "background-color": "#A7DDA7"
    }
  },
  {
    selector: "node[level = 12]",
    style: {
      "background-color": "#78BE97"
    }
  },
  {
    selector: "node[level = 13]",
    style: {
      "background-color": "#0B476D"
    }
  },
  {
    selector: "node[level = 14]",
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
      "line-color": "#FF0000"
    }
  },
  {
    selector: "edge[level = 6]",
    style: {
      "line-color": "#0DFF20"
    }
  },
  {
    selector: "edge[level = 7]",
    style: {
      "line-color": "#4687E8"
    }
  },
  {
    selector: "edge[level = 8]",
    style: {
      "line-color": "#E8C40E"
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
