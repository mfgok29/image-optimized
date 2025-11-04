// optimize-sharp.js - Sharp ile görsel optimize motoru (daha stabil)
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// === 🧩 AYARLAR ===
const INPUT_DIR = path.join(__dirname, "..", "input");
const OUTPUT_DIR = path.join(__dirname, "..", "output");

// Formatlar
const FORMATS = [
  // { name: "webp", ext: "webp" },  // Devre dışı
  // { name: "avif", ext: "avif" },  // Devre dışı
  { name: "jpeg", ext: "jpg" }
];

// Varyasyonlar
const VARIATIONS = [
  { width: 1920, height: 1080 },
  { width: 1280, height: 720 },
  { width: 800, height: 600 },
  { width: 600, height: 400 },
  { width: 400, height: 300 },
];

/**
 * Sharp ile görsel işleme
 */
export async function processImages(onProgress = null) {
  try {
    // Dizinleri kontrol et
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
      const baseName = path.parse(file).name;
      
      if (onProgress) {
        onProgress(currentOperation, totalOperations, `🧩 İşleniyor: ${file}...`);
      }

      try {
        // Her boyut için
        for (const v of VARIATIONS) {
          // Her format için
          for (const format of FORMATS) {
            currentOperation++;

            const outputFile = `${baseName}_${v.width}x${v.height}.${format.ext}`;
            const outputPath = path.join(OUTPUT_DIR, outputFile);

            try {
              // Sharp işlemi
              let pipeline = sharp(inputPath)
                .resize(v.width, v.height, {
                  fit: 'cover',
                  position: 'center'
                });

              // Format seç
              if (format.name === "webp") {
                pipeline = pipeline.webp({ quality: 80, effort: 4 });
              } else if (format.name === "avif") {
                pipeline = pipeline.avif({ quality: 60, effort: 4 });
              } else if (format.name === "jpeg") {
                pipeline = pipeline.jpeg({ quality: 90, mozjpeg: true });
              }

              // Kaydet
              await pipeline.toFile(outputPath);

              if (onProgress) {
                onProgress(
                  currentOperation,
                  totalOperations,
                  `✅ ${outputFile} kaydedildi (${currentOperation}/${totalOperations})`
                );
              }
            } catch (formatError) {
              console.error(`❌ ${outputFile} oluşturulurken hata:`, formatError.message);
              if (onProgress) {
                onProgress(
                  currentOperation,
                  totalOperations,
                  `⚠️ ${outputFile} atlandı: ${formatError.message}`
                );
              }
            }
          }
        }
      } catch (fileError) {
        console.error(`❌ ${file} işlenirken hata:`, fileError);
        if (onProgress) {
          onProgress(
            currentOperation,
            totalOperations,
            `❌ ${file} işlenirken hata: ${fileError.message}`
          );
        }
      }
    }

    if (onProgress) {
      onProgress(totalOperations, totalOperations, "🎉 Tüm görseller başarıyla işlendi!");
    }

    return {
      success: true,
      message: `${imageFiles.length} görsel işlendi, ${currentOperation} dosya oluşturuldu!`
    };

  } catch (error) {
    console.error("❌ İşlem sırasında hata:", error);
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

