from django.urls import path
from .views import MarketAnalysisAPI

urlpatterns = [
    path("/", MarketAnalysisAPI.as_view(), name="market-analysis"),
]
