from django.http import HttpResponseRedirect,HttpResponse
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic

from .models import Graph_nodes,Graph_edges
import json
from django.http import JsonResponse
import pprint

# Create your views here.
def define_graph(request):
    #試作中、理想は各リストにデータベースのデータが格納されていること
    data = {
            'nodes':[{"id": data.node_id ,"label": data.node_text} for data in Graph_nodes.objects.all()],
            'edges':[],
            }
    if request.method == 'POST':
        print("success")
        posted_data = json.loads(request.body)
        print("node data: {}".format(posted_data["nodes"]))
        print()
        print("edges data: {}".format(posted_data["edges"]))

        Graph_nodes.objects.all().delete()
        Graph_edges.objects.all().delete()

        for data in posted_data["nodes"]:
                Graph_nodes.objects.create(node_id=data["id"], node_text=data["label"])
        print(Graph_nodes.objects.distinct().values_list("id"))

        for data in posted_data["edges"]:
                Graph_edges.objects.create(edge_from=data["from"], edge_to=data["to"])

        return render(request,"graph_memo/graph_memo.html", {'data_json': json.dumps(posted_data)})

    return render(request,"graph_memo/graph_memo.html", {'data_json': json.dumps(data)})




