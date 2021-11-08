const electron = require('electron')
const { ipcRenderer } = electron

let closeDom = document.getElementById('closeDom');
closeDom.addEventListener('click', () => {
  ipcRenderer.send('mainWindow:close')
})