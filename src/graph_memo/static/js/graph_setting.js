function destroy() {
    if (network !== null) {
        network.destroy();
        network = null;
    }
}

function draw() {

            destroy();
            // create a network
            let container = document.getElementById('mynetwork');
            let options = {
                manipulation: {
                    addNode: function (data, callback) {
                        // filling in the popup DOM elements
                        document.getElementById('operation').innerHTML = "Add Node";
                        document.getElementById('node-id').value = data.id;
                        document.getElementById('node-label').value = data.label;
                        document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
                        document.getElementById('cancelButton').onclick = clearPopUp.bind();
                        document.getElementById('network-popUp').style.display = 'block';
                    },
                    editNode: function (data, callback) {
                        // filling in the popup DOM elements
                        document.getElementById('operation').innerHTML = "Edit Node";
                        document.getElementById('node-id').value = data.id;
                        document.getElementById('node-label').value = data.label;
                        document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
                        document.getElementById('cancelButton').onclick = cancelEdit.bind(this, callback);
                        document.getElementById('network-popUp').style.display = 'block';

                    },
                    addEdge: function (data, callback) {
                        if (data.from == data.to) {
                            var self_edge = confirm("Do you want to connect the node to itself?");
                            if (self_edge) {
                                callback(data);
                            }
                        } else {
                            callback(data);
                        }
                        graph_data.edges.push({from : data.from ,to : data.to});
                    },
                    deleteNode: function (data, callback){
                        const graph_id = graph_data.nodes.findIndex( ({id}) => id == data.id );
                        graph_data.nodes.splice(graph_id,1);
                        console.log(graph_data.nodes);
                        callback(data);
                    },
                }
            };

            network = new vis.Network(container, data, options);

}

function clearPopUp() {
            document.getElementById('saveButton').onclick = null;
            document.getElementById('cancelButton').onclick = null;
            document.getElementById('network-popUp').style.display = 'none';
}

function cancelEdit(callback) {
            clearPopUp();
            callback(null);
}

        /* called on options addnode and edit */
function saveData(data, callback) {
            data.id = document.getElementById('node-id').value;
            data.label = document.getElementById('node-label').value;
            const graph_id = graph_data.nodes.findIndex( ({id}) => id == data.id );
            if( graph_id == -1){
                graph_data.nodes.push( {id: data.id ,label: data.label } );
            }else{
                graph_data.nodes[graph_id]["label"] = data.label;
            }
            console.log(graph_data);
            clearPopUp();
            callback(data);
}