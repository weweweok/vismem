from django.db import models

# Create your models here.

class Graph_nodes(models.Model):
    node_id = models.CharField(max_length=100)
    node_text = models.CharField(max_length=30)

class Graph_edges(models.Model):
    edge_from = models.CharField(max_length=200)
    edge_to = models.CharField(max_length=200)