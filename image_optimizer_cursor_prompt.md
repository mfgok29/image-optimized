# 🧠 Cursor Prompt – Squoosh Lib ile Toplu Görsel Optimize Aracı

## 🎯 Amaç
Bu proje, 100+ adet görseli `@squoosh/lib` kullanarak otomatik şekilde optimize eder.  
Her bir görsel için, **belirtilen width/height boyutlarında** ve **birden fazla formatta (webp, avif, jpeg vs)** varyasyonlar üretir.  

---

## 🧩 Yapılacaklar

### 1️⃣ Yeni proje oluştur
Cursor’da yeni bir proje başlat:
```bash
mkdir image-optimizer
cd image-optimizer
npm init -y
npm install @squoosh/lib
```

---

### 2️⃣ Dosya yapısı
Proje dizini şu şekilde olacak:
```
image-optimizer/
├── input/        # Orijinal görselleri buraya at
├── output/       # Optimize edilmiş görseller buraya kaydedilecek
├── optimize.js   # İşlemci script
└── package.json
```

---

### 3️⃣ Kod dosyasını oluştur (`optimize.js`)

Cursor’a şu dosyayı oluşturmasını söyle 👇

```javascript
// optimize.js
import fs from "fs/promises";
import path from "path";
import { ImagePool } from "@squoosh/lib";

// === 🧩 AYARLAR ===
const INPUT_DIR = "./input";   // Orijinal görsellerin klasörü
const OUTPUT_DIR = "./output"; // Optimize edilmişlerin çıkışı

// Formatlar (dilediğin kadar ekleyebilirsin)
const FORMATS = ["webp", "avif", "mozjpeg"];

// Varyasyonlar (width/height değerlerini sen belirle 🔥)
const VARIATIONS = [
  { width: 1920, height: 1080 },
  { width: 1280, height: 720 },
  { width: 800, height: 600 },
  { width: 600, height: 400 },
  { width: 400, height: 300 },
];

// === ⚙️ ÇALIŞMA ===
const imagePool = new ImagePool();

async function processImages() {
  const files = await fs.readdir(INPUT_DIR);

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const image = imagePool.ingestImage(inputPath);

    console.log(`🧩 İşleniyor: ${file}...`);

    for (const v of VARIATIONS) {
      await image.preprocess({ resize: { width: v.width, height: v.height } });

      for (const format of FORMATS) {
        await image.encode({
          [format]: { quality: 80 },
        });

        const encoded = await image.encodedWith[format];
        const extension = encoded.extension;
        const binary = encoded.binary;

        const baseName = path.parse(file).name;
        const outputFile = `${baseName}_${v.width}x${v.height}_${format}.${extension}`;
        const outputPath = path.join(OUTPUT_DIR, outputFile);

        await fs.writeFile(outputPath, binary);
        console.log(`✅ ${outputFile} kaydedildi`);
      }
    }
  }

  await imagePool.close();
  console.log("🎉 Tüm görseller işlendi!");
}

await fs.mkdir(OUTPUT_DIR, { recursive: true });
await processImages();
```

---

### 4️⃣ Kullanım
1. Tüm kaynak görsellerini `input/` klasörüne koy.  
2. Terminalde şu komutu çalıştır:
   ```bash
   node optimize.js
   ```
3. Sonuçlar `output/` klasöründe şu şekilde oluşur:
   ```
   img1_1920x1080_webp.webp
   img1_1280x720_avif.avif
   img1_800x600_mozjpeg.jpg
   ...
   ```

---

### 5️⃣ Özelleştirme
- 🔧 **Boyutları değiştir:** `VARIATIONS` dizisini düzenle.  
- 🎨 **Kaliteyi değiştir:** `quality: 80` değerini farklı formatlar için ayırabilirsin.  
- ⚡ **Yeni format ekle:** `FORMATS` dizisine `oxipng`, `jpeg-xl`, `webp2` gibi formatlar eklenebilir.  
- 💾 **Dış JSON kullanımı (isteğe bağlı):** varyasyonları `sizes.json` olarak dışarı alıp kodda okuyabiliriz.  
  Örnek:
  ```json
  [
    { "width": 1920, "height": 1080 },
    { "width": 1280, "height": 720 }
  ]
  ```

---

### 💡 İpucu
Bu sistemi daha da otomatikleştirmek için:
- `npm run optimize` komutu oluşturabilir,  
- ya da `.bat` / `.sh` script ile toplu işlem planlayabilirsin.

---

### 🚀 Sonuç
Bu proje, Squoosh’un çekirdeğini (`libSquoosh`) kullanarak tamamen **lokal**, **ücretsiz** ve **hızlı** şekilde çoklu format + boyut varyasyonlarını üretir.  
Böylece 100+ görseli tek komutla optimize edebilirsin 💪

---

**Hazırlayan:** ChatGPT (GPT-5)  
**Proje:** `image-optimizer`  
**Uyumlu ortam:** Node.js 18+  
