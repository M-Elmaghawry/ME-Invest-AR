# 📖 التوثيق الفني - Technical Documentation

## نظرة عامة على البنية

هذا الموقع هو **Single Page Application (SPA)** بدون Backend، يعتمد كليًا على Frontend Technologies.

---

## 🏗️ معمارية المشروع (Architecture)

```
┌─────────────────────────────────────────┐
│         User Interface (HTML)           │
│  - عرض البيانات                        │
│  - التفاعل مع المستخدم                  │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│      Presentation Layer (CSS)           │
│  - التصميم والألوان                     │
│  - RTL Support                          │
│  - Responsive Design                    │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│    Business Logic (JavaScript)          │
│  - حسابات الأسعار                       │
│  - مقارنات زمنية                        │
│  - تحويل العملات                        │
│  - رسم Charts                           │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│       Data Layer (JSON)                 │
│  - market-history.json                  │
│  - تخزين تاريخي للأسعار                 │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│    Automation (GitHub Actions)          │
│  - تحديث تلقائي يومي                    │
│  - جلب بيانات من APIs                  │
│  - Commit تلقائي                        │
└─────────────────────────────────────────┘
```

---

## 📁 تفصيل الملفات

### 1. `index.html` - الواجهة الرئيسية

**الوظيفة**: هيكل الصفحة الأساسي

**الأقسام الرئيسية**:
```html
<header>     <!-- رأس الصفحة -->
<main>
  <section class="gold-section">      <!-- قسم الذهب -->
  <section class="dollar-section">    <!-- قسم الدولار -->
  <section class="converter-section"> <!-- محول العملات -->
</main>
<footer>     <!-- ذيل الصفحة -->
```

**العناصر التفاعلية**:
- أزرار اختيار الدولة (مصر/السعودية)
- أزرار اختيار العيار (21/24)
- حقول إدخال العملات
- أزرار تغيير فترة الرسم البياني

---

### 2. `style.css` - التصميم

**المتغيرات CSS (CSS Variables)**:
```css
:root {
    --primary-color: #2563eb;
    --success-color: #10b981;    /* للأسعار الصاعدة */
    --danger-color: #ef4444;     /* للأسعار النازلة */
    /* ... */
}
```

**التقنيات المستخدمة**:
- **CSS Grid**: للتخطيطات المعقدة
- **Flexbox**: للمحاذاة
- **Media Queries**: للاستجابة
- **CSS Variables**: لسهولة التخصيص
- **Transitions**: للحركات السلسة

**نقاط التوقف (Breakpoints)**:
```css
@media (max-width: 768px)  { /* Tablets */ }
@media (max-width: 480px)  { /* Mobile */ }
```

---

### 3. `script.js` - المنطق البرمجي

#### 📊 Global State
```javascript
let marketData = [];      // كل البيانات التاريخية
let currentCountry = 'EGP';  // الدولة المختارة
let currentKarat = '21';     // العيار المختار
let goldChart = null;        // مرجع الرسم البياني
let dollarChart = null;
let isConverting = false;    // منع الحلقات اللانهائية
```

#### 🔄 Flow of Execution

```
1. DOMContentLoaded
   ↓
2. loadMarketData()       // تحميل JSON
   ↓
3. initializeUI()
   ├─ updateLastUpdateDate()
   ├─ updateGoldSection()
   ├─ updateDollarSection()
   └─ initializeCharts()
```

#### 🎯 الدوال الرئيسية

**1. تحميل البيانات**:
```javascript
async function loadMarketData() {
    // جلب market-history.json
    // ترتيب حسب التاريخ (الأحدث أولاً)
}
```

**2. تحديث قسم الذهب**:
```javascript
function updateGoldSection() {
    // 1. جلب السعر الحالي
    // 2. حساب المؤشرات الزمنية
    // 3. تحديث DOM
}
```

**3. حساب المؤشرات**:
```javascript
function updateIndicator(elementId, currentPrice, previousPrice) {
    // حساب نسبة التغير: (current - prev) / prev * 100
    // تحديد الاتجاه: ⬆️ / ⬇️ / ➖
    // تطبيق الألوان: green / red / gray
}
```

**4. الرسوم البيانية**:
```javascript
function updateGoldChart(period) {
    // 1. استخراج البيانات للفترة المحددة
    // 2. إنشاء Chart.js instance
    // 3. تطبيق التصميم
}
```

**5. تحويل العملات**:
```javascript
function convertCurrency(sourceCurrency) {
    // منع الحلقة اللانهائية
    // تحويل إلى USD أولاً (كأساس)
    // ثم تحويل إلى باقي العملات
}
```

---

### 4. `market-history.json` - البيانات

**الهيكل**:
```json
[
  {
    "date": "YYYY-MM-DD",
    "gold": {
      "EGP": { "24": float, "21": float },
      "SAR": { "24": float, "21": float }
    },
    "usd_egp": float
  }
]
```

**ملاحظات**:
- الترتيب: الأحدث أولاً (descending)
- الحجم: يحتفظ بآخر 365 يوم فقط
- التحديث: يومي عبر GitHub Actions

---

### 5. `scripts/update_prices.py` - التحديث التلقائي

**المهام**:
1. **Fetch Gold Prices**:
   ```python
   def fetch_gold_prices():
       # API calls for EGP and SAR
       # حساب عيار 21 من 24
   ```

