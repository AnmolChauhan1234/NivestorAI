from django.contrib import admin
from .models import User, Profile, Contact

# Register User model
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'id', 'full_name', 'phone_number', 'is_active', 'joined_at')  
    list_filter = ('is_active',)
    search_fields = ('email', 'full_name', 'phone_number')

admin.site.register(User, UserAdmin)

# Register Profile model
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'age', 'gender', 'address')
    search_fields = ('user__full_name', 'user__email')

admin.site.register(Profile, ProfileAdmin)

# Register Contact model
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'message')
    search_fields = ('name', 'email')

admin.site.register(Contact, ContactAdmin)
