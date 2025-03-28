from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from .models import Trade, Stock
from django.contrib.auth.models import User
from rest_framework.response import Response

class ExecuteTradeAPI(APIView):
    permission_classes = [IsAuthenticated]  # Only logged-in users can trade

    def post(self, request):
        user = request.user
        stock_symbol = request.data.get("symbol")
        trade_type = request.data.get("trade_type")  # "BUY" or "SELL"
        quantity = request.data.get("quantity")
        price = request.data.get("price")

        stock = Stock.objects.filter(symbol=stock_symbol.upper()).first()
        if not stock:
            return Response({"error": "Stock not found"}, status=status.HTTP_404_NOT_FOUND)

        if trade_type not in ["BUY", "SELL"]:
            return Response({"error": "Invalid trade type"}, status=status.HTTP_400_BAD_REQUEST)

        trade = Trade.objects.create(
            user=user,
            stock=stock,
            trade_type=trade_type,
            quantity=quantity,
            price=price,
        )

        return Response(
            {"message": "Trade executed successfully", "trade_id": trade.id}, 
            status=status.HTTP_201_CREATED
        )




class TradeHistoryAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        trades = Trade.objects.filter(user=user).order_by("-timestamp")

        data = [
            {
                "symbol": trade.stock.symbol,
                "trade_type": trade.trade_type,
                "quantity": trade.quantity,
                "price": trade.price,
                "timestamp": trade.timestamp,
            }
            for trade in trades
        ]

        return Response({"trades": data}, status=200)
