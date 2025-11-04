// optimize.js - Görsel optimize motoru
import fs from "fs/promises";
import path from "path";
import { ImagePool } from "@squoosh/lib";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// === 🧩 AYARLAR ===
const INPUT_DIR = path.join(__dirname, "..", "input");   // Orijinal görsellerin klasörü
const OUTPUT_DIR = path.join(__dirname, "..", "output"); // Optimize edilmişlerin çıkışı

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
let imagePool;

/**
 * Progress callback fonksiyonu
 * @param {Function} onProgress - Progress callback (current, total, message)
 */
export async function processImages(onProgress = null) {
  try {
    // ImagePool oluştur
    imagePool = new ImagePool();

    // Input dizinini kontrol et
    await fs.mkdir(INPUT_DIR, { recursive: true });
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    const files = await fs.readdir(INPUT_DIR);
    
    // Sadece görsel dosyalarını filtrele
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff'].includes(ext);
    });

    if (imageFiles.length === 0) {
      if (onProgress) onProgress(0, 0, "❌ Input klasöründe görsel bulunamadı!");
      return { success: false, message: "Input klasöründe görsel bulunamadı!" };
    }

    const totalOperations = imageFiles.length * VARIATIONS.length * FORMATS.length;
    let currentOperation = 0;

    for (const file of imageFiles) {
      const inputPath = path.join(INPUT_DIR, file);
      
      if (onProgress) onProgress(currentOperation, totalOperations, `🧩 İşleniyor: ${file}...`);

      try {
        const imageData = await fs.readFile(inputPath);
        const image = imagePool.ingestImage(imageData);

        const baseName = path.parse(file).name;

        for (const v of VARIATIONS) {
          // Resize işlemi
          await image.decoded;
          
          // Her varyasyon için yeni bir image nesnesi kullan
          const resizedImage = imagePool.ingestImage(imageData);
          await resizedImage.decoded;
          
          await resizedImage.preprocess({
            resize: {
              enabled: true,
              width: v.width,
              height: v.height,
              method: "lanczos3",
              fitMethod: "stretch",
              premultiply: true,
              linearRGB: true
            }
          });

          for (const format of FORMATS) {
            currentOperation++;
            
            // Format için encode ayarları
            const encodeOptions = {};
            if (format === "webp") {
              encodeOptions.webp = { quality: 80 };
            } else if (format === "avif") {
              encodeOptions.avif = { cqLevel: 33, speed: 6 };
            } else if (format === "mozjpeg") {
              encodeOptions.mozjpeg = { quality: 80 };
            }

            await resizedImage.encode(encodeOptions);

            const encoded = await resizedImage.encodedWith[format];
            const binary = await encoded.binary;

            const outputFile = `${baseName}_${v.width}x${v.height}.${encoded.extension}`;
            const outputPath = path.join(OUTPUT_DIR, outputFile);

            await fs.writeFile(outputPath, binary);
            
            if (onProgress) {
              onProgress(
                currentOperation, 
                totalOperations, 
                `✅ ${outputFile} kaydedildi (${currentOperation}/${totalOperations})`
              );
            }
          }
        }
      } catch (error) {
        console.error(`❌ ${file} işlenirken hata oluştu:`, error);
        if (onProgress) {
          onProgress(
            currentOperation, 
            totalOperations, 
            `❌ ${file} işlenirken hata: ${error.message}`
          );
        }
      }
    }

    await imagePool.close();
    
    if (onProgress) {
      onProgress(totalOperations, totalOperations, "🎉 Tüm görseller başarıyla işlendi!");
    }

    return { 
      success: true, 
      message: `${imageFiles.length} görsel işlendi, ${totalOperations} dosya oluşturuldu!` 
    };

  } catch (error) {
    console.error("❌ İşlem sırasında hata:", error);
    if (imagePool) {
      await imagePool.close();
    }
    return { success: false, message: `Hata: ${error.message}` };
  }
}

// Terminal'den direkt çalıştırılırsa
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  processImages((current, total, message) => {
    console.log(message);
  }).then(result => {
    console.log(result.message);
    process.exit(result.success ? 0 : 1);
  });
}

