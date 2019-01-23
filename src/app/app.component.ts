import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

declare let window: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      if (platform.is('cordova')) {
        statusBar.styleBlackOpaque();
        splashScreen.hide();
        window.KioskPlugin.isInKiosk(isInKiosk => {
          console.error("InKioskMode", isInKiosk)
        });
        window.KioskPlugin.isSetAsLauncher(isLauncher => {
          console.error("isSetAsLauncher", isLauncher)
        });
        statusBar.show();
        platform.registerBackButtonAction(() => {
          window.KioskPlugin.exitKiosk();
          // this.platform.exitApp();
        });
      }
    });
  }
}

