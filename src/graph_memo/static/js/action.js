function post_django_serv(graph,csrf_token){
        let connecting_result = document.getElementById('ajax-connecting-result');
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function(){

            if(xhr.status === 4){
                if(xhr.status === 200){
                    connecting_result.textContent = xhr.responseText;
                }else{
                    connecting_result.textContent = 'サーバエラーが発生しました。';
                }
            } else{ 
                    connecting_result.textContent = '通信中...';
                }

        }
        
        let result = JSON.stringify(graph);

        xhr.responseType = 'json';
        xhr.responseText = result;
        console.log(csrf_token);
        xhr.open('POST', 'http://127.0.0.1:8000/graph_memo/' , true);

        xhr.setRequestHeader('csrf_token', csrf_token);
        xhr.setRequestHeader('content-type', "application/json;charset=UTF-8");
        xhr.send(null);
        
        return console.log("post_finished");
}


