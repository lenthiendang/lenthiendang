const { contextBridge, ipcRenderer } = require('electron');
const { shell } = require('electron');

const server = require('./server');

let browser;

contextBridge.exposeInMainWorld('electron', {
  server,
});
