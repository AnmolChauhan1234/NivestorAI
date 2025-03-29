from ai.models import AIAdvice
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from .models import Trade, Stock
from django.contrib.auth.models import User
from rest_framework.response import Response

class AIAdviceAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        advice_list = AIAdvice.objects.filter(user=user).order_by("-generated_at")

        data = [
            {
                "symbol": advice.stock.symbol,
                "advice": advice.advice_text,
                "confidence": advice.confidence_score,
                "generated_at": advice.generated_at,
            }
            for advice in advice_list
        ]

        return Response({"ai_advice": data}, status=200)
