# Librarys - Python

### Trading API
```Bash
pip install alpaca-trade-api krakenex requests vaderSentiment
```

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>

```python
# Crypto
import krakenex 

# Initialize the Kraken API client 
k = krakenex.API() 
k.load_key('kraken.key')  # Load your API key and secret from 'kraken.key' file 
# Define order parameters for buying 
buy_order = { 
    'pair': 'XXBTZUSD',        # Trading pair for Bitcoin to USD 
    'type': 'buy',             # Type of order 
    'ordertype': 'market',     # Order type ('market' or 'limit') 
    'volume': '0.01',          # Amount of Bitcoin to buy 
} 
# Place the buy order 
response = k.query_private('AddOrder', buy_order) 
print(response) 
```
```python
# Normal stocks
import alpaca_trade_api as tradeapi 
import json 

# Load API keys from a JSON file 
with open('path_to_your_json_file.json', 'r') as file: 
    keys = json.load(file) 
    API_KEY = keys['API_KEY'] 
    API_SECRET = keys['API_SECRET'] 
BASE_URL = 'https://paper-api.alpaca.markets'  # or use the live trading URL 
# Initialize the Alpaca API 
api = tradeapi.REST(API_KEY, API_SECRET, BASE_URL, api_version='v2') 
# Selling a stock 
api.submit_order( 
    symbol='AAPL',         # Stock symbol 
    qty=1,                 # Number of shares 
    side='sell',           # 'sell' for selling 
    type='market',         # Order type 
    time_in_force='gtc'    # Time in force 
) 
```
</div>

**type**: This parameter defines the type of order you want to place. Common types include:
- market: Executes the order at the current market price.
- limit: Sets a specific price at which the order should execute.
- stop: Triggers a market order when a specified price is reached.
- stop_limit: Triggers a limit order when a specified price is reached.

**time_in_force**: This setting determines how long an order remains active before it is executed or expires. Common values are:
- day: The order will expire at the end of the trading day if not filled.
- gtc (Good Till Canceled): The order will stay active until it is filled or manually canceled.
- opg (At the Opening): The order is executed at the opening of the market.
- ioc (Immediate or Cancel): Any part of the order not filled immediately is canceled.
- fok (Fill or Kill): The order must be filled in its entirety immediately or it is canceled.