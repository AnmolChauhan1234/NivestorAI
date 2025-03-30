from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from market.models import Stock
from .models import Notification
from django.utils.timezone import now

@receiver(user_logged_in)
def create_stock_notification(sender, request, user, **kwargs):
    """This function runs automatically when a user logs in."""
    
    # Fetch top 3 stocks based on highest price
    top_stocks = Stock.objects.order_by("-current_price")[:3]

    if not top_stocks:
        return  # No stocks available, do nothing

    selected_stocks = [stock.symbol for stock in top_stocks]

    # Notification message
    message = f"Good morning {user.full_name}, we think it's a great day to buy {', '.join(selected_stocks)} equity shares. Have a look at the charts!"

    # Create and save notification
    Notification.objects.create(
        user=user,
        message=message,
        is_read=False,
        created_at=now()
    )
