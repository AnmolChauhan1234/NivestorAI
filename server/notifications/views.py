from analysis.models import MarketAnalysis
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from .models import Trade, Stock
from django.contrib.auth.models import User
from rest_framework.response import Response
from .models import Notification




class NotificationAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        notifications = Notification.objects.filter(user=user).order_by("-created_at")

        data = [
            {
                "message": notification.message,
                "is_read": notification.is_read,
                "created_at": notification.created_at,
            }
            for notification in notifications
        ]

        return Response({"notifications": data}, status=200)






class MarkNotificationAsReadAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        Notification.objects.filter(user=user, is_read=False).update(is_read=True)

        return Response({"message": "Notifications marked as read"}, status=200)
