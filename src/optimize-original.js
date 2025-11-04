// optimize-original.js - Orijinal boyutta kalite optimizasyonu
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT_DIR = path.join(__dirname, "..", "input");
const OUTPUT_DIR = path.join(__dirname, "..", "output");

async function processImages() {
  try {
    await fs.mkdir(INPUT_DIR, { recursive: true });
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    const files = await fs.readdir(INPUT_DIR);
    
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff'].includes(ext);
    });

    if (imageFiles.length === 0) {
      console.log("❌ Input klasöründe görsel bulunamadı!");
      return;
    }

    for (const file of imageFiles) {
      const inputPath = path.join(INPUT_DIR, file);
      const baseName = path.parse(file).name;
      const outputFile = `${baseName}_optimized.jpg`;
      const outputPath = path.join(OUTPUT_DIR, outputFile);

      console.log(`🧩 İşleniyor: ${file}...`);

      // Orijinal boyutta, sadece kalite 25 ile optimize et
      await sharp(inputPath)
        .jpeg({ quality: 25, mozjpeg: true })
        .toFile(outputPath);

      console.log(`✅ ${outputFile} kaydedildi`);
    }

    console.log(`🎉 ${imageFiles.length} görsel başarıyla optimize edildi!`);

  } catch (error) {
    console.error("❌ Hata:", error.message);
  }
}

processImages();

