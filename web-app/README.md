# 🚀 Image Optimizer Web App

## Özellikler

- ✅ Sürükle-bırak ile görsel yükleme
- ✅ Çoklu dosya seçimi
- ✅ Orijinal format korunur (JPG→JPG, PNG→PNG)
- ✅ Kalite 60 ile optimize
- ✅ Otomatik indirme
- ✅ Modern, responsive tasarım
- ✅ Progress tracking
- ✅ Tarayıcıda çalışır (internet gerekmez)

## Kullanım

### Yöntem 1: Doğrudan Tarayıcıda
1. `index.html` dosyasını çift tıklayın
2. Tarayıcıda açılacak
3. Görselleri sürükle-bırak yapın veya seçin
4. "Optimize Et" butonuna tıklayın
5. Optimize edilmiş görseller otomatik indirilir

### Yöntem 2: Local Server (Önerilen)
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Sonra tarayıcıda: `http://localhost:8000`

## Müşteriye Teslim

### Seçenek 1: ZIP Dosyası
1. `web-app` klasörünü ZIP'le
2. Müşteriye gönder
3. Müşteri ZIP'i açıp `index.html`'i çalıştırsın

### Seçenek 2: Web Hosting
1. `index.html` dosyasını hosting'e yükle
2. Müşteriye link ver
3. Online kullanılabilir

### Seçenek 3: Electron EXE (İsterseniz)
Electron ile EXE yapmak isterseniz söyleyin, onu da eklerim.

## Teknik Detaylar

- **Format Koruması**: JPG→JPG, JPEG→JPEG, PNG→PNG
- **Kalite**: 60 (0-1 arası 0.6)
- **Maksimum Boyut**: 10MB (ayarlanabilir)
- **Browser Uyumluluğu**: Chrome, Firefox, Safari, Edge (son 2 versiyon)
- **Offline Çalışma**: CDN'den kütüphane yüklendikten sonra

## Avantajlar

✅ **Kolay Kullanım**: Teknik bilgi gerektirmez
✅ **Güvenli**: Görseller sunucuya gönderilmez, tarayıcıda işlenir
✅ **Hızlı**: Lokal işlem, internet gerektirmez
✅ **Modern UI**: Dark mode, smooth animasyonlar
✅ **Responsive**: Mobil, tablet, desktop uyumlu

## Müşteri Talimatları

### Adım 1: Uygulamayı Aç
- `index.html` dosyasına çift tıkla

### Adım 2: Görselleri Seç
- Sürükle-bırak yap VEYA
- Tıklayıp dosya seç

### Adım 3: Optimize Et
- "🚀 Optimize Et" butonuna tıkla
- İşlem bitince görseller otomatik inecek

### Adım 4: Tamamlandı
- Optimize edilmiş görseller "İndirilenler" klasöründe
- Dosya adına `_optimized` eklenmiş olacak

## Özelleştirme

### Kaliteyi Değiştirmek
`index.html` içinde:
```javascript
quality: 0.6,  // 0.6 = %60 kalite (0.4-0.9 arası önerilir)
```

### Desteklenen Formatları Değiştirmek
```javascript
accept="image/jpeg,image/jpg,image/png,image/webp"
```

## Sorun Giderme

**Soru**: Görseller inmiyor?
**Cevap**: Tarayıcı indirme izinlerini kontrol edin.

**Soru**: Çok yavaş işliyor?
**Cevap**: Daha az görsel seçin (5-10 adet).

**Soru**: PNG dosyaları büyük kalıyor?
**Cevap**: PNG sıkıştırması JPG'den farklıdır, normal.

## Destek

Sorun yaşarsanız:
1. Tarayıcı console'u açın (F12)
2. Hata mesajlarını kontrol edin
3. Modern tarayıcı kullanın (Chrome, Firefox)

