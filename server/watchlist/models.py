# watchlist/models.py
from django.db import models
from django.contrib.auth import get_user_model
from market.models import Stock

User = get_user_model()

class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'stock')

    def __str__(self):
        return f"{self.user.username} is watching {self.stock.symbol}"
