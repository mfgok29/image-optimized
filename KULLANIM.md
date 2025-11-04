# 📖 Image Optimizer - Kullanım Klavuzu

## 🚀 Hızlı Başlangıç

### Yöntem 1: Batch Dosyası ile Çalıştırma (Önerilen)

1. **START.bat** dosyasına çift tıklayın
2. Uygulama otomatik olarak açılacaktır

### Yöntem 2: Terminal ile Çalıştırma

```bash
npm start
```

---

## 📝 Adım Adım Kullanım

### 1️⃣ Görselleri Ekleyin

**Yöntem A - Uygulama İçinden:**
1. "📂 Görselleri Seç" butonuna tıklayın
2. Optimize etmek istediğiniz görselleri seçin (Çoklu seçim yapabilirsiniz)
3. Görseller otomatik olarak `input/` klasörüne kopyalanacak

**Yöntem B - Manuel:**
1. "📂 Input Klasörünü Aç" butonuna tıklayın
2. Görselleri klasöre sürükleyip bırakın

### 2️⃣ Optimizasyonu Başlatın

1. "🚀 Optimizasyonu Başlat" butonuna tıklayın
2. Progress bar'dan ilerlemeyi takip edin
3. İşlem loglarını kontrol edin
4. Tamamlandığında bildirim alacaksınız

### 3️⃣ Sonuçları Görün

1. "📂 Output Klasörünü Aç" butonuna tıklayın
2. Optimize edilmiş görselleri görün
3. İhtiyacınız olan formatı/boyutu kullanın

---

## 🎨 Özelleştirme

### Boyutları Değiştirmek

`src/optimize.js` dosyasını açın ve şu bölümü düzenleyin:

```javascript
const VARIATIONS = [
  { width: 1920, height: 1080 },  // Full HD
  { width: 1280, height: 720 },   // HD
  { width: 800, height: 600 },    // Tablet
  { width: 600, height: 400 },    // Mobil Landscape
  { width: 400, height: 300 },    // Mobil Portrait
];
```

Yeni boyutlar ekleyebilir veya mevcut boyutları değiştirebilirsiniz:

```javascript
const VARIATIONS = [
  { width: 3840, height: 2160 },  // 4K
  { width: 2560, height: 1440 },  // 2K
  { width: 1920, height: 1080 },  // Full HD
  // İstediğiniz kadar ekleyin...
];
```

### Formatları Değiştirmek

```javascript
const FORMATS = ["webp", "avif", "mozjpeg"];
```

Sadece WebP istiyorsanız:
```javascript
const FORMATS = ["webp"];
```

### Kaliteyi Ayarlamak

```javascript
// WebP için (0-100)
encodeOptions.webp = { quality: 80 };  // 90 yapabilirsiniz

// AVIF için (0-63, düşük = yüksek kalite)
encodeOptions.avif = { cqLevel: 33, speed: 6 };  // cqLevel: 20 daha yüksek kalite

// JPEG için (0-100)
encodeOptions.mozjpeg = { quality: 80 };  // 85 yapabilirsiniz
```

---

## 💻 .EXE Dosyası Oluşturma

### Yöntem 1: Batch Dosyası (Kolay)

1. **BUILD.bat** dosyasına çift tıklayın
2. İşlem tamamlanana kadar bekleyin (2-5 dakika)
3. `dist/` klasöründe setup dosyasını bulun

### Yöntem 2: Terminal (Manuel)

```bash
npm run build:win
```

Build tamamlandığında:
- **Setup EXE**: `dist/Image Optimizer Setup 1.0.0.exe`
- **Portable EXE**: `dist/win-unpacked/Image Optimizer.exe`

---

## 📊 İstatistikler

Her görsel için oluşturulan dosya sayısı:
```
1 görsel = 15 dosya (3 format × 5 boyut)
10 görsel = 150 dosya
100 görsel = 1500 dosya
```

Tahmini işlem süreleri:
- 10 görsel: ~30 saniye
- 50 görsel: ~2-3 dakika
- 100 görsel: ~5-7 dakika

