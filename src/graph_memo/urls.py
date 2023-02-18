from django.urls import path
from . import views


app_name = "graph_memo"
urlpatterns = [
    path('', views.define_graph, name='define_graph'),
]