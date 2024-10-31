from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SimpleModel
from .serializers import SimpleModelSerializer

class SimpleModelView(APIView):
    def get(self, request):
        items = SimpleModel.objects.all()
        serializer = SimpleModelSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SimpleModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
