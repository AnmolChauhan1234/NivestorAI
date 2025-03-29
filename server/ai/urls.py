from django.urls import path
from .views import AIAdviceAPI

urlpatterns = [
    path("ai-advice/", AIAdviceAPI.as_view(), name="ai-advice"),
]
