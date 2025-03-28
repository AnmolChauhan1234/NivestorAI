from django.contrib import admin
from .models import AIAdvice

class AIAdviceAdmin(admin.ModelAdmin):
    list_display = ('user', 'stock', 'advice_text', 'confidence_score', 'generated_at')
    search_fields = ('user__username', 'stock__symbol')
    list_filter = ('generated_at',)

admin.site.register(AIAdvice, AIAdviceAdmin)
