// main.js - Electron Ana Proses
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { processImages } from './optimize-sharp.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#1a1a2e',
    icon: path.join(__dirname, '../build/icon.png'),
    show: false,
    autoHideMenuBar: true
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Pencere hazır olduğunda göster
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // DevTools'u production'da kapalı tut
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

// Uygulama hazır olduğunda pencereyi aç
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Tüm pencereler kapandığında uygulamayı kapat (macOS hariç)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Event Handlers

// Input klasörünü aç
ipcMain.handle('open-input-folder', async () => {
  const inputPath = path.join(__dirname, '..', 'input');
  const { shell } = await import('electron');
  await shell.openPath(inputPath);
  return { success: true };
});

// Output klasörünü aç
ipcMain.handle('open-output-folder', async () => {
  const outputPath = path.join(__dirname, '..', 'output');
  const { shell } = await import('electron');
  await shell.openPath(outputPath);
  return { success: true };
});

// Görsel seçme dialog'u
ipcMain.handle('select-images', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Görseller', extensions: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff'] }
    ],
    title: 'Görselleri Seçin'
  });

  if (!result.canceled && result.filePaths.length > 0) {
    return { success: true, files: result.filePaths };
  }
  return { success: false };
});

// Görselleri kopyala (input klasörüne)
ipcMain.handle('copy-images', async (event, filePaths) => {
  const fs = await import('fs/promises');
  const inputPath = path.join(__dirname, '..', 'input');
  
  try {
    await fs.mkdir(inputPath, { recursive: true });
    
    for (const filePath of filePaths) {
      const fileName = path.basename(filePath);
      const destPath = path.join(inputPath, fileName);
      await fs.copyFile(filePath, destPath);
    }
    
    return { success: true, message: `${filePaths.length} dosya başarıyla kopyalandı!` };
  } catch (error) {
    return { success: false, message: `Hata: ${error.message}` };
  }
});

// Optimize işlemini başlat
ipcMain.handle('start-optimization', async (event) => {
  try {
    const result = await processImages((current, total, message) => {
      // Progress update'i renderer'a gönder
      mainWindow.webContents.send('optimization-progress', {
        current,
        total,
        message,
        percentage: total > 0 ? Math.round((current / total) * 100) : 0
      });
    });

    return result;
  } catch (error) {
    return { success: false, message: `Hata: ${error.message}` };
  }
});

// Input klasöründeki dosya sayısını getir
ipcMain.handle('get-input-count', async () => {
  const fs = await import('fs/promises');
  const inputPath = path.join(__dirname, '..', 'input');
  
  try {
    const files = await fs.readdir(inputPath);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff'].includes(ext);
    });
    return { success: true, count: imageFiles.length };
  } catch (error) {
    return { success: true, count: 0 };
  }
});

// Input klasörünü temizle
ipcMain.handle('clear-input', async () => {
  const fs = await import('fs/promises');
  const inputPath = path.join(__dirname, '..', 'input');
  
  try {
    const files = await fs.readdir(inputPath);
    for (const file of files) {
      await fs.unlink(path.join(inputPath, file));
    }
    return { success: true, message: 'Input klasörü temizlendi!' };
  } catch (error) {
    return { success: false, message: `Hata: ${error.message}` };
  }
});

// Output klasörünü temizle
ipcMain.handle('clear-output', async () => {
  const fs = await import('fs/promises');
  const outputPath = path.join(__dirname, '..', 'output');
  
  try {
    const files = await fs.readdir(outputPath);
    for (const file of files) {
      await fs.unlink(path.join(outputPath, file));
    }
    return { success: true, message: 'Output klasörü temizlendi!' };
  } catch (error) {
    return { success: false, message: `Hata: ${error.message}` };
  }
});

