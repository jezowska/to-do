from django.urls import path
from .views import RegisterView, RetrieveUsersView, deleteTask, getTask, createTask

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('me', RetrieveUsersView.as_view()),
    path('tasks', getTask),
    path('create-task', createTask),
    path('delete-task/<str:pk>', deleteTask)
]
