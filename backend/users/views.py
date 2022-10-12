from rest_framework import permissions, status, authentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserCreateSerializer, UserSerializer, TaskSerializer
from .models import Task


class RegisterView(APIView):

    def post(self, request):
        data = request.data

        serializer = UserCreateSerializer(data=data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_201_CREATED)


class RetrieveUsersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_200_OK)


# # class RetrieveTasksView(APIView):
# #     authentication_classes = [authentication.TokenAuthentication]
# #     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request):
#         user = request.user
#         user = UserSerializer(user)
#         tasks = Task.objects.filter(user=user)
#         tasks = TaskSerializer(tasks)
#         return Response(tasks.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTask(request):
    user = request.user
    tasks = Task.objects.filter(user=user)
    serializer = TaskSerializer(tasks, many=True)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createTask(request):
    data = request.data
    user = request.user
    task = Task.objects.create(user=user, body=data['body'])
    serializer = TaskSerializer(task)

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteTask(request, pk):
    user = request.user
    data = request.data
    task = Task.objects.get(user=user, id=pk)
    task.delete()

    return Response('Task deleted successfully')
