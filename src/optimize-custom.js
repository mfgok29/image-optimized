// optimize-custom.js - Özel boyut ve kalite ayarları
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

    let processedCount = 0;
    const totalImages = imageFiles.length;

    for (const file of imageFiles) {
      processedCount++;
      const inputPath = path.join(INPUT_DIR, file);
      const baseName = path.parse(file).name;
      const ext = path.parse(file).ext;

      console.log(`\n🧩 [${processedCount}/${totalImages}] İşleniyor: ${file}... (${totalImages - processedCount} görsel kaldı)`);

      // 1. Orijinal boyut - Kalite 60
      const originalOutput = path.join(OUTPUT_DIR, `${baseName}${ext}`);
      await sharp(inputPath)
        .jpeg({ quality: 60, mozjpeg: true })
        .toFile(originalOutput);
      console.log(`✅ ${baseName}${ext} kaydedildi (Orijinal boyut, Kalite 60)`);

      // 2. 1170x785 - Kalite 90
      const size1Output = path.join(OUTPUT_DIR, `${baseName}-1170x785.jpg`);
      await sharp(inputPath)
        .resize(1170, 785, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 90, mozjpeg: true })
        .toFile(size1Output);
      console.log(`✅ ${baseName}-1170x785.jpg kaydedildi (Kalite 90)`);

      // 3. 150x150 - Kalite 90
      const size2Output = path.join(OUTPUT_DIR, `${baseName}-150x150.jpg`);
      await sharp(inputPath)
        .resize(150, 150, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 90, mozjpeg: true })
        .toFile(size2Output);
      console.log(`✅ ${baseName}-150x150.jpg kaydedildi (Kalite 90)`);

      // 4. 592x444 - Kalite 90
      const size3Output = path.join(OUTPUT_DIR, `${baseName}-592x444.jpg`);
      await sharp(inputPath)
        .resize(592, 444, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 90, mozjpeg: true })
        .toFile(size3Output);
      console.log(`✅ ${baseName}-592x444.jpg kaydedildi (Kalite 90)`);

      // 5. 496x372 - Kalite 90
      const size4Output = path.join(OUTPUT_DIR, `${baseName}-496x372.jpg`);
      await sharp(inputPath)
        .resize(496, 372, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 90, mozjpeg: true })
        .toFile(size4Output);
      console.log(`✅ ${baseName}-496x372.jpg kaydedildi (Kalite 90)`);

      // 6. 2560x1921 - Kalite 70 - scaled (boyut yazmadan)
      const scaledOutput = path.join(OUTPUT_DIR, `${baseName}-scaled.jpg`);
      await sharp(inputPath)
        .resize(2560, 1921, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 70, mozjpeg: true })
        .toFile(scaledOutput);
      console.log(`✅ ${baseName}-scaled.jpg kaydedildi (2560x1921, Kalite 70)`);
    }

    console.log(`🎉 ${imageFiles.length} görsel başarıyla optimize edildi! (6 versiyon)`);

  } catch (error) {
    console.error("❌ Hata:", error.message);
  }
}

processImages();

