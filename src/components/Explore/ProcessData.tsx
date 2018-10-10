import data from "./sp8data";

class ProcessData {
  public static run() {
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

        let level = 1;
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

        if (
          level3 ===
          "WP8.8 and 8.10 : Federated analysis of human intracerebral stimulation and recording data"
        ) {
          level = 4;
        }

        if (row["Niveau 2"] === "SGA1 Partnering Hospitals") {
          level = 5;
        }

        if (
          level3 ===
          "WP8.8 and 8.10 : Federated analysis of human intracerebral stimulation and recording data"
        ) {
          level = 6;
        }

        if (level3 === "ERN - RND") {
          level = 7;
        }

        if (row["Niveau 2"] === "MIP DATA GOVERNANCE STEERING COMMITTEE") {
          level = 8;
        }

        if (
          level3 ===
          "WP8.7TVB � NDD - Testing pathophysiological models of brain diseases"
        ) {
          level = 9;
        }

        // const parentNode = nodes.filter((n: any) => {
        //   const row1 = n.data.data;
        //   const path = Object.keys(row1).map(key1 => makeId(row1[key1]));
        //   if (path) {
        //     return path.includes(id);
        //   }

        //   return false;
        // })

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
            type,
            weight: 0
            // parent: parent ? parent : undefined
          }
        };

        if (node.data.id === "SP8") {
          node.data.level = 0;
          node.data.weight = 100;
        }

        nodes.push(node);
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
          data: {
            id: `${id}-${id2}`,
            level: node1 ? node1.data.level : null,
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
