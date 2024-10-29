from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import MyModel
from .serializers import MyModelSerializer

@api_view(['GET'])
def get_mymodel(request):
    items = MyModel.objects.all()
    serializer = MyModelSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def post_mymodel(request):
    serializer = MyModelSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
