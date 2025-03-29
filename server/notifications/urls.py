from django.urls import path
from .views import NotificationAPI, MarkNotificationAsReadAPI

urlpatterns = [
    path("/", NotificationAPI.as_view(), name="notifications"),
    path("read/", MarkNotificationAsReadAPI.as_view(), name="mark-notifications-read"),
]
