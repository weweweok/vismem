from django.contrib import admin
from .models import Graph_nodes,Graph_edges

# Register your models here.
admin.site.register(Graph_nodes)
admin.site.register(Graph_edges)