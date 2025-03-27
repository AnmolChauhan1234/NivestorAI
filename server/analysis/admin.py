from django.contrib import admin
from .models import MarketAnalysis

class MarketAnalysisAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'total_trades', 'profit_or_loss', 'best_trade', 'worst_trade')
    search_fields = ('user__username',)
    list_filter = ('date',)

admin.site.register(MarketAnalysis, MarketAnalysisAdmin)
