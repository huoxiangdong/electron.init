const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let macWindow 

function createWindow () {
  创建一个窗口
  macWindow = new BrowserWindow({width: 800, height: 600})
  // 加载index.html
  macWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // 打开 DevTools.
  macWindow.webContents.openDevTools()

  // 当窗口关闭后，置窗口对象为null
  macWindow.on('closed', () => {
    macWindow = null
  })
}

//初始化准备创建窗口
app.on('ready', createWindow)

// 窗口关闭后退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 当app被激活(dock图标被点击)，重新创建窗口
app.on('activate', () => {
  if (macWindow === null) {
    createWindow()
  }
})
