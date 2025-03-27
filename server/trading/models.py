# trading/models.py
from django.db import models
from django.contrib.auth import get_user_model
from market.models import Stock

User = get_user_model()

class Trade(models.Model):
    TRADE_TYPE_CHOICES = [('BUY', 'Buy'), ('SELL', 'Sell')]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    trade_type = models.CharField(max_length=4, choices=TRADE_TYPE_CHOICES)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=15, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)  # Trade execution time

    def __str__(self):
        return f"{self.user.username} {self.trade_type} {self.stock.symbol}"

class Portfolio(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    average_price = models.DecimalField(max_digits=15, decimal_places=2)

    class Meta:
        unique_together = ('user', 'stock')

    def __str__(self):
        return f"{self.user.username} owns {self.quantity} of {self.stock.symbol}"
