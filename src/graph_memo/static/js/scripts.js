function destroy() {
    if (network !== null) {
        network.destroy();
        network = null;
    }
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

/* save array for json*/
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



