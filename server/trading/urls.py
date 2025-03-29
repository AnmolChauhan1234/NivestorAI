from django.urls import path
from .views import ExecuteTradeAPI, TradeHistoryAPI, PortfolioHoldingsAPI, PortfolioValueAPI

urlpatterns = [
    path("trades/", ExecuteTradeAPI.as_view(), name="execute-trade"),
    path("trades/history/", TradeHistoryAPI.as_view(), name="trade-history"),
    path("portfolio/", PortfolioHoldingsAPI.as_view(), name="portfolio-holdings"),
    path("portfolio/value/", PortfolioValueAPI.as_view(), name="portfolio-value"),
]
