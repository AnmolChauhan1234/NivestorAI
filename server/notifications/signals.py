from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from django.utils.timezone import now
from market.models import Stock
from notifications.models import Notification  # Ensure the correct path

@receiver(user_logged_in)
def create_stock_notification(sender, request, user, **kwargs):
    """Create a notification when a user logs in."""
    
    print(f"User {user.username} logged in. Creating stock notification...")  # Debugging

    # Fetch top 3 stocks based on highest price
    top_stocks = Stock.objects.order_by("-current_price")[:3]

    if not top_stocks.exists():
        print("No top stocks found.")  # Debugging
        return  # No stocks available, do nothing

    selected_stocks = [stock.symbol for stock in top_stocks]

    # Ensure user has a full name
    user_name = user.get_full_name().strip() if user.get_full_name() else user.username  # Fallback to username

    # Notification message
    message = f"Good morning {user_name}, we think it's a great day to buy {', '.join(selected_stocks)} equity shares. Have a look at the charts!"

    try:
        # Create and save notification
        notification = Notification.objects.create(
            user=user,
            message=message,
            is_read=False,
            created_at=now()
        )

        print(f"✅ Notification saved: {notification}")  # Debugging
    except Exception as e:
        print(f"❌ Error creating notification: {e}")  # Debugging

