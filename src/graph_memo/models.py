from django.db import models

# Create your models here.

class Graph_nodes(models.Model):
    nodes_id = models.CharField(max_length=100)
    nodes_text = models.CharField(max_length=30)

class Graph_edges(models.Model):
    edges_from = models.CharField(max_length=200)
    edges_to = models.CharField(max_length=200)