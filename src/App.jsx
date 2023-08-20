import React, { useEffect, useState } from "react";
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
      const nodesIndex = nodes[0];
      graph.nodes[nodesIndex - 1].label = "accessed!!";
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
        callback(nodeData);
        document.getElementById("network-popUp").style.display = "block";
      },
      addEdge: function (edgeData, callback) {
        edges.push({ from: edgeData.from, to: edgeData.to });
        console.log(edges);
        callback(edgeData);
      },
    },
  };
  const clearPopUp = () => {
    document.getElementById("network-popUp").style.display = "none";
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
          <input type="button" value="save" />
          <input type="button" value="cancel" onClick={clearPopUp} />
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

export default App;
