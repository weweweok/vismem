import React from "react";
import Graph from "react-vis-network-graph";

function App() {
  const nodes = [
    { id: 1, label: "Node 1", title: "node 1 tootip text" },
    { id: 2, label: "Node 2", title: "node 2 tootip text" },
    { id: 3, label: "Node 3", title: "node 3 tootip text" },
    { id: 4, label: "Node 4", title: "node 4 tootip text" },
    { id: 5, label: "Node 5", title: "node 5 tootip text" },
  ];
  const edges = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
  ];
  const events = {
    select: function (event) {
      const { nodes, edges } = event;
    },
  };

  const graph = { nodes: nodes, edges: edges };

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
    },
    height: "500px",
    manipulation: {
      addNode: function (nodeData, callback) {
        document.getElementById("operation").innerHTML = "Add Node";
        document.getElementById("node-id").value = nodeData.id;
        document.getElementById("node-label").value = nodeData.label;
        document.getElementById("saveButton").onclick = saveData.bind(
          this,
          nodeData,
          graph,
          callback
        );
        document.getElementById("cancelButton").onclick = cancelEdit.bind(
          this,
          callback
        );
        document.getElementById("network-popUp").style.display = "block";
      },
      addEdge: function (edgeData, callback) {
        graph.edges.push({
          from: edgeData.from,
          to: edgeData.to,
          id: createUuid(),
        });
        console.log(edges);
        callback(edgeData);
      },
      editNode: function (nodeData, callback) {
        document.getElementById("operation").innerHTML = "Add Node";
        document.getElementById("node-id").value = nodeData.id;
        document.getElementById("node-label").value = nodeData.label;
        document.getElementById("saveButton").onclick = saveData.bind(
          this,
          nodeData,
          graph,
          callback
        );
        document.getElementById("cancelButton").onclick = cancelEdit.bind(
          this,
          callback
        );
        document.getElementById("network-popUp").style.display = "block";
      },
      deleteNode: function (nodeEdgeData, callback) {
        const idArray = graph.nodes.map((nodesData) => nodesData.id);
        const idIndex = idArray.indexOf(nodeEdgeData.nodes[0]);

        graph.nodes.splice(idIndex, 1);

        const edgeidArray = graph.edges.map((edgesData) => edgesData.id);
        console.log(graph);
        const edgeCount = nodeEdgeData.edges.length;
        console.log(nodeEdgeData.edges);
        console.log(edgeCount);
        for (
          let nodeEdgeDataIndex = 0;
          nodeEdgeDataIndex <= edgeCount;
          nodeEdgeDataIndex++
        ) {
          const edgeidIndex = edgeidArray.indexOf(
            nodeEdgeData.edges[nodeEdgeDataIndex]
          );
          graph.edges.splice(edgeidIndex, 1);
        }

        console.log(graph);
        callback(nodeEdgeData);
      },
      deleteEdge: function (edgeData, callback) {
        const edgeidArray = graph.edges.map((edgesData) => edgesData.id);
        const edgeidIndex = edgeidArray.indexOf(edgeData.edges[0]);
        graph.edges.splice(edgeidIndex, 1);

        callback(edgeData);
      },
    },
  };

  return (
    <>
      <div className="App">
        <header className="vismem">
          <h1>vismem</h1>
        </header>
      </div>
      <div>
        <div id="network-popUp" style={{ display: "none" }}>
          <span id="operation">node</span>
          <br />
          <table>
            <tr>
              <td>id</td>
              <td>
                <input id="node-id" value="new value" />
              </td>
            </tr>
            <tr>
              <td>label</td>
              <td>
                <input id="node-label" />
              </td>
            </tr>
          </table>
          <input type="button" value="save" id="saveButton" />
          <input type="button" value="cancel" id="cancelButton" />
        </div>
        <body>
          <Graph
            graph={graph}
            options={options}
            events={events}
            getNetwork={(network) => {
              //  if you want access to vis.js network api you can set the state in a parent component using this property
            }}
          />
        </body>
      </div>
    </>
  );
}

const clearPopUp = () => {
  document.getElementById("saveButton").onclick = null;
  document.getElementById("cancelButton").onclick = null;
  document.getElementById("network-popUp").style.display = "none";
};

const cancelEdit = (callback) => {
  clearPopUp();
  callback(null);
};

const saveData = (data, graph, callback) => {
  data.id = document.getElementById("node-id").value;
  data.label = document.getElementById("node-label").value;
  const idArray = graph.nodes.map((nodesData) => nodesData.id);
  const idIndex = idArray.indexOf(data.id);
  console.log(graph.nodes);
  console.log("id:", idIndex);
  if (idIndex === -1) {
    graph.nodes.push({ id: data.id, label: data.label });
  } else {
    graph.nodes[idIndex].label = data.label;
    console.log(graph.nodes);
  }

  clearPopUp();
  callback(data);
};

const createUuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
    let r = (new Date().getTime() + Math.random() * 16) % 16 | 0,
      v = a == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export default App;
