#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
📊 Market Price Updater
تحديث تلقائي لأسعار الذهب والدولار
"""

import json
import requests
from datetime import datetime
from pathlib import Path
import os

# Configuration
MARKET_HISTORY_FILE = Path(__file__).parent.parent / 'market-history.json'
GOLDAPI_KEY = os.environ.get('GOLDAPI_KEY', 'goldapi-2bs6sml3hcm9p-io')

def fetch_gold_prices():
    """
    جلب أسعار الذهب من API أو مصدر موثوق
    
    يمكن استخدام APIs مثل:
    - GoldAPI.io
    - Metals-API.com
    - أو أي مصدر محلي
    """
    
    # Example: Using a hypothetical API
    # هنا يمكنك استبدال هذا بـ API حقيقي
    
    try:
        # مثال افتراضي - استبدله بـ API حقيقي
        # response = requests.get('https://api.example.com/gold-prices')
        # data = response.json()
        
        # For demonstration - you should replace this with real API calls
        gold_data = {
            'EGP': {
                '24': get_gold_price_egypt_24k(),
                '21': 0  # Will be calculated if not provided
            },
            'SAR': {
                '24': get_gold_price_saudi_24k(),
                '21': 0  # Will be calculated if not provided
            }
        }
        
        # Calculate karat 21 from karat 24 if not provided
        for country in gold_data:
            if gold_data[country]['21'] == 0:
                gold_data[country]['21'] = round(gold_data[country]['24'] * (21 / 24), 2)
        
        return gold_data
        
    except Exception as e:
        print(f"❌ Error fetching gold prices: {e}")
        return None

def get_gold_price_egypt_24k():
    """
    جلب سعر الذهب عيار 24 في مصر من GoldAPI
    """
    try:
        url = 'https://www.goldapi.io/api/XAU/EGP'
        headers = {'x-access-token': GOLDAPI_KEY}
        
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        # استخراج السعر بالجرام
        price = data.get('price_gram_24k', 0)
        return round(price, 2)
        
    except Exception as e:
        print(f"❌ Error fetching Egypt gold price: {e}")
        # Return fallback price
        return 3850.00

def get_gold_price_saudi_24k():
    """
    جلب سعر الذهب عيار 24 في السعودية من GoldAPI
    """
    try:
        url = 'https://www.goldapi.io/api/XAU/SAR'
        headers = {'x-access-token': GOLDAPI_KEY}
        
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        # استخراج السعر بالجرام
        price = data.get('price_gram_24k', 0)
        return round(price, 2)
        
    except Exception as e:
        print(f"❌ Error fetching Saudi gold price: {e}")
        # Return fallback price
        return 363.00

def fetch_usd_egp_rate():
    """
    جلب سعر صرف الدولار مقابل الجنيه المصري
    
    يمكنك استخدام:
    - ExchangeRate-API.com
    - CurrencyAPI.com
    - البنك المركزي المصري
    """
    try:
        # Example using ExchangeRate-API (free tier available)
        # response = requests.get('https://api.exchangerate-api.com/v4/latest/USD')
        # data = response.json()
        # usd_egp = data['rates']['EGP']
        
        # Alternative: CurrencyLayer API
        # api_key = 'YOUR_API_KEY'
        # response = requests.get(f'http://api.currencylayer.com/live?access_key={api_key}&currencies=EGP&source=USD')
        # data = response.json()
        # usd_egp = data['quotes']['USDEGP']
        
        # Placeholder - استبدل بالكود الحقيقي
        return 50.30
        
    except Exception as e:
        print(f"❌ Error fetching USD/EGP rate: {e}")
        return 0

def load_market_history():
    """تحميل سجل البيانات الحالي"""
    try:
        with open(MARKET_HISTORY_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print("⚠️ Market history file not found. Creating new one.")
        return []
    except Exception as e:
        print(f"❌ Error loading market history: {e}")
        return []

def save_market_history(data):
    """حفظ سجل البيانات المحدث"""
    try:
        with open(MARKET_HISTORY_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print("✅ Market history updated successfully")
        return True
    except Exception as e:
        print(f"❌ Error saving market history: {e}")
        return False

def update_prices():
    """
    الدالة الرئيسية للتحديث
    """
    print("🚀 Starting price update...")
    
    # Get today's date
    today = datetime.now().strftime('%Y-%m-%d')
    
    # Load existing data
    market_history = load_market_history()
    
    # Check if today's data already exists
    if market_history and market_history[0]['date'] == today:
        print(f"ℹ️ Data for {today} already exists. Skipping update.")
        return
    
    # Fetch new prices
    print("📡 Fetching gold prices...")
    gold_prices = fetch_gold_prices()
    
    print("📡 Fetching USD/EGP rate...")
    usd_egp = fetch_usd_egp_rate()
    
    if not gold_prices or not usd_egp:
        print("❌ Failed to fetch prices. Aborting update.")
        return
    
    # Create new entry
    new_entry = {
        'date': today,
        'gold': gold_prices,
        'usd_egp': usd_egp
    }
    
    # Add to history (prepend - newest first)
    market_history.insert(0, new_entry)
    
    # Keep only last 365 days (optional - to prevent file from growing indefinitely)
    market_history = market_history[:365]
    
    # Save updated data
    if save_market_history(market_history):
        print(f"✅ Successfully updated prices for {today}")
        print(f"   - Gold EGP 24k: {gold_prices['EGP']['24']}")
        print(f"   - Gold SAR 24k: {gold_prices['SAR']['24']}")
        print(f"   - USD/EGP: {usd_egp}")
    else:
        print("❌ Failed to save updated prices")

if __name__ == '__main__':
    update_prices()
