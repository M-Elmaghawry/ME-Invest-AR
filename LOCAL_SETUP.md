# 🚀 تشغيل الموقع محليًا

## الطرق المختلفة:

### 1️⃣ فتح مباشر في المتصفح (الأسهل)

```bash
# Windows
start index.html

# أو ببساطة:
# دبل كليك على index.html
```

**ملاحظة**: هذه الطريقة قد تسبب مشاكل CORS إذا كان لديك external APIs.

---

### 2️⃣ Python HTTP Server

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

ثم افتح: http://localhost:8000

---

### 3️⃣ Node.js http-server

```bash
# تثبيت
npm install -g http-server

# تشغيل
http-server -p 8000
```

ثم افتح: http://localhost:8000

---

### 4️⃣ PHP Built-in Server

```bash
php -S localhost:8000
```

---

### 5️⃣ VS Code Live Server Extension

1. افتح المشروع في VS Code
2. ثبت امتداد "Live Server"
3. كليك يمين على `index.html`
4. اختر "Open with Live Server"

**مميزات**:
- ✅ Auto-reload عند التعديل
- ✅ سهل الاستخدام

---

## 🐛 حل المشاكل

### المشكلة: CORS Error

```
Access to fetch at 'file:///.../market-history.json' from origin 'null' 
has been blocked by CORS policy
```

**الحل**: استخدم HTTP Server (أي طريقة من 2-5 أعلاه)

---

### المشكلة: Charts لا تظهر

**الحل**:
1. تأكد من الاتصال بالإنترنت (CDN)
2. افتح Console للتحقق من الأخطاء

---

## ✅ تحقق من عمل الموقع

بعد التشغيل، تأكد من:

- [ ] الموقع يفتح بدون أخطاء
- [ ] البيانات تظهر (الأسعار والمؤشرات)
- [ ] الرسوم البيانية تعمل
- [ ] تبديل الدول/الأعيرة يعمل
- [ ] محول العملات يعمل
- [ ] التصميم responsive (جرب تصغير النافذة)

---

## 🔧 التطوير

### Watch للتغييرات (اختياري)

إذا كنت تطور، يمكنك استخدام:

```bash
# Browser-sync (أفضل للتطوير)
npm install -g browser-sync
browser-sync start --server --files "*.html, *.css, *.js"
```

**مميزات**:
- ✅ Auto-reload
- ✅ Sync عبر أجهزة متعددة
- ✅ Live CSS injection

---

## 📱 اختبار على Mobile

### نفس الشبكة:

1. شغّل HTTP server على الكمبيوتر
2. اعرف IP الخاص بك:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```
3. على الموبايل، افتح:
   ```
   http://YOUR_IP:8000
   ```

### استخدام ngrok (للاختبار الخارجي):

```bash
# تثبيت ngrok
# من https://ngrok.com/

# تشغيل
ngrok http 8000
```

سيعطيك URL عام مثل: https://abc123.ngrok.io

---

## 🎨 تعديل البيانات للاختبار

عدّل `market-history.json` لتجربة سيناريوهات مختلفة:

```json
{
  "date": "2026-02-01",
  "gold": {
    "EGP": {
      "24": 3500,
      "21": 3062.5
    }
  },
  "usd_egp": 50.0
}
```

حفظ → Refresh → شاهد التغييرات

---

**جاهز للتطوير! 🎉**
