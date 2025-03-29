from analysis.models import MarketAnalysis
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from .models import Trade, Stock
from django.contrib.auth.models import User
from rest_framework.response import Response

class MarketAnalysisAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        analysis = MarketAnalysis.objects.filter(user=user).order_by("-date")

        data = [
            {
                "date": item.date,
                "total_trades": item.total_trades,
                "profit_or_loss": item.profit_or_loss,
                "best_trade": item.best_trade,
                "worst_trade": item.worst_trade,
            }
            for item in analysis
        ]

        return Response({"market_analysis": data}, status=200)
