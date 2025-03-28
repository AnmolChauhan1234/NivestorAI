from django.contrib import admin
from .models import Watchlist

class WatchlistAdmin(admin.ModelAdmin):
    list_display = ('user', 'stock', 'added_at')
    search_fields = ('user__username', 'stock__symbol')
    list_filter = ('added_at',)

admin.site.register(Watchlist, WatchlistAdmin)
