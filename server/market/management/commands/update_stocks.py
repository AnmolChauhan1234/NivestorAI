import yfinance as yf
from django.core.management.base import BaseCommand
from django.utils.timezone import now
from market.models import Stock  # Ensure this is the correct path to your Stock model

# List of ~50 popular stock symbols
POPULAR_STOCKS = [
    "AAPL", "TSLA", "MSFT", "GOOGL", "AMZN", "META", "NVDA", "NFLX", "AMD", "INTC",
    "ORCL", "IBM", "ADBE", "CSCO", "PYPL", "PEP", "KO", "NKE", "DIS", "PFE",
    "JNJ", "WMT", "T", "VZ", "BA", "GE", "XOM", "CVX", "GS", "JPM", "BAC",
    "C", "MS", "UBER", "LYFT", "SHOP", "SQ", "RBLX", "PLTR", "SNAP", "TWTR",
    "BABA", "TSM", "BYND", "DOCU", "ZM", "CRWD", "DDOG", "NET", "ASML", "MRNA"
]  # You can modify or expand this list

class Command(BaseCommand):
    help = "Fetch and update stock prices from Yahoo Finance (Up to 50 stocks with names)"

    def handle(self, *args, **kwargs):
        self.update_stock_prices()

    def update_stock_prices(self):
        for symbol in POPULAR_STOCKS:
            try:
                ticker = yf.Ticker(symbol)
                stock_info = ticker.history(period="1d")  # Fetch latest stock data
                company_info = ticker.info  # Get company details
                
                if not stock_info.empty:
                    latest_price = stock_info['Close'].iloc[-1]
                    stock_name = company_info.get("longName", symbol)  # Fetch company name

                    # Check if stock exists, update if it does, or create a new one
                    stock, created = Stock.objects.update_or_create(
                        symbol=symbol,
                        defaults={
                            "name": stock_name,  # Assuming your Stock model has a 'name' field
                            "current_price": latest_price,
                            "last_updated": now(),
                        },
                    )

                    if created:
                        self.stdout.write(self.style.SUCCESS(f"Added new stock: {stock_name} ({symbol}) - {latest_price}"))
                    else:
                        self.stdout.write(self.style.SUCCESS(f"Updated {stock_name} ({symbol}): {latest_price}"))
                else:
                    self.stdout.write(self.style.WARNING(f"No data for {symbol}"))

            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error updating {symbol}: {e}"))
