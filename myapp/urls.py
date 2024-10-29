from django.urls import path
from . import views

urlpatterns = [
    path('mymodel/', views.get_mymodel, name='get_mymodel'),
    path('mymodel/create/', views.post_mymodel, name='post_mymodel'),
]