2. **Fetch USD/EGP Rate**:
   ```python
   def fetch_usd_egp_rate():
       # API call for exchange rate
   ```

3. **Update JSON**:
   ```python
   def update_prices():
       # Load current data
       # Add new entry
       # Keep last 365 days
       # Save
   ```

---

### 6. `.github/workflows/update-prices.yml` - Automation

**Trigger**:
```yaml
on:
  schedule:
    - cron: '0 9 * * *'  # يوميًا 9:00 UTC
  workflow_dispatch:      # يدوي
```

**Steps**:
1. Checkout code
2. Setup Python
3. Install dependencies
4. Run update script
5. Commit changes

---

## 🔍 كيف تعمل المقارنات الزمنية؟

### مثال: مقارنة مع أسبوع (7 أيام)

```javascript
function getGoldPriceAtDaysAgo(days) {
    // 1. حساب التاريخ المستهدف
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - days);
    
    // 2. البحث في البيانات التاريخية
    for (let data of marketData) {
        const dataDate = new Date(data.date);
        if (dataDate <= targetDate) {
            return getGoldPrice(data, currentCountry, currentKarat);
        }
    }
    
    return 0; // لم يتم العثور على بيانات
}
```

### حساب النسبة المئوية

```javascript
const difference = currentPrice - previousPrice;
const percentChange = (difference / previousPrice) * 100;

// مثال:
// السعر الحالي: 3500
// السعر قبل أسبوع: 3400
// الفرق: 100
// النسبة: (100 / 3400) * 100 = 2.94%
```

---

## 📊 Chart.js Integration

### إعداد الرسم البياني

```javascript
goldChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['01/01', '02/01', ...],  // التواريخ
        datasets: [{
            label: 'عيار 21 - مصر',
            data: [3500, 3520, 3510, ...],  // الأسعار
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            tension: 0.4,  // منحنى ناعم
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: false },
            x: { /* ... */ }
        }
    }
});
```

### تحديث الرسم البياني

```javascript
// عند تغيير الفترة أو الدولة أو العيار
if (goldChart) {
    goldChart.destroy();  // إزالة القديم
}
goldChart = new Chart(ctx, newConfig);  // إنشاء جديد
```

---

## 🔁 محول العملات - منع الحلقات اللانهائية

**المشكلة**:
```
EGP input changes → triggers convertCurrency('EGP')
  → updates USD input → triggers convertCurrency('USD')
    → updates EGP input → INFINITE LOOP!
```

**الحل**:
```javascript
let isConverting = false;

function convertCurrency(sourceCurrency) {
    if (isConverting) return;  // منع إعادة الدخول
    isConverting = true;
    
    // ... perform conversions ...
    
    isConverting = false;
}
```

---

## 🎨 RTL Support

### CSS
```css
body {
    direction: rtl;  /* اتجاه النص */
}

/* استخدام logical properties */
.element {
    margin-inline-start: 1rem;  /* بدلاً من margin-left */
    padding-inline-end: 1rem;   /* بدلاً من padding-right */
}
```

### HTML
```html
<html lang="ar" dir="rtl">
```

---

## 🚀 Performance Optimization

### 1. تحميل البيانات
- **Caching**: البيانات تُحمّل مرة واحدة فقط
- **Sorting**: ترتيب مسبق في JSON

### 2. الرسوم البيانية
- **Destroy before recreate**: تجنب تسريب الذاكرة
- **Limited data points**: حد أقصى 365 نقطة

### 3. التحويل
- **Debouncing**: يمكن إضافته للحقول

---

## 🔒 الأمان

### 1. API Keys
- ✅ استخدام GitHub Secrets
- ✅ عدم وضع keys في الكود
- ❌ لا تستخدم .env في Frontend

### 2. Data Validation
```javascript
const price = parseFloat(value) || 0;  // تحقق من الأرقام
```

### 3. CORS
- JSON محلي → لا مشاكل CORS
- للـ APIs: استخدم proxies عند الحاجة

---

## 🐛 Debugging Tips

### 1. تحقق من Console
```javascript
console.log('Market data loaded:', marketData.length);
```

### 2. تتبع التحديثات
```javascript
console.log('Updating gold section:', currentCountry, currentKarat);
```

### 3. فحص Charts
```javascript
if (!goldChart) {
    console.error('Gold chart not initialized');
}
```

---

## 📈 قابلية التوسع

### إضافة دولة جديدة

**1. في JSON**:
```json
"gold": {
    "AED": { "24": 280, "21": 245 }
}
```

**2. في HTML**:
```html
<button data-country="AED" onclick="selectCountry('AED')">
    🇦🇪 الإمارات
</button>
```

**3. في JavaScript**: لا حاجة لتعديل - الكود ديناميكي!

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] تحميل البيانات بنجاح
- [ ] تبديل الدول يعمل
- [ ] تبديل الأعيرة يعمل
- [ ] المؤشرات تحسب بشكل صحيح
- [ ] الرسوم البيانية تظهر
- [ ] محول العملات يعمل
- [ ] التصميم responsive
- [ ] RTL يعمل بشكل صحيح

### Browser Compatibility

- ✅ Chrome / Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ⚠️ IE11 (غير مدعوم - يتطلب polyfills)

---

## 📚 مراجع إضافية

- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [GitHub Actions Docs](https://docs.github.com/actions)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

**آخر تحديث**: فبراير 2026
