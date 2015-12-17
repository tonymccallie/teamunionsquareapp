const electron = require('electron');
const shell = require('electron').shell;
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

// Report crashes to our server.
electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
console.log('READY');
  // Create the browser window.
  mainWindow = new BrowserWindow({
	  title: 'Team Union Square', 
	  width: 960, 
	  height: 600,
	  "node-integration": false,
	  webPreferences: {
		  webSecurity: false
	  }
  });

  // and load the index.html of the app.
  mainWindow.loadURL('http://team.unionsquare.org');

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
  mainWindow.maximize();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  
  mainWindow.webContents.on('new-window',function(event, url, frameName, disposition) {
	  //console.log([event, url, frameName, disposition]);
	  shell.openExternal(url);
	  event.preventDefault();
  });
 });