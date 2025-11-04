// preload.js - Güvenli IPC Bridge
import { contextBridge, ipcRenderer } from 'electron';

// API'yi renderer process'e güvenli şekilde expose et
contextBridge.exposeInMainWorld('electronAPI', {
  // Klasör işlemleri
  openInputFolder: () => ipcRenderer.invoke('open-input-folder'),
  openOutputFolder: () => ipcRenderer.invoke('open-output-folder'),
  
  // Görsel seçme ve kopyalama
  selectImages: () => ipcRenderer.invoke('select-images'),
  copyImages: (filePaths) => ipcRenderer.invoke('copy-images', filePaths),
  
  // Optimize işlemleri
  startOptimization: () => ipcRenderer.invoke('start-optimization'),
  onOptimizationProgress: (callback) => {
    ipcRenderer.on('optimization-progress', (event, data) => callback(data));
  },
  
  // Yardımcı fonksiyonlar
  getInputCount: () => ipcRenderer.invoke('get-input-count'),
  clearInput: () => ipcRenderer.invoke('clear-input'),
  clearOutput: () => ipcRenderer.invoke('clear-output')
});

