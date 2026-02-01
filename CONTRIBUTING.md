# 🤝 دليل المساهمة - Contributing Guide

شكرًا لاهتمامك بالمساهمة في مشروع **متابعة أسعار الذهب والعملات**!

هذا المستند يوضح كيفية المساهمة بشكل فعّال.

---

## 📋 جدول المحتويات

1. [كيف يمكنني المساهمة؟](#كيف-يمكنني-المساهمة)
2. [الإبلاغ عن الأخطاء](#الإبلاغ-عن-الأخطاء)
3. [اقتراح ميزات جديدة](#اقتراح-ميزات-جديدة)
4. [إرسال Pull Request](#إرسال-pull-request)
5. [معايير الكود](#معايير-الكود)
6. [الالتزام بالرسائل](#الالتزام-بالرسائل)

---

## 🎯 كيف يمكنني المساهمة؟

هناك عدة طرق للمساهمة:

### 1️⃣ الإبلاغ عن الأخطاء (Bug Reports)
- وجدت خطأ؟ أخبرنا!
- افتح Issue وصِف المشكلة

### 2️⃣ اقتراح ميزات (Feature Requests)
- لديك فكرة رائعة؟
- شاركها معنا في Issue

### 3️⃣ تحسين الكود (Code Contributions)
- إصلاح أخطاء
- إضافة ميزات جديدة
- تحسين الأداء

### 4️⃣ تحسين التوثيق (Documentation)
- تصحيح أخطاء إملائية
- توضيح شروحات
- إضافة أمثلة

### 5️⃣ الترجمة (Translations)
- ترجمة الواجهة للغات أخرى
- تحسين الترجمات الموجودة

---

## 🐛 الإبلاغ عن الأخطاء

### قبل فتح Issue جديد:

1. ✅ تحقق من Issues الموجودة
2. ✅ تأكد أنه ليس مكررًا
3. ✅ جرب في أكثر من متصفح

### عند فتح Bug Report:

استخدم هذا القالب:

```markdown
## 🐛 وصف المشكلة
[وصف واضح ومختصر للمشكلة]

## 📝 خطوات إعادة المشكلة
1. اذهب إلى '...'
2. اضغط على '...'
3. النتيجة: '...'

## ✅ السلوك المتوقع
[ماذا كان يجب أن يحدث]

## 🖥️ البيئة
- المتصفح: [Chrome 120]
- نظام التشغيل: [Windows 11]
- إصدار المشروع: [1.0.0]

## 📸 لقطات الشاشة (إن وجدت)
[إضافة صور للمساعدة]

## 🔍 معلومات إضافية
[أي تفاصيل أخرى]
```

---

## 💡 اقتراح ميزات جديدة

### قبل الاقتراح:

1. ✅ راجع Roadmap في README
2. ✅ تحقق من Issues للتأكد من عدم التكرار
3. ✅ فكر في جدوى الميزة للمشروع

### عند فتح Feature Request:

```markdown
## 💡 الميزة المقترحة
[وصف واضح للميزة]

## 🎯 المشكلة التي تحلها
[لماذا نحتاج هذه الميزة؟]

## 📝 الحل المقترح
[كيف تتخيل تنفيذ الميزة؟]

## 🔄 بدائل محتملة
[هل فكرت في حلول أخرى؟]

## 📸 Mockups (إن وجدت)
[تصاميم أو رسومات توضيحية]

## ℹ️ معلومات إضافية
[أي تفاصيل أخرى]
```

---

## 🔀 إرسال Pull Request

### 1️⃣ إعداد البيئة المحلية

```bash
# Fork المشروع على GitHub
# ثم Clone

git clone https://github.com/YOUR_USERNAME/ME-Invest-Ar.git
cd ME-Invest-Ar

# إنشاء branch جديد
git checkout -b feature/amazing-feature
```

### 2️⃣ إجراء التغييرات

- اعمل على ميزة واحدة لكل PR
- التزم بمعايير الكود
- اختبر تغييراتك

### 3️⃣ Commit التغييرات

```bash
git add .
git commit -m "✨ إضافة ميزة رائعة"
```

### 4️⃣ Push ل GitHub

```bash
git push origin feature/amazing-feature
```

### 5️⃣ فتح Pull Request

1. اذهب إلى repository الأصلي
2. اضغط "New Pull Request"
3. اختر branch الخاص بك
4. املأ الوصف:

```markdown
## 📝 الوصف
[ماذا يفعل هذا PR؟]

## 🔗 Issue ذات الصلة
Closes #123

## 🧪 الاختبار
- [x] تم الاختبار محليًا
- [x] يعمل على Chrome/Firefox
- [x] متوافق مع Mobile

## 📸 لقطات الشاشة
[إن وجدت]

## ✅ Checklist
- [x] الكود يتبع معايير المشروع
- [x] تم تحديث التوثيق
- [x] لا يوجد warnings
- [x] تم اختبار الميزة
```

---

## 📏 معايير الكود

### HTML

```html
<!-- استخدم semantic HTML -->
<section class="gold-section">
  <h2>عنوان القسم</h2>
  <!-- ... -->
</section>

<!-- استخدم مسافات للتنسيق (2 spaces) -->
<div class="container">
  <div class="card">
    <p>محتوى</p>
  </div>
</div>
```

### CSS

```css
/* استخدم naming واضح */
.section-header { }
.price-card { }
.indicator-value { }

/* استخدم CSS Variables للألوان */
.element {
    color: var(--primary-color);
}

/* Mobile-first approach */
.card {
    /* Default: mobile */
}

@media (min-width: 768px) {
    .card {
        /* Desktop */
    }
}

/* استخدم logical properties لـ RTL */
.element {
    margin-inline-start: 1rem;  /* بدلاً من margin-right */
}
```

### JavaScript

```javascript
// استخدم camelCase
const goldPrice = 3500;
const currentCountry = 'EGP';

// استخدم const/let (ليس var)
const API_KEY = 'xxx';
let currentPrice = 0;

// دوال واضحة مع JSDoc
/**
 * حساب سعر الذهب
 * @param {Object} data - بيانات السوق
 * @param {string} country - الدولة
 * @param {string} karat - العيار
 * @returns {number} السعر
 */
function getGoldPrice(data, country, karat) {
    // ...
}

// معالجة الأخطاء
try {
    const data = await fetchData();
} catch (error) {
    console.error('Error:', error);
}

// استخدم template literals
const message = `السعر: ${price} جنيه`;
```

### Python

```python
# اتبع PEP 8
def fetch_gold_prices():
    """
    جلب أسعار الذهب من API
    
    Returns:
        dict: أسعار الذهب لجميع الدول
    """
    try:
        response = requests.get(url)
        return response.json()
    except Exception as e:
        print(f"Error: {e}")
        return None

# استخدم type hints
def calculate_price(base: float, ratio: float) -> float:
    return base * ratio
```

---

## 📜 الالتزام بالرسائل

### الصيغة:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types:

- ✨ `feat`: ميزة جديدة
- 🐛 `fix`: إصلاح خطأ
- 📝 `docs`: تحديث التوثيق
- 💄 `style`: تنسيق الكود (لا يؤثر على المنطق)
- ♻️ `refactor`: إعادة هيكلة الكود
- ⚡ `perf`: تحسين الأداء
- ✅ `test`: إضافة/تحديث اختبارات
- 🔧 `chore`: مهام صيانة

### أمثلة:

```bash
✨ feat(gold): إضافة دعم للإمارات

إضافة أسعار الذهب للإمارات مع رمز العملة AED

Closes #45

---

🐛 fix(converter): إصلاح حلقة لانهائية

كان التحويل يسبب infinite loop عند إدخال أرقام كبيرة

Fixes #32

---

📝 docs(readme): تحديث دليل الاستخدام

- إضافة مثال للتحويل
- توضيح خطوات النشر
```

---

## 🧪 الاختبار

### قبل إرسال PR:

```bash
# افتح الموقع محليًا
# اختبر:
✅ جميع الميزات تعمل
✅ لا يوجد أخطاء في Console
✅ التصميم responsive
✅ RTL يعمل بشكل صحيح
✅ المتصفحات المختلفة (Chrome, Firefox, Safari)
```

---

## 📦 هيكل الـ PR المثالي

```
✨ feat(charts): إضافة خيار تكبير الرسم البياني

### التغييرات
- إضافة zoom plugin لـ Chart.js
- أزرار +/- للتحكم
- حفظ المستوى في localStorage

### الاختبار
- ✅ يعمل على Desktop
- ✅ يعمل على Mobile
- ✅ متوافق مع جميع الرسوم البيانية

### Screenshots
[صورة]

Closes #67
```

---

## ⚠️ ما يجب تجنبه

❌ **لا تفعل**:
- إرسال PR ضخم يحتوي على ميزات متعددة
- تغيير formatting للملف بالكامل
- إضافة dependencies ثقيلة بدون سبب
- نسخ كود من مشاريع أخرى بدون مراجعة الترخيص
- إضافة API keys في الكود

✅ **افعل**:
- PR صغير ومركّز
- تغييرات واضحة ومفهومة
- اختبار شامل
- توثيق جيد
- التزام بالمعايير

---

## 🏆 المساهمون

شكرًا لجميع المساهمين!

<!-- سيتم تحديثه تلقائيًا -->

---

## 📞 تحتاج مساعدة؟

- 📧 Email: your-email@example.com
- 💬 افتح Discussion على GitHub
- 📱 تواصل عبر Issues

---

## 📜 الترخيص

بالمساهمة، أنت توافق على أن مساهماتك ستكون مرخصة تحت نفس [MIT License](LICENSE) الخاصة بالمشروع.

---

**شكرًا لمساهمتك! ❤️**

معًا نصنع أداة أفضل للجميع! 🚀
