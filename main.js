const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

//global variable to window object.
let win;

function createWindow() {
	//Create browser window
	win = new BrowserWindow({
		width: 800, 
		height: 600, 
		icon: __dirname+'/img/icon.png', 
		webPreferences: { 
			nodeIntegration: true,
		}
	});

	//load index.html page
	win.loadURL(url.format({
		pathname: path.join(__dirname + '/html/index.html'),
		protocol: 'file:',
		slashes: true
	}));

	//open dev tools
	//win.webContents.openDevTools();

	win.on('closed', () => {
		win = null;
	});
}

// Run create window function
app.on('ready', createWindow);

// Quit when all windows closed
app.on('window-all-closed', () => {
	if(process.platform !== 'darwin'){
		app.quit();
	}
});