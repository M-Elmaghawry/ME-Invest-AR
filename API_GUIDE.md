# 🔌 دليل إعداد واستخدام APIs

## نظرة عامة

هذا الملف يشرح كيفية إعداد وربط APIs الحقيقية للحصول على بيانات الأسعار.

---

## 🟡 APIs أسعار الذهب

### الخيار 1: GoldAPI.io ⭐ (موصى به)

**الموقع**: https://www.goldapi.io/

**المميزات**:
- ✅ بيانات دقيقة وموثوقة
- ✅ تغطية عالمية
- ✅ أسعار لجميع العملات
- ✅ خطة مجانية: 100 طلب/شهر

**طريقة التسجيل**:
1. سجل في الموقع
2. احصل على API Key
3. استخدم الكود التالي:

```python
import requests

API_KEY = 'goldapi-2bs6sml3hcm9p-io'
CURRENCY = 'EGP'  # أو 'SAR'

url = f'https://www.goldapi.io/api/XAU/{CURRENCY}'
headers = {
    'x-access-token': API_KEY,
}

response = requests.get(url, headers=headers)
data = response.json()

# السعر بالجرام
price_per_gram = data['price_gram_24k']
print(f"Gold 24k in {CURRENCY}: {price_per_gram}")
```

---

### الخيار 2: Metals-API.com

**الموقع**: https://metals-api.com/

**المميزات**:
- ✅ دقة عالية
- ✅ بيانات تاريخية
- ✅ خطة مجانية: 50 طلب/شهر

**مثال استخدام**:

```python
import requests

API_KEY = 'your_metals_api_key'
BASE = 'XAU'  # Gold
SYMBOLS = 'EGP,SAR'

url = f'https://metals-api.com/api/latest?access_key={API_KEY}&base={BASE}&symbols={SYMBOLS}'

response = requests.get(url)
data = response.json()

# تحويل من أونصة إلى جرام (1 أونصة = 31.1035 جرام)
gold_egp_per_ounce = 1 / data['rates']['EGP']
gold_egp_per_gram = gold_egp_per_ounce / 31.1035

print(f"Gold per gram in EGP: {gold_egp_per_gram}")
```

---

### الخيار 3: Web Scraping من مواقع موثوقة

**للحصول على أسعار محلية دقيقة**:

#### مصر:
```python
import requests
from bs4 import BeautifulSoup

def get_egypt_gold_price():
    # مثال: موقع goldprice.org
    url = 'https://goldprice.org/gold-price-egypt.html'
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # استخرج السعر حسب هيكل الصفحة
    # يختلف حسب الموقع المستخدم
    price_element = soup.find('span', {'id': 'gold-price-24k'})
    price = float(price_element.text.replace(',', ''))
    
    return price
```

#### السعودية:
```python
def get_saudi_gold_price():
    # مصادر موثوقة:
    # - https://www.saudigold.sa/
    # - https://www.goldprice.org/gold-price-saudi-arabia.html
    
    url = 'https://www.goldprice.org/gold-price-saudi-arabia.html'
    # نفس المنطق مع تعديل selectors
    pass
```

---

## 💵 APIs أسعار العملات (USD/EGP)

### الخيار 1: ExchangeRate-API.com ⭐ (موصى به)

**الموقع**: https://www.exchangerate-api.com/

**المميزات**:
- ✅ مجاني بالكامل
- ✅ 1500 طلب/شهر
- ✅ بيانات محدثة

```python
import requests

def get_usd_egp_rate():
    url = 'https://api.exchangerate-api.com/v4/latest/USD'
    response = requests.get(url)
    data = response.json()
    
    return data['rates']['EGP']

# الاستخدام
rate = get_usd_egp_rate()
print(f"1 USD = {rate} EGP")
```

---

### الخيار 2: CurrencyLayer

**الموقع**: https://currencylayer.com/

**المميزات**:
- ✅ خطة مجانية: 100 طلب/شهر
- ✅ دقة عالية

```python
import requests

API_KEY = 'your_currencylayer_key'

def get_usd_egp_rate():
    url = f'http://api.currencylayer.com/live'
    params = {
        'access_key': API_KEY,
        'currencies': 'EGP',
        'source': 'USD'
    }
    
    response = requests.get(url, params=params)
    data = response.json()
    
    return data['quotes']['USDEGP']
```

---

### الخيار 3: البنك المركزي المصري

```python
import requests
from bs4 import BeautifulSoup

def get_cbe_usd_rate():
    """
    جلب سعر الدولار من البنك المركزي المصري
    """
    url = 'https://www.cbe.org.eg/en/EconomicResearch/Statistics/Pages/ExchangeRatesListing.aspx'
    
    # يتطلب web scraping لأن CBE لا يوفر API عام
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # استخرج السعر من الجدول
    # يعتمد على هيكل الصفحة
    pass
```

---

## 🔧 دمج APIs في المشروع

### تحديث ملف `scripts/update_prices.py`

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import requests
from datetime import datetime
from pathlib import Path

