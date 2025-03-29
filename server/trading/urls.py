from django.urls import path
<<<<<<< HEAD
from .views import ExecuteTradeAPI, TradeHistoryAPI
=======
from .views import ExecuteTradeAPI, TradeHistoryAPI, PortfolioHoldingsAPI, PortfolioValueAPI
>>>>>>> b6ed4d9 (`Added API endpoints for trading, watchlist, and notifications`)

urlpatterns = [
    path("trades/", ExecuteTradeAPI.as_view(), name="execute-trade"),
    path("trades/history/", TradeHistoryAPI.as_view(), name="trade-history"),
    path("portfolio/", PortfolioHoldingsAPI.as_view(), name="portfolio-holdings"),
    path("portfolio/value/", PortfolioValueAPI.as_view(), name="portfolio-value"),
]