*(İşlemci gücüne ve görsel boyutuna bağlı olarak değişir)*

---

## 🛠️ Sorun Giderme

### "Input klasöründe görsel bulunamadı" Hatası

**Çözüm**: 
1. `input/` klasörüne görsel eklediğinizden emin olun
2. Desteklenen formatlardan birini kullandığınızdan emin olun
3. Dosya izinlerini kontrol edin

### Uygulama Açılmıyor

**Çözüm**:
```bash
# Temizlik
Remove-Item -Recurse -Force node_modules
npm install

# Yeniden başlat
npm start
```

### Build Hatası

**Çözüm 1 - Cache Temizleme:**
```bash
npm cache clean --force
npm install
npm run build:win
```

**Çözüm 2 - Node Versiyonu:**
- Node.js 18 veya üzeri yüklü olmalı
- `node --version` ile kontrol edin

### Optimize Sonuçları Bozuk Çıkıyor

**Kontrol Listesi**:
1. Orijinal görseller bozuk olabilir - başka görsellerle deneyin
2. Kalite ayarlarını yükseltin (`quality: 90`)
3. Input klasöründeki görsellerin tam olduğundan emin olun

---

## 🎯 İpuçları

### Performans
- Büyük görselleri batch'ler halinde işleyin (25-50'şer)
- SSD kullanıyorsanız daha hızlı olacaktır
- İşlem sırasında bilgisayarı kullanmaya devam edebilirsiniz

### Dosya Organizasyonu
- Input klasörünü düzenli tutun
- İşlem tamamlandıktan sonra output'u yedekleyin
- Output'u temizlemek için uygulama içindeki butonu kullanın

### Web Kullanımı
- Modern web siteleri için WebP veya AVIF önerilir
- Eski tarayıcı desteği için JPEG backup tutun
- Responsive için farklı boyutları kullanın

---

## 📱 Örnek HTML Kullanımı

Optimize edilmiş görselleri web sitenizde kullanmak için:

```html
<picture>
  <!-- Modern tarayıcılar için AVIF -->
  <source srcset="gorsel_1920x1080.avif" type="image/avif">
  
  <!-- WebP desteği için -->
  <source srcset="gorsel_1920x1080.webp" type="image/webp">
  
  <!-- Fallback JPEG -->
  <img src="gorsel_1920x1080.jpg" alt="Açıklama">
</picture>
```

Responsive örnek:
```html
<picture>
  <!-- Mobil -->
  <source media="(max-width: 600px)" srcset="gorsel_400x300.webp" type="image/webp">
  
  <!-- Tablet -->
  <source media="(max-width: 1024px)" srcset="gorsel_800x600.webp" type="image/webp">
  
  <!-- Desktop -->
  <source media="(min-width: 1025px)" srcset="gorsel_1920x1080.webp" type="image/webp">
  
  <!-- Fallback -->
  <img src="gorsel_1280x720.jpg" alt="Açıklama" loading="lazy">
</picture>
```

---

## ⌨️ Kısayollar

| İşlem | Kısayol |
|-------|---------|
| DevTools Aç | `Ctrl + Shift + I` |
| Yenile | `Ctrl + R` |
| Uygulamayı Kapat | `Alt + F4` |
| Tam Ekran | `F11` |

---

## 📞 Destek

Sorun yaşıyorsanız:
1. README.md dosyasını okuyun
2. `npm install` komutuyla bağımlılıkları yenileyin
3. Node.js versiyonunuzu kontrol edin (18+)
4. GitHub'da issue açın

---

## 🎓 Notlar

- İlk çalıştırmada bağımlılıklar indirileceği için yavaş olabilir
- Build işlemi ilk seferde 5-10 dakika sürebilir
- Executable boyutu ~150-200 MB olacaktır (Electron + Node modules)
- İnternet bağlantısı gerekmez (tamamen lokal çalışır)

---

**Başarılar! 🚀**

