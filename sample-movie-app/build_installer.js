// ./build_installer.js

// 1. Import Modules
const { MSICreator } = require('electron-wix-msi');
const path = require('path');

// 2. Define input and output directory.
// Important: the directories must be absolute, not relative e.g
// appDirectory: "C:\\Users\sdkca\Desktop\OurCodeWorld-win32-x64",
const APP_DIR = path.resolve(__dirname, './packages/sample-movie-app-0.0.0-win32-x64');
// outputDirectory: "C:\\Users\sdkca\Desktop\windows_installer",
const OUT_DIR = path.resolve(__dirname, './windows_installer');

// 3. Instantiate the MSICreator
const msiCreator = new MSICreator({
  appDirectory: APP_DIR,
  outputDirectory: OUT_DIR,

  // Configure metadata
  description: 'Angular CLI + Electron YTS Clone Desktop Application',
  exe: 'sample-movie-app-0.0.0.exe',
  name: 'YTS Desktop',
  manufacturer: 'CodeLink',
  version: '1.0.0',
  icon: "./src/favicon.ico",

  // Configure installer User Interface
  ui: {
    chooseDirectory: true
  },
});

// 4. Create a .wxs template file
msiCreator.create().then(function(){

  // Step 5: Compile the template to a .msi file
  msiCreator.compile();
});

// Finally run this file using node build_installer.js (Important!: WixToolset is Required)
