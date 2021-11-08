const { app, BrowserWindow, Tray, Menu, ipcMain } = require("electron");
const path = require("path");

const iconPath = path.join(__dirname, './src/source/img/初音.png')   //应用运行时的标题栏图标

//app 模块，控制整个应用程序的事件生命周期。
//BrowserWindow 模块，它创建和管理程序的窗口。

//在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口

let mainWindow = {};
let tray = {};

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    resizable: false,
    width: 800,        //设置窗口宽高
    height: 600,
    icon: iconPath,     //应用运行时的标题栏图标
    webPreferences:{    
      backgroundThrottling: false,   //设置应用在后台正常运行
      nodeIntegration:true,     //设置能在页面使用nodejs的API
      contextIsolation: false,
      preload: path.join(__dirname, './preload.js')
    }
  }); // 创建一个窗口

  mainWindow.removeMenu();

  //窗口加载html文件
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  tray = new Tray(iconPath); //实例化一个tray对象，构造函数的唯一参数是需要在托盘中显示的图标url   

  tray.on('click', () => {       //点击图标的响应事件，这里是切换主窗口的显示和隐藏
    if(mainWindow.isVisible()){
      mainWindow.hide()
    }else{
      mainWindow.show()
    }
  });

  tray.on('right-click', () => {    //右键点击图标时，出现的菜单，通过Menu.buildFromTemplate定制，这里只包含退出程序的选项。
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit()
      }
    ])
    tray.popUpContextMenu(menuConfig);
  });

  ipcMain.on('mainWindow:close', () => {
    mainWindow.hide();
  })

});
