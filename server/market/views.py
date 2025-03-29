from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Stock




# Create your views here.


class ListStocksAPI(APIView):
    permission_classes = [AllowAny]

    def get(self, request):

        stocks = Stock.objects.all()
        results = [
            {
                "symbol":stock.symbol,
                "name":stock.name,
                "current_price": stock.current_price,
                "last_updated":stock.last_updated,
            }
            for stock in stocks
        ]

        return Response({"results": results}, status=200)
    





class StockDetailAPI(APIView):
    permission_classes = [AllowAny]

    def get(self, request, symbol):
        stock = get_object_or_404(Stock, symbol=symbol.upper())  # Case insensitive
        data = {
            "symbol": stock.symbol,
            "name": stock.name,
            "current_price": stock.current_price,
            "last_updated": stock.last_updated,
        }
        return Response(data, status=200)

    











from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import MarketTrend, Stock

class MarketTrendAPI(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        stock_symbol = request.GET.get("symbol")  # Optional filter
        trends = MarketTrend.objects.all()

        if stock_symbol:
            stock = Stock.objects.filter(symbol=stock_symbol.upper()).first()
            if stock:
                trends = trends.filter(stock=stock)

        data = [
            {
                "symbol": trend.stock.symbol,
                "date": trend.date,
                "open_price": trend.open_price,
                "close_price": trend.close_price,
                "high_price": trend.high_price,
                "low_price": trend.low_price,
                "volume": trend.volume,
            }
            for trend in trends
        ]

        return Response({"results": data}, status=200)
