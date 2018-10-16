// tslint:disable:no-console
import { data, rootNodeId } from "./data";

interface IElement {
  nodes: any;
  edges: any;
}

class ProcessData {
  public static run(): IElement {
    const nodes: any = [];
    const edges: any = [];

    const makeId = (r: string) =>
      r !== "" && r !== "..." ? r.split(" ").join("") : null;

    // Build nodes from csv
    data.forEach((row, i) => {
      const computedRow = Object.keys(row).filter(
        key => key !== "Type" && row[key] !== "" && row[key] !== "..."
      );

      computedRow.forEach((key, j) => {
        const val = row[key];
        const id = makeId(val);

        // node already exists
        // if (nodes.find((n: any) => n.data.id === id)) {
        //   return;
        // }

        let cluster;
        const level2 = row["Niveau 2"];
        const level3 = row["Niveau 3"];
        const level4 = row["Niveau 4"];

        const parentId = computedRow.length === 2 ? rootNodeId : undefined;

        if (id === rootNodeId && computedRow.length === 1) {
          cluster = 0;
        }

        if (level2 === "EPILEPSY") {
          cluster = 1;
        }

        if (level2 === "TRAUMATIC BRAIN INJURIES") {
          cluster = 7;
        }

        if (level2 === "DEMENTIA") {
          cluster = 15;
        }

        if (level2 === "MIP DATA GOVERNANCE STEERING COMMITTEE") {
          cluster = 12;
        }

        if (level2 === "PSYCHIATRIC DISORDERS") {
          cluster = 16;
        }

        if (level2 === "OTHER INTERACTIONS") {
          cluster = 13;
        }

        if (level2 === "ONTOLOGIES") {
          cluster = 14;
        }

        if (level3 === "EpiCARE") {
          cluster = 4;
        }

        if (
          level3 ===
          "WP8.8 and 8.10 : Federated analysis of human intracerebral stimulation and recording data"
        ) {
          cluster = 5;
        }

        if (
          level3 ===
          "WP8.8 and 8.10 : Federated analysis of human intracerebral stimulation and recording data"
        ) {
          cluster = 6;
        }

        if (level3 === "CENTER TBI") {
          cluster = 7;
        }

        if (level3 === "CREACTIVE") {
          cluster = 8;
        }

        if (level3 === "ERN - RND") {
          cluster = 9;
        }

        if (
          level3 ===
          "WP8.7TVB � NDD - Testing pathophysiological models of brain diseases"
        ) {
          cluster = 10;
        }

        if (level3 === "SGA1 Partnering Hospitals") {
          cluster = 11;
        }

        if (level4 === "E-PILEPSY (Not full member of EpiCARE)") {
          cluster = 2;
        }

        if (level4 === "COLLABORATIVE CENTRES") {
          cluster = 3;
        }

        let type: string | undefined = row.Type;
        if (Object.keys(computedRow).length - 1 !== j) {
          type = undefined;
        }

        const node = {
          data: {
            cluster,
            data: row,
            id,
            label: val,
            parentId,
            type
          }
        };

        nodes.push(node);
        // console.log(node.data.label, node.data.data)
      });
    });

    // Build edges
    nodes.forEach((node: any) => {
      const data1 = node.data.data;
      const values = Object.keys(data1)
        .slice(0, 5)
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

        edges.push({
          data:{
            cluster: node1 ? node1.data.cluster : null,
            id: `${id}-${id2}`,
            source: id,
            target: id2
          }
        });
      });
    });

    const elements = {
      edges,
      nodes
    };

    return elements;
  }
}

export default ProcessData;
