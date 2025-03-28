# analysis/models.py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class MarketAnalysis(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    total_trades = models.IntegerField()
    profit_or_loss = models.DecimalField(max_digits=15, decimal_places=2)
    best_trade = models.TextField(blank=True, null=True)  # "Bought INFY at 1400 INR"
    worst_trade = models.TextField(blank=True, null=True)  # "Sold RELIANCE at loss"

    class Meta:
        unique_together = ('user', 'date')

    def __str__(self):
        return f"{self.user.username} - Analysis for {self.date}"
