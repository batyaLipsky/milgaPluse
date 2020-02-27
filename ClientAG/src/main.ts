import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// const electronInstaller = require('electron-winstaller');

// try {
//    electronInstaller.createWindowsInstaller({
//     appDirectory: '/tmp/build/my-app-64',
//     outputDirectory: '/tmp/build/installer64',
//     authors: 'My App Inc.',
//     exe: 'milgaPlus.exe',
//     //iconUrl:'./assets/backgroundImages/logoForBackground.png'
//   });
//   console.log('It worked!');
// } catch (e) {
//   console.log(`No dice: ${e.message}`);
// }
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
