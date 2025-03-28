from django.contrib import admin
from .models import Stock, MarketTrend

class StockAdmin(admin.ModelAdmin):
    list_display = ('symbol', 'name', 'current_price', 'last_updated')
    search_fields = ('symbol', 'name')
    list_filter = ('last_updated',)

admin.site.register(Stock, StockAdmin)

class MarketTrendAdmin(admin.ModelAdmin):
    list_display = ('stock', 'date', 'open_price', 'close_price', 'volume')
    search_fields = ('stock__symbol',)
    list_filter = ('date',)

admin.site.register(MarketTrend, MarketTrendAdmin)
