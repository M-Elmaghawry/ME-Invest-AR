# 🚀 دليل النشر والاستضافة

## نشر الموقع على GitHub Pages

### الخطوات:

#### 1️⃣ إنشاء Repository

```bash
# في مجلد المشروع
git init
git add .
git commit -m "🎉 Initial commit: Gold & Currency Tracker"
```

#### 2️⃣ إنشاء Repository على GitHub

1. اذهب إلى https://github.com/new
2. اسم الـ repository: `ME-Invest-Ar`
3. اجعله Public
4. لا تضف README (موجود بالفعل)
5. اضغط "Create repository"

#### 3️⃣ ربط وإرسال الملفات

```bash
git remote add origin https://github.com/YOUR_USERNAME/ME-Invest-Ar.git
git branch -M main
git push -u origin main
```

#### 4️⃣ تفعيل GitHub Pages

1. اذهب إلى repository على GitHub
2. اضغط `Settings` → `Pages`
3. في Source:
   - Branch: `main`
   - Folder: `/ (root)`
4. اضغط `Save`
5. انتظر 2-3 دقائق

الموقع سيكون متاح على:
```
https://YOUR_USERNAME.github.io/ME-Invest-Ar/
```

---

## ⚙️ إعداد GitHub Actions

### إضافة API Keys كـ Secrets

1. اذهب إلى: `Settings` → `Secrets and variables` → `Actions`
2. اضغط `New repository secret`
3. أضف:

**للذهب (GoldAPI)**:
- Name: `GOLDAPI_KEY`
- Secret: `your_goldapi_key_here`

**للعملات (إن وجد)**:
- Name: `EXCHANGE_API_KEY`
- Secret: `your_exchange_api_key`

### تحديث ملف update_prices.py

عدّل السطور:
```python
import os

GOLDAPI_KEY = os.environ.get('GOLDAPI_KEY')
EXCHANGE_API_KEY = os.environ.get('EXCHANGE_API_KEY')
```

### تحديث workflow

في `.github/workflows/update-prices.yml`:
```yaml
- name: Update market prices
  env:
    GOLDAPI_KEY: ${{ secrets.GOLDAPI_KEY }}
    EXCHANGE_API_KEY: ${{ secrets.EXCHANGE_API_KEY }}
  run: python scripts/update_prices.py
```

---

## 🧪 اختبار GitHub Actions

### تشغيل يدوي

1. اذهب إلى `Actions` tab
2. اختر `Update Market Prices`
3. اضغط `Run workflow` → `Run workflow`
4. انتظر التنفيذ
5. تحقق من التحديثات في `market-history.json`

---

## 🌐 ربط Domain مخصص (اختياري)

### إذا كان لديك domain

1. أضف ملف `CNAME` في root:
```
your-domain.com
```

2. في DNS provider:
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

3. في GitHub Pages settings:
   - Custom domain: `your-domain.com`
   - Enforce HTTPS: ✓

---

## 📱 مشاركة الموقع

### روابط سريعة

**QR Code**: استخدم https://www.qr-code-generator.com/

**Short Link**: استخدم https://bitly.com/

### على وسائل التواصل

```
📊 موقع متابعة أسعار الذهب والعملات

🟡 أسعار الذهب (مصر - السعودية)
💵 سعر الدولار
🔁 محول عملات

🔗 https://your-username.github.io/ME-Invest-Ar/

#الذهب #استثمار #عملات
```

---

## 🔄 تحديث الموقع

### تحديث الكود

```bash
# بعد التعديلات
git add .
git commit -m "✨ إضافة ميزة جديدة"
git push
```

**ملاحظة**: GitHub Pages يتحدث تلقائيًا خلال دقائق

### تحديث البيانات

يتم تلقائيًا يوميًا عبر GitHub Actions

أو يدويًا:
```bash
python scripts/update_prices.py
git add market-history.json
git commit -m "📊 تحديث الأسعار"
git push
```

---

## 🐛 حل المشاكل

### المشكلة: الموقع لا يظهر

**الحل**:
```bash
# تحقق من GitHub Pages status
# Settings → Pages
# يجب أن ترى: "Your site is published at..."
```

### المشكلة: البيانات لا تتحدث

**الحل**:
1. تحقق من Actions logs
2. راجع API keys في Secrets
3. تأكد من صحة Python script

### المشكلة: Charts لا تظهر

**الحل**:
- تأكد من تحميل Chart.js CDN
- افتح Console للأخطاء
- تحقق من `market-history.json`

---

## 📊 مراقبة الاستخدام

### GitHub Insights

1. اذهب إلى `Insights` → `Traffic`
2. شاهد:
   - عدد الزوار
   - المشاهدات
   - المصادر

### Google Analytics (اختياري)

أضف قبل `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔐 الأمان

### ما يجب فعله ✅

- ✅ استخدام GitHub Secrets للـ API keys
- ✅ تفعيل HTTPS في GitHub Pages
- ✅ مراجعة Actions logs بانتظام

### ما يجب تجنبه ❌

- ❌ وضع API keys في الكود
- ❌ رفع ملفات .env
- ❌ مشاركة Secrets

---

## 💰 التكلفة

### مجاني تمامًا:

- ✅ GitHub Pages (unlimited static sites)
- ✅ GitHub Actions (2000 دقيقة/شهر مجانًا)
- ✅ APIs المجانية كافية للاستخدام الشخصي

### إذا احتجت أكثر:

- GitHub Pro: $4/شهر (3000 دقيقة Actions)
- API Upgrades: حسب المزود

---

## 📈 التطوير المستقبلي

### أفكار للتحسين:

1. **PWA Support**:
   - إضافة `manifest.json`
   - Service Worker للعمل offline

2. **إشعارات**:
   - Web Push Notifications
   - تنبيهات عند تغير السعر

3. **Dark Mode**:
   - وضع ليلي
   - حفظ الإعدادات في localStorage

4. **التصدير**:
   - تصدير البيانات كـ Excel
   - Print-friendly view

5. **المقارنة**:
   - مقارنة بين دول متعددة
   - Overlay على الرسم البياني

---

## 📚 موارد مفيدة

- [GitHub Pages Docs](https://docs.github.com/pages)
- [GitHub Actions Docs](https://docs.github.com/actions)
- [GitHub Secrets Guide](https://docs.github.com/actions/security-guides/encrypted-secrets)

---

## ✅ Checklist قبل النشر

- [ ] جميع الملفات موجودة
- [ ] JSON يحتوي بيانات صحيحة
- [ ] APIs تم إعدادها
- [ ] Secrets تم إضافتها
- [ ] README محدّث بمعلوماتك
- [ ] License صحيح
- [ ] تم اختبار الموقع محليًا
- [ ] Git repository جاهز

---

**جاهز للنشر! 🚀**

```bash
git push origin main
```

انتظر دقائق وشاهد موقعك live! 🎉