# ========== إعدادات API ==========
GOLDAPI_KEY = 'your_goldapi_key_here'
# أو استخدم المتغيرات البيئية للأمان:
# import os
# GOLDAPI_KEY = os.environ.get('GOLDAPI_KEY')

# ========== دوال جلب البيانات ==========

def fetch_gold_egypt_24k():
    """جلب سعر الذهب عيار 24 - مصر"""
    try:
        url = 'https://www.goldapi.io/api/XAU/EGP'
        headers = {'x-access-token': GOLDAPI_KEY}
        response = requests.get(url, headers=headers)
        data = response.json()
        return round(data['price_gram_24k'], 2)
    except Exception as e:
        print(f"Error: {e}")
        return None

def fetch_gold_saudi_24k():
    """جلب سعر الذهب عيار 24 - السعودية"""
    try:
        url = 'https://www.goldapi.io/api/XAU/SAR'
        headers = {'x-access-token': GOLDAPI_KEY}
        response = requests.get(url, headers=headers)
        data = response.json()
        return round(data['price_gram_24k'], 2)
    except Exception as e:
        print(f"Error: {e}")
        return None

def fetch_usd_egp_rate():
    """جلب سعر الدولار مقابل الجنيه"""
    try:
        url = 'https://api.exchangerate-api.com/v4/latest/USD'
        response = requests.get(url)
        data = response.json()
        return round(data['rates']['EGP'], 2)
    except Exception as e:
        print(f"Error: {e}")
        return None

# ========== التحديث الرئيسي ==========

def update_prices():
    print("🚀 Starting price update...")
    
    # جلب البيانات
    gold_egp_24 = fetch_gold_egypt_24k()
    gold_sar_24 = fetch_gold_saudi_24k()
    usd_egp = fetch_usd_egp_rate()
    
    if not all([gold_egp_24, gold_sar_24, usd_egp]):
        print("❌ Failed to fetch all prices")
        return
    
    # حساب عيار 21
    gold_egp_21 = round(gold_egp_24 * (21/24), 2)
    gold_sar_21 = round(gold_sar_24 * (21/24), 2)
    
    # إنشاء السجل الجديد
    new_entry = {
        'date': datetime.now().strftime('%Y-%m-%d'),
        'gold': {
            'EGP': {'24': gold_egp_24, '21': gold_egp_21},
            'SAR': {'24': gold_sar_24, '21': gold_sar_21}
        },
        'usd_egp': usd_egp
    }
    
    # تحميل البيانات الحالية
    file_path = Path(__file__).parent.parent / 'market-history.json'
    with open(file_path, 'r', encoding='utf-8') as f:
        history = json.load(f)
    
    # إضافة السجل الجديد
    history.insert(0, new_entry)
    history = history[:365]  # الاحتفاظ بآخر سنة فقط
    
    # حفظ
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(history, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Prices updated for {new_entry['date']}")
    print(f"   Gold EGP 24k: {gold_egp_24}")
    print(f"   Gold SAR 24k: {gold_sar_24}")
    print(f"   USD/EGP: {usd_egp}")

if __name__ == '__main__':
    update_prices()
```

---

## 🔐 حماية API Keys

**لا تضع API Keys مباشرة في الكود!**

### استخدام GitHub Secrets

1. اذهب إلى: `Settings` → `Secrets and variables` → `Actions`
2. أضف Secret جديد:
   - Name: `GOLDAPI_KEY`
   - Value: `your_actual_api_key`

3. عدّل ملف `.github/workflows/update-prices.yml`:

```yaml
- name: Update market prices
  env:
    GOLDAPI_KEY: ${{ secrets.GOLDAPI_KEY }}
  run: python scripts/update_prices.py
```

4. في Python، استخدم:

```python
import os
GOLDAPI_KEY = os.environ.get('GOLDAPI_KEY')
```

---

## 📊 اختبار APIs

قبل الاستخدام، جرب الكود:

```bash
cd scripts
python update_prices.py
```

تأكد من:
- ✅ البيانات تُجلب بنجاح
- ✅ ملف JSON يُحدَّث
- ✅ لا توجد أخطاء

---

## 🆘 استكشاف المشاكل

### خطأ: API Key غير صالح
```
✓ تأكد من نسخ الـ Key بشكل صحيح
✓ تحقق من انتهاء صلاحية الـ Key
✓ راجع حد الاستخدام الشهري
```

### خطأ: timeout أو connection error
```
✓ تحقق من اتصال الإنترنت
✓ جرب API بديل
✓ استخدم retry logic
```

### خطأ: بيانات غير صحيحة
```
✓ تحقق من صيغة الاستجابة
✓ طباعة response.json() للتصحيح
✓ تأكد من وحدة القياس (جرام vs أونصة)
```

---

## 📚 موارد إضافية

- [GoldAPI Documentation](https://www.goldapi.io/documentation)
- [ExchangeRate-API Docs](https://www.exchangerate-api.com/docs)
- [Metals-API Guide](https://metals-api.com/documentation)
- [GitHub Secrets Guide](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

**ملاحظة**: اختر API حسب احتياجاتك وميزانيتك. الخيارات المجانية كافية للاستخدام الشخصي.
