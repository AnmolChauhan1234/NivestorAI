from django.urls import path
from .views import WatchlistAPI, AddToWatchlistAPI, RemoveFromWatchlistAPI

urlpatterns = [
    path("/", WatchlistAPI.as_view(), name="watchlist"),
    path("add/", AddToWatchlistAPI.as_view(), name="add-watchlist"),
    path("remove/", RemoveFromWatchlistAPI.as_view(), name="remove-watchlist"),
]
