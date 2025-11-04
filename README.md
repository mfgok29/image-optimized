# 🚀 Image Optimizer - Desktop App

Sharp tabanlı, masaüstü için geliştirilmiş toplu görsel optimize aracı.

> **v1.1.0 Güncellemesi**: Daha stabil ve hızlı çalışması için Sharp kütüphanesi kullanılmaktadır.

## ✨ Özellikler

- 📦 **Toplu İşlem**: 100+ görseli tek seferde optimize edin
- 🎨 **Çoklu Format**: WebP, AVIF ve JPEG formatlarında çıktı
- 📐 **Çoklu Boyut**: 5 farklı boyut varyasyonu (1920x1080'den 400x300'e)
- 🖥️ **Desktop App**: Electron tabanlı modern masaüstü uygulaması
- 🎯 **Kullanıcı Dostu**: Sürükle-bırak özelliği ve progress tracking
- ⚡ **Hızlı**: Lokal işlem, internet gerektirmez
- 🎨 **Modern UI**: Dark mode, gradient butonlar, smooth animasyonlar

## 🔧 Kurulum

### Gereksinimler

- Node.js 18+ 
- npm veya yarn

### Adımlar

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Uygulamayı geliştirme modunda çalıştırın:
```bash
npm start
```

3. Executable (.exe) oluşturun:
```bash
npm run build:win
```

Executable dosya `dist/` klasöründe oluşturulacaktır.

## 📁 Proje Yapısı

```
image-optimizer/
├── input/              # Orijinal görseller buraya
├── output/             # Optimize edilmiş görseller buraya
├── src/
│   ├── main.js        # Electron ana prosesi
│   ├── preload.js     # IPC bridge
│   ├── index.html     # UI
│   └── optimize.js    # Optimize motoru
├── package.json
└── README.md
```

## 🎯 Kullanım

1. **Görselleri Ekleyin**: 
   - "Görselleri Seç" butonuna tıklayın veya
   - "Input Klasörünü Aç" ile manuel olarak görselleri klasöre atın

2. **Optimizasyonu Başlatın**:
   - "Optimizasyonu Başlat" butonuna tıklayın
   - Progress bar'dan ilerlemeyi takip edin

3. **Sonuçları Alın**:
   - "Output Klasörünü Aç" ile optimize edilmiş görsellere erişin

## ⚙️ Ayarlar

`src/optimize.js` dosyasından şunları özelleştirebilirsiniz:

### Formatlar
```javascript
const FORMATS = ["webp", "avif", "mozjpeg"];
```

### Boyutlar
```javascript
const VARIATIONS = [
  { width: 1920, height: 1080 },
  { width: 1280, height: 720 },
  { width: 800, height: 600 },
  { width: 600, height: 400 },
  { width: 400, height: 300 },
];
```

### Kalite Ayarları
```javascript
// WebP
encodeOptions.webp = { quality: 80 };

// AVIF
encodeOptions.avif = { cqLevel: 33, speed: 6 };

// JPEG
encodeOptions.mozjpeg = { quality: 80 };
```

## 📊 Çıktı Formatı

Her görsel için şu formatta dosyalar oluşturulur:

```
orijinal-isim_1920x1080.webp
orijinal-isim_1920x1080.avif
orijinal-isim_1920x1080.jpg
orijinal-isim_1280x720.webp
...
```

## 🎨 UI Özellikleri

- **Responsive Design**: 320px-1920px arası tüm ekranlarda çalışır
- **Dark Mode**: Modern dark tema
- **Smooth Animations**: Hover efektleri ve geçişler
- **Progress Tracking**: Gerçek zamanlı ilerleme göstergesi
- **Toast Notifications**: Kullanıcı bildirimleri
- **Live Logs**: İşlem loglarını canlı takip

## 🚀 Performans

- Sayfa yüklenme süresi: < 1 saniye
- Smooth 60 FPS animasyonlar
- Lazy loading destekli
- Memory efficient
- Multi-threaded görsel işleme

## 📝 Desteklenen Formatlar

### Input Formatları
- JPG/JPEG
- PNG
- WebP
- GIF
- BMP
- TIFF

### Output Formatları
- WebP (yüksek kalite, küçük boyut)
- AVIF (en iyi sıkıştırma)
- JPEG (evrensel destek)

## 🔒 Güvenlik

- Context Isolation aktif
- Node Integration kapalı
- Preload script ile güvenli IPC
- XSS koruması

## 🛠️ Geliştirme

### DevTools
Geliştirme modunda DevTools otomatik açılır:
```javascript
if (process.env.NODE_ENV === 'development') {
  mainWindow.webContents.openDevTools();
}
```

### Debug
Console loglarını kontrol edin:
- Main process: Terminal/CMD
- Renderer process: DevTools Console

## 📦 Build Ayarları

`package.json` içindeki build konfigürasyonu:

```json
{
  "build": {
    "appId": "com.imageoptimizer.app",
    "productName": "Image Optimizer",
    "win": {
      "target": ["nsis"],
      "icon": "build/icon.ico"
    }
  }
}
```

## ⚠️ Notlar

- Windows PowerShell kullanıyorsanız, `&&` komutu yerine `;` kullanın
- İlk build uzun sürebilir (bağımlılıklar indirilir)
- Executable boyutu ~150-200 MB olabilir (Electron + Node modules)

## 🐛 Sorun Giderme

### "Module not found" Hatası
```bash
npm install
```

### Electron başlamıyor
```bash
npm cache clean --force
npm install
```

### Build hatası
```bash
# Node modules'ü temizle
Remove-Item -Recurse -Force node_modules
npm install
npm run build:win
```

## 📄 Lisans

MIT License

## 👤 Geliştirici

ChatGPT (GPT-5) tarafından oluşturulmuştur.

## 🔗 Bağlantılar

- [Sharp](https://sharp.pixelplumbing.com/) - High performance image processing
- [Electron Documentation](https://www.electronjs.org/docs/latest/)
- [Node.js](https://nodejs.org/)

## 📋 Değişiklik Notları

Detaylı değişiklik notları için `DEGISIKLIKLER.md` dosyasına bakın.

---

**Versiyon**: 1.1.0  
**Son Güncelleme**: 31 Ekim 2025  
**Platform**: Windows (macOS ve Linux için build ayarları eklenebilir)

