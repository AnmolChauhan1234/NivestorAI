from django.contrib import admin
from .models import Trade, Portfolio

class TradeAdmin(admin.ModelAdmin):
    list_display = ('user', 'stock', 'trade_type', 'quantity', 'price', 'timestamp')
    search_fields = ('user__username', 'stock__symbol')
    list_filter = ('trade_type', 'timestamp')

admin.site.register(Trade, TradeAdmin)

class PortfolioAdmin(admin.ModelAdmin):
    list_display = ('user', 'stock', 'quantity', 'average_price')
    search_fields = ('user__username', 'stock__symbol')

admin.site.register(Portfolio, PortfolioAdmin)
