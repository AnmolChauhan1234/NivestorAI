# ai/models.py
from django.db import models
from django.contrib.auth import get_user_model
from market.models import Stock

User = get_user_model()

class AIAdvice(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    advice_text = models.TextField()  # "Buy this stock at 300 INR"
    confidence_score = models.FloatField()  # 0-100% AI confidence level
    generated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"AI Advice for {self.user.username} - {self.stock.symbol}"
