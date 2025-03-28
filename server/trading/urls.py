from django.urls import path
from .views import MarketTrendAPI, ExecuteTradeAPI, TradeHistoryAPI

urlpatterns = [
    path("trades/", ExecuteTradeAPI.as_view(), name="execute-trade"),
    path("trades/history/", TradeHistoryAPI.as_view(), name="trade-history"),
]
