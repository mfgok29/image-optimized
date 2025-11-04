# 🔄 Değişiklik Notları

## v1.1.0 - Sharp Entegrasyonu

### ❌ Sorun
- @squoosh/lib Node.js 22 ile uyumsuz
- Uygulama "Görselleri Seç" ve "Optimizasyonu Başlat" butonlarına tıklandığında donuyordu
- İşlem ilerlemiyordu

### ✅ Çözüm
- **Sharp** kütüphanesi entegre edildi
- Sharp, daha stabil ve hızlı bir görsel işleme kütüphanesi
- Tüm Node.js versiyonları ile uyumlu
- Daha iyi performans

### 🔧 Teknik Değişiklikler

1. **Yeni Dosya**: `src/optimize-sharp.js`
   - Sharp tabanlı optimize motoru
   - Daha basit ve güvenilir kod yapısı
   - Better error handling

2. **Güncellenen Dosya**: `src/main.js`
   - optimize.js yerine optimize-sharp.js kullanılıyor

3. **Güncellenen Dosya**: `package.json`
   - Sharp dependency eklendi: `^0.33.0`

### 📊 Performans Karşılaştırması

| Özellik | Squoosh Lib | Sharp |
|---------|-------------|-------|
| Node 22 Uyumu | ❌ Yok | ✅ Var |
| Hız | Orta | ⚡ Hızlı |
| Stabilite | Orta | ✅ Yüksek |
| Bellek Kullanımı | Yüksek | ✅ Optimize |

### 🎯 Kullanım

Artık sorunsuz çalışmalı! Aynı şekilde kullanabilirsiniz:
1. START.bat ile uygulamayı başlatın
2. Görselleri seçin
3. Optimizasyonu başlatın
4. İşlem akıcı şekilde ilerleyecek

### 📝 Format Özellikleri

Sharp ile optimize edilen görseller:
- **WebP**: Quality 80, Effort 4 (hızlı + kaliteli)
- **AVIF**: Quality 60, Effort 4 (küçük dosya + iyi kalite)
- **JPEG**: Quality 80, MozJPEG enabled (optimize edilmiş)

### ⚙️ Özelleştirme

Ayarları değiştirmek için: `src/optimize-sharp.js`

```javascript
// Kalite ayarları
.webp({ quality: 80, effort: 4 })
.avif({ quality: 60, effort: 4 })
.jpeg({ quality: 80, mozjpeg: true })

// Resize ayarları
.resize(v.width, v.height, {
  fit: 'cover',        // 'cover', 'contain', 'fill', 'inside', 'outside'
  position: 'center'   // 'center', 'top', 'bottom', 'left', 'right'
})
```

### 🚀 Avantajlar

1. **Daha Hızlı**: Sharp native C++ binding kullanır
2. **Daha Az Bellek**: Optimize edilmiş bellek yönetimi
3. **Daha Güvenilir**: Production-ready, milyonlarca sitede kullanılıyor
4. **Daha Fazla Özellik**: 
   - Daha iyi resize algoritmaları
   - Metadata preserving
   - Chaining support
   - Progressive JPEG

### 📚 Ek Bilgiler

Sharp hakkında: https://sharp.pixelplumbing.com/

---

**Güncelleme Tarihi**: 31 Ekim 2025  
**Versiyon**: 1.1.0

