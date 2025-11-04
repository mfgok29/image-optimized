# GitHub Pages'e Deployment

## Yöntem 1: Direkt GitHub Pages (En Kolay)

### Adım 1: GitHub Repository Oluştur
1. GitHub'da yeni repository oluştur
2. Repository adı: `image-optimizer` (veya istediğin bir isim)
3. Public olarak oluştur

### Adım 2: Dosyaları Pushla
```bash
# Git repo'yu başlat (eğer başlatılmamışsa)
git init

# GitHub repo'yu ekle
git remote add origin https://github.com/KULLANICI_ADIN/image-optimizer.git

# Dosyaları ekle ve commit et
git add .
git commit -m "Initial commit: Image Optimizer Web App"

# Main branch'e pushla
git branch -M main
git push -u origin main
```

### Adım 3: GitHub Pages'i Aktifleştir
1. GitHub repo'na git
2. **Settings** > **Pages** 
3. **Source** kısmından **Deploy from a branch** seç
4. **Branch** kısmından `main` ve `/web-app` klasörünü seç
5. **Save** butonuna bas

⏳ 1-2 dakika bekle, sitin hazır!

🌐 **URL**: `https://KULLANICI_ADIN.github.io/image-optimizer/`

---

## Yöntem 2: index.html'i Root'a Taşı (Daha Temiz URL)

### Dosya Yapısı:
```
image-optimizer/
├── index.html          (web-app/index.html'i buraya kopyala)
├── src/               (Node.js versiyonu)
├── web-app/           (orijinal)
└── README.md
```

### GitHub Pages Ayarı:
- **Branch**: `main`
- **Folder**: `/ (root)`

🌐 **URL**: `https://KULLANICI_ADIN.github.io/image-optimizer/`

---

## Yöntem 3: gh-pages Branch (Otomatik Deploy)

### Adım 1: gh-pages yükle
```bash
npm install --save-dev gh-pages
```

### Adım 2: package.json'a script ekle
```json
{
  "scripts": {
    "deploy": "gh-pages -d web-app"
  }
}
```

### Adım 3: Deploy et
```bash
npm run deploy
```

✅ Otomatik olarak `gh-pages` branch'ine deploy edilir!

🌐 **URL**: `https://KULLANICI_ADIN.github.io/image-optimizer/`

---

## Yöntem 4: GitHub Actions (CI/CD - Profesyonel)

### .github/workflows/deploy.yml oluştur:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./web-app
```

✅ Her `main` branch'e push'ta otomatik deploy!

---

## Önerilen Yöntem

**Başlangıç için: Yöntem 1 (En Kolay)**
- Manuel kontrol
- Hızlı setup
- Test için ideal

**Üretim için: Yöntem 4 (GitHub Actions)**
- Otomatik deploy
- Profesyonel
- Her commit'te yeni versiyon

---

## Domain Bağlama (Opsiyonel)

Kendi domain'ini bağlamak istersen:

1. **Settings** > **Pages** > **Custom domain**
2. Domain'ini yaz: `optimizer.siteadiniz.com`
3. DNS ayarlarına CNAME ekle:
   ```
   optimizer.siteadiniz.com -> KULLANICI_ADIN.github.io
   ```

---

## Test URL'leri

Deployment sonrası test et:
- ✅ Ana sayfa yükleniyor mu?
- ✅ Drag & drop çalışıyor mu?
- ✅ Optimize butonu çalışıyor mu?
- ✅ İndirme çalışıyor mu?

---

## Güncelleme

Yeni değişiklikleri yayınlamak için:
```bash
git add .
git commit -m "Update: improvement description"
git push
```

GitHub Actions kullanıyorsan otomatik deploy olur! 🚀

