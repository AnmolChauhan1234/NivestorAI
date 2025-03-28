from django.urls import path
from .views import ListStocksAPI, StockDetailAPI, MarketTrendAPI

urlpatterns = [
    path("stocks/", ListStocksAPI.as_view(), name="list-stocks"),
    path("stocks/<str:symbol>/", StockDetailAPI.as_view(), name="stock-detail"),
    path("market-trends/", MarketTrendAPI.as_view(), name="market-trends"),
]