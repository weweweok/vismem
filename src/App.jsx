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
          nodes,
          callback
        );
        document.getElementById("cancelButton").onclick = cancelEdit.bind(
          this,
          callback
        );
        document.getElementById("network-popUp").style.display = "block";
      },
      addEdge: function (edgeData, callback) {
        edges.push({ from: edgeData.from, to: edgeData.to });
        callback(edgeData);
      },
      editNode: function (nodeData, callback) {
        document.getElementById("operation").innerHTML = "Add Node";
        document.getElementById("node-id").value = nodeData.id;
        document.getElementById("node-label").value = nodeData.label;
        document.getElementById("saveButton").onclick = saveData.bind(
          this,
          nodeData,
          nodes,
          callback
        );
        document.getElementById("cancelButton").onclick = cancelEdit.bind(
          this,
          callback
        );
        document.getElementById("network-popUp").style.display = "block";
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

const saveData = (data, nodes, callback) => {
  data.id = document.getElementById("node-id").value;
  data.label = document.getElementById("node-label").value;
  const idArray = nodes.map((nodesData) => nodesData.id);
  const idIndex = idArray.indexOf(data.id);
  console.log(nodes);
  console.log("id:", idIndex);
  if (idIndex === -1) {
    nodes.push({ id: data.id, label: data.label });
  } else {
    nodes[idIndex].label = data.label;
    console.log(nodes);
  }

  clearPopUp();
  callback(data);
};

export default App;
