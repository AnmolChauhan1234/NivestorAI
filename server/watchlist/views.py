from watchlist.models import Watchlist
from analysis.models import MarketAnalysis
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from .models import Trade, Stock
from django.contrib.auth.models import User
from rest_framework.response import Response




class WatchlistAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        watchlist = Watchlist.objects.filter(user=user)

        data = [{"symbol": item.stock.symbol, "added_at": item.added_at} for item in watchlist]

        return Response({"watchlist": data}, status=200)



class AddToWatchlistAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        stock_symbol = request.data.get("symbol")

        stock = Stock.objects.filter(symbol=stock_symbol.upper()).first()
        if not stock:
            return Response({"error": "Stock not found"}, status=404)

        Watchlist.objects.get_or_create(user=user, stock=stock)
        return Response({"message": "Added to watchlist"}, status=201)






class RemoveFromWatchlistAPI(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        stock_symbol = request.data.get("symbol")

        stock = Stock.objects.filter(symbol=stock_symbol.upper()).first()
        if not stock:
            return Response({"error": "Stock not found"}, status=404)

        Watchlist.objects.filter(user=user, stock=stock).delete()
        return Response({"message": "Removed from watchlist"}, status=200)
