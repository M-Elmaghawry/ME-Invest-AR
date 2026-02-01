# 📊 موقع متابعة أسعار الذهب والعملات

موقع شخصي تحليلي (Single Page Application) لمتابعة أسعار الذهب والدولار مع تحديث تلقائي يومي.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

> 🎯 **بداية سريعة؟** اقرأ [QUICK_START.md](QUICK_START.md)  
> 📑 **تبحث عن ملف معين؟** راجع [INDEX.md](INDEX.md)

---

## ✨ المميزات

### 🟡 قسم الذهب
- متابعة أسعار الذهب في **مصر** و**السعودية**
- عرض أسعار **عيار 21** و**عيار 24**
- مؤشرات مقارنة زمنية (أمس - أسبوع - شهر - 6 شهور - سنة)
- رسوم بيانية تفاعلية للأسعار التاريخية
- حساب تلقائي لعيار 21 من عيار 24

### 💵 قسم الدولار
- سعر الدولار الأمريكي مقابل الجنيه المصري
- نفس المؤشرات الزمنية لتتبع التغيرات
- رسوم بيانية تاريخية

### 🔁 محول العملات
- تحويل فوري بين:
  - 🇪🇬 الجنيه المصري (EGP)
  - 🇸🇦 الريال السعودي (SAR)
  - 🇺🇸 الدولار الأمريكي (USD)
- تحديث تلقائي للأسعار

---

## 🛠️ التقنيات المستخدمة

| المكون | التقنية |
|--------|----------|
| الواجهة | HTML5 |
| التصميم | CSS3 (RTL Support) |
| البرمجة | Vanilla JavaScript |
| الرسوم البيانية | Chart.js |
| البيانات | JSON |
| التحديث التلقائي | GitHub Actions |
| الاستضافة | GitHub Pages |

---

## 🚀 كيفية الاستخدام

### 1️⃣ تصفح محلي

```bash
# Clone the repository
git clone https://github.com/your-username/ME-Invest-Ar.git

# Open in browser
cd ME-Invest-Ar
# افتح ملف index.html في المتصفح
```

### 2️⃣ استضافة على GitHub Pages

1. Fork هذا المشروع
2. اذهب إلى Settings → Pages
3. اختر Branch: `main` و Folder: `/ (root)`
4. احفظ وانتظر بضع دقائق
5. الموقع سيكون متاح على: `https://your-username.github.io/ME-Invest-Ar`

---

## 📁 هيكل المشروع

```
ME-Invest-Ar/
├── index.html              # الصفحة الرئيسية
├── style.css               # ملف التصميم (RTL)
├── script.js               # المنطق البرمجي
├── market-history.json     # بيانات الأسعار التاريخية
├── .github/
│   └── workflows/
│       └── update-prices.yml   # GitHub Actions للتحديث التلقائي
├── scripts/
│   └── update_prices.py    # سكريبت التحديث
└── README.md               # هذا الملف
```

---

## 🔄 التحديث التلقائي

الموقع يستخدم **GitHub Actions** للتحديث التلقائي يوميًا:

### كيف يعمل؟

1. **Cron Job**: يعمل يوميًا الساعة 9:00 صباحًا بتوقيت UTC (12:00 ظهرًا بتوقيت مصر)
2. **جلب البيانات**: يستدعي APIs للحصول على أحدث الأسعار
3. **تحديث JSON**: يضيف سجل جديد لملف `market-history.json`
4. **Commit تلقائي**: يحفظ التغييرات في المستودع

### إعداد APIs

لتفعيل التحديث التلقائي، عدّل ملف `scripts/update_prices.py`:

#### 🟡 للذهب:
```python
# استخدم أحد هذه الخيارات:
# 1. GoldAPI.io - https://www.goldapi.io/
# 2. Metals-API - https://metals-api.com/
# 3. Web Scraping من مواقع موثوقة
```

#### 💵 للدولار:
```python
# استخدم أحد هذه الخيارات:
# 1. ExchangeRate-API - https://www.exchangerate-api.com/
# 2. CurrencyLayer - https://currencylayer.com/
# 3. البنك المركزي المصري API
```

---

## 🎨 التخصيص

### تغيير الألوان

عدّل ملف `style.css` في قسم `:root`:

```css
:root {
    --primary-color: #2563eb;      /* اللون الأساسي */
    --success-color: #10b981;      /* لون الصعود */
    --danger-color: #ef4444;       /* لون النزول */
    /* ... */
}
```

### إضافة عملات إضافية

1. أضف بيانات العملة في `market-history.json`
2. أضف حقل إدخال في `index.html`
3. عدّل دالة `convertCurrency()` في `script.js`

### إضافة دول للذهب

1. أضف بيانات الدولة في `market-history.json`
2. أضف زر اختيار في `index.html`
3. عدّل دالة `selectCountry()` في `script.js`

---

## 📊 صيغة البيانات (JSON Schema)

```json
{
  "date": "YYYY-MM-DD",
  "gold": {
    "EGP": {
      "24": 3842.50,
      "21": 3362.19
    },
    "SAR": {
      "24": 362.85,
      "21": 317.49
    }
  },
  "usd_egp": 50.25
}
```

---

## 🔧 استكشاف الأخطاء

### المشكلة: البيانات لا تظهر

**الحل:**
1. تأكد من وجود ملف `market-history.json`
2. افتح Console في المتصفح للتحقق من الأخطاء
3. تأكد من صحة صيغة JSON

### المشكلة: الرسوم البيانية لا تظهر

**الحل:**
1. تأكد من تحميل مكتبة Chart.js
2. تحقق من اتصال الإنترنت (CDN)
3. راجع Console للأخطاء

### المشكلة: التحديث التلقائي لا يعمل

**الحل:**
1. تأكد من إعداد GitHub Actions بشكل صحيح
2. راجع تبويب "Actions" في GitHub للأخطاء
3. تحقق من صحة APIs المستخدمة

---

## 🤝 المساهمة

المساهمات مرحب بها! يمكنك:

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'إضافة ميزة رائعة'`)
4. Push للـ branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

---

## 📝 الترخيص

هذا المشروع مرخص تحت [MIT License](LICENSE) - يمكنك استخدامه بحرية مع الإشارة للمصدر.

---

## 📞 التواصل

إذا كان لديك أي استفسار أو اقتراح:

- 📧 Email: your-email@example.com
- 🐙 GitHub: [@your-username](https://github.com/your-username)

---

## 🙏 شكر وتقدير

- [Chart.js](https://www.chartjs.org/) - مكتبة الرسوم البيانية
- [GitHub Pages](https://pages.github.com/) - الاستضافة المجانية
- [GitHub Actions](https://github.com/features/actions) - الأتمتة

---

## 📌 ملاحظات مهمة

⚠️ **تنويه**: البيانات المعروضة استرشادية وللمتابعة الشخصية فقط. يُنصح بالتحقق من الأسعار الرسمية قبل اتخاذ أي قرارات مالية.

---

<div align="center">
  
**صُنع بـ ❤️ للمتابعة الشخصية**

⭐ إذا أعجبك المشروع، لا تنسَ وضع نجمة!

</div>
